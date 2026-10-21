#!/usr/bin/env python3
"""漏洞扫描门禁（ci-checklist 3.1）。

子命令：
  ignores            校验 osv-scanner.toml：每条有 reason、added 和
                     ignoreUntil，未过期，且 ignoreUntil 距 added 不超过
                     90 天（按日期算，第 90 天 T23:59:59Z 仍合规）。续期要经安全官审：
                     续期时同时改 added 和 ignoreUntil。
  audit-gate <a.json> 读 pnpm audit --json 的结果：high/critical 失败，
                     osv-scanner.toml 中未过期的 id 跳过。不用 pnpm audit
                     --ignore，因为 pnpm 11 会把它写回 pnpm-workspace.yaml。
  osv-config <out>   把 osv-scanner.toml 去掉 added 后写到 <out>。
                     osv-scanner 不认 added 键，遇到未知键会退出。
  （gate 和 audit-gate 必须带第三个参数：扫描工具的退出码，缺失返回 2。
   0 和 1 表示正常完成，其他退出码判为失败。）
  selftest           用构造的异常输入自测两个门禁，CI 里先跑这一步。
  gate <osv.json>    读 osv-scanner --format json 的结果：
                     CVSS >= 7.0（High/Critical）失败，Medium 只告警。
"""
import datetime as dt
import json
import sys
import tomllib

CONF = "osv-scanner.toml"
MAX_DAYS = 90


def load():
    try:
        with open(CONF, "rb") as fh:
            return tomllib.load(fh).get("IgnoredVulns", [])
    except FileNotFoundError:
        return []


def as_date(v):
    if isinstance(v, dt.datetime):
        if v.tzinfo is not None:
            v = v.astimezone(dt.timezone.utc)
        return v.date()
    if isinstance(v, dt.date):
        return v
    return None


def ignores():
    now = dt.datetime.now(dt.timezone.utc)
    bad = []
    items = load()
    for v in items:
        vid = v.get("id", "?")
        until = v.get("ignoreUntil")
        added = as_date(v.get("added"))
        if not v.get("reason"):
            bad.append(f"{vid}: 缺少 reason")
        if added is None:
            bad.append(f"{vid}: 缺少 added 日期")
        if not isinstance(until, dt.datetime):
            bad.append(f"{vid}: 缺少 ignoreUntil")
            continue
        if until.tzinfo is None:
            until = until.replace(tzinfo=dt.timezone.utc)
        if until <= now:
            bad.append(f"{vid}: 忽略已于 {until:%Y-%m-%d} 过期")
        if added is not None:
            span = (as_date(until) - added).days
            if span < 0:
                bad.append(f"{vid}: ignoreUntil 早于 added")
            elif span > MAX_DAYS:
                bad.append(f"{vid}: 到期日距 added {span} 天，超过 {MAX_DAYS} 天")
    if bad:
        print("\n".join(bad))
        return 1
    print(f"osv-scanner.toml: {len(items)} 条忽略均有效")
    return 0


def active_ids():
    now = dt.datetime.now(dt.timezone.utc)
    ids = set()
    for v in load():
        until = v.get("ignoreUntil")
        if isinstance(until, dt.datetime):
            if until.tzinfo is None:
                until = until.replace(tzinfo=dt.timezone.utc)
            if until > now:
                ids.add(v.get("id"))
    return ids


def tool_rc_ok(name):
    if len(sys.argv) <= 3:
        return True
    try:
        rc = int(sys.argv[3])
    except ValueError:
        rc = -1
    if rc not in (0, 1):
        print(f"::error::{name} 异常退出（{sys.argv[3]}），扫描没有正常完成")
        return False
    return True


def osv_config(out):
    import re
    with open(CONF, encoding="utf-8") as fh:
        text = fh.read()
    text = re.sub(r"(?m)^\s*added\s*=.*\n", "", text)
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(text)
    return 0


def read_json(path):
    try:
        with open(path, encoding="utf-8") as fh:
            data = json.load(fh)
    except (OSError, ValueError) as e:
        print(f"::error::无法读取扫描结果 {path}: {e}")
        return None
    if not isinstance(data, dict):
        print(f"::error::扫描结果 {path} 不是 JSON 对象")
        return None
    return data


SEVERITIES = {"info", "low", "moderate", "high", "critical"}


def audit_gate(path, rc):
    data = read_json(path)
    if data is None:
        return 1
    if "error" in data:
        print(f"::error::pnpm audit 返回错误: {data['error']}")
        return 1
    advisories = data.get("advisories")
    if not isinstance(advisories, dict):
        print("::error::pnpm audit 结果的 advisories 缺失或不是对象")
        return 1
    if not isinstance(data.get("metadata"), dict):
        print("::error::pnpm audit 结果的 metadata 缺失或不是对象")
        return 1
    if rc == 1 and not advisories:
        print("::error::pnpm audit 退出码为 1，但没有任何 advisories，结构可能已变化")
        return 1
    skip = active_ids()
    high = ignored = 0
    for adv in advisories.values():
        if not isinstance(adv, dict):
            print("::error::pnpm audit 的 advisory 条目不是对象")
            return 1
        gid = adv.get("github_advisory_id", "?")
        sev = adv.get("severity")
        if not isinstance(sev, str) or sev.lower() not in SEVERITIES:
            print(f"::error::pnpm audit 的 {gid} severity 缺失或无法识别: {sev!r}")
            return 1
        sev = sev.lower()
        item = f"{adv.get('module_name')} {gid} {sev}"
        if gid in skip:
            print(f"已忽略 {item}")
            ignored += 1
        elif sev in ("high", "critical"):
            print(f"::error::{item}")
            high += 1
        else:
            print(f"::warning::{item}")
    if advisories and ignored == len(advisories):
        print("pnpm audit: 发现的条目全部已忽略")
    print(f"pnpm audit: high/critical {high}")
    return 1 if high else 0


def gate(path, rc):
    data = read_json(path)
    if data is None:
        return 1
    if "error" in data:
        print(f"::error::osv 结果带 error 字段: {data['error']}")
        return 1
    results = data.get("results")
    if not isinstance(results, list):
        print("::error::osv 结果的 results 缺失或不是数组，扫描可能没有正常完成")
        return 1
    high, medium = [], []
    try:
        for res in results:
            for pkg in res.get("packages") or []:
                info = pkg["package"]
                name = f"{info['name']}@{info.get('version', '?')}"
                for g in pkg.get("groups") or []:
                    # 没有分数或分数无法解析时按 High 处理（与 track 仓一致）
                    try:
                        score = float(g.get("max_severity"))
                    except (TypeError, ValueError):
                        score = 10.0
                    item = f"{name} {','.join(g.get('ids', []))} CVSS {score}"
                    (high if score >= 7.0 else medium).append(item)
    except (AttributeError, KeyError, TypeError) as e:
        print(f"::error::osv 结果结构无法解析: {e!r}")
        return 1
    for m in medium:
        print(f"::warning::{m}")
    if rc == 1 and not (high or medium):
        print("::error::osv-scanner 退出码为 1，但结果里没有任何漏洞，结构可能已变化")
        return 1
    for h in high:
        print(f"::error::{h}")
    print(f"High/Critical {len(high)}，Medium 及以下 {len(medium)}")
    return 1 if high else 0


def selftest():
    import contextlib
    import io
    import os
    import tempfile

    adv_mod = {"1": {"github_advisory_id": "GHSA-test-test-test",
                     "module_name": "x", "severity": "moderate"}}
    adv_high = {"1": {"github_advisory_id": "GHSA-high-high-high",
                      "module_name": "x", "severity": "high"}}
    osv_mod = {"results": [{"packages": [{"package": {"name": "x", "version": "1"},
                                          "groups": [{"ids": ["G"], "max_severity": "5.0"}]}]}]}
    # (门禁, 输入, 退出码, 期望返回值)
    cases = [
        ("audit", "{}", 0, 1),
        ("audit", "not json", 0, 1),
        ("audit", "[]", 0, 1),
        ("audit", '{"metadata":{}}', 0, 1),
        ("audit", '{"advisories":null,"metadata":{}}', 0, 1),
        ("audit", '{"advisories":[],"metadata":{}}', 0, 1),
        ("audit", '{"advisories":{},"metadata":null}', 0, 1),
        ("audit", '{"error":{"code":"ERR_PNPM_AUDIT_BAD_RESPONSE"}}', 0, 1),
        ("audit", '{"advisories":{},"metadata":{}}', 1, 1),
        ("audit", '{"advisories":{},"metadata":{}}', 0, 0),
        ("audit", json.dumps({"advisories": adv_mod, "metadata": {}}), 1, 0),
        ("audit", json.dumps({"advisories": adv_high, "metadata": {}}), 1, 1),
        ("audit", json.dumps({"advisories": {"1": {"github_advisory_id": "G",
                                                    "severity": "urgent"}}, "metadata": {}}), 1, 1),
        ("audit", json.dumps({"advisories": {"1": {"github_advisory_id": "G"}},
                              "metadata": {}}), 1, 1),
        ("audit", json.dumps({"advisories": {"1": {"github_advisory_id": "G",
                                                    "severity": 7}}, "metadata": {}}), 1, 1),
        ("audit", json.dumps({"advisories": {"1": {"github_advisory_id": "G",
                                                    "severity": "Moderate"}}, "metadata": {}}), 1, 0),
        ("osv", '{"results":[{"packages":[{"package":{"name":"x"},"groups":[{"ids":["G"]}]}]}]}', 1, 1),
        ("osv", '{"results":[{"packages":[{"package":{"name":"x"},"groups":[{"ids":["G"],"max_severity":""}]}]}]}', 1, 1),
        ("osv", "{}", 0, 1),
        ("osv", "not json", 0, 1),
        ("osv", '{"results":null}', 0, 1),
        ("osv", '{"results":{}}', 0, 1),
        ("osv", '{"error":"x","results":[]}', 0, 1),
        ("osv", '{"results":[]}', 1, 1),
        ("osv", '{"results":[1]}', 1, 1),
        ("osv", '{"results":[]}', 0, 0),
        ("osv", json.dumps(osv_mod), 1, 0),
    ]
    fails = 0
    with tempfile.TemporaryDirectory() as d:
        for n, (kind, text, rc, want) in enumerate(cases):
            path = os.path.join(d, f"{n}.json")
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(text)
            fn = audit_gate if kind == "audit" else gate
            with contextlib.redirect_stdout(io.StringIO()):
                got = fn(path, rc)
            ok = got == want
            fails += not ok
            print(f"{'通过' if ok else '失败'} {kind} rc={rc} 期望 {want} 实得 {got}: {text[:60]}")
    # rc 必填：用子进程跑命令行，缺退出码应返回 2
    import subprocess
    with tempfile.TemporaryDirectory() as d:
        path = os.path.join(d, "ok.json")
        with open(path, "w", encoding="utf-8") as fh:
            fh.write('{"results":[]}')
        for sub in ("gate", "audit-gate"):
            got = subprocess.run([sys.executable, __file__, sub, path],
                                 capture_output=True).returncode
            ok = got == 2
            fails += not ok
            cases.append(None)
            print(f"{'通过' if ok else '失败'} {sub} 缺退出码 期望 2 实得 {got}")
    print(f"selftest: {len(cases)} 例，失败 {fails}")
    return 1 if fails else 0


def tool_rc(name):
    """读第三个参数作为工具退出码；0、1 之外返回 None 表示异常。"""
    return int(sys.argv[3]) if tool_rc_ok(name) else None


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "ignores":
        sys.exit(ignores())
    if cmd == "selftest":
        sys.exit(selftest())
    if cmd == "osv-config" and len(sys.argv) > 2:
        sys.exit(osv_config(sys.argv[2]))
    if cmd in ("gate", "audit-gate") and len(sys.argv) == 3:
        print("::error::必须传入扫描工具的退出码（第三个参数）")
        sys.exit(2)
    if cmd in ("gate", "audit-gate") and len(sys.argv) > 3:
        rc = tool_rc("osv-scanner" if cmd == "gate" else "pnpm audit")
        if rc is None:
            sys.exit(1)
        fn = gate if cmd == "gate" else audit_gate
        sys.exit(fn(sys.argv[2], rc))
    print(__doc__)
    sys.exit(2)
