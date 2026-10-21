#!/usr/bin/env python3
"""漏洞扫描门禁（ci-checklist 3.1）。

子命令：
  ignores            校验 osv-scanner.toml：每条有 reason、added 和
                     ignoreUntil，未过期，且 ignoreUntil 距 added 不超过
                     90 天（第 90 天当天仍有效）。续期要经安全官审：
                     续期时同时改 added 和 ignoreUntil。
  audit-gate <a.json> 读 pnpm audit --json 的结果：high/critical 失败，
                     osv-scanner.toml 中未过期的 id 跳过。不用 pnpm audit
                     --ignore，因为 pnpm 11 会把它写回 pnpm-workspace.yaml。
  osv-config <out>   把 osv-scanner.toml 去掉 added 后写到 <out>。
                     osv-scanner 不认 added 键，遇到未知键会退出。
  （gate 和 audit-gate 可带第三个参数：扫描工具的退出码。
   0 和 1 表示正常完成，其他退出码判为失败。）
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


def audit_gate(path):
    data = read_json(path)
    if data is None:
        return 1
    if "error" in data:
        print(f"::error::pnpm audit 返回错误: {data['error']}")
        return 1
    if "advisories" not in data and "metadata" not in data:
        print("::error::pnpm audit 结果既无 advisories 也无 metadata")
        return 1
    skip = active_ids()
    high = 0
    for adv in (data.get("advisories") or {}).values():
        gid = adv.get("github_advisory_id", "?")
        item = f"{adv.get('module_name')} {gid} {adv.get('severity')}"
        if gid in skip:
            print(f"已忽略 {item}")
        elif adv.get("severity") in ("high", "critical"):
            print(f"::error::{item}")
            high += 1
        else:
            print(f"::warning::{item}")
    print(f"pnpm audit: high/critical {high}")
    return 1 if high else 0


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


def gate(path):
    data = read_json(path)
    if data is None:
        return 1
    if "results" not in data:
        print(f"::error::osv 结果缺少 results 键，扫描可能没有正常完成")
        return 1
    high, medium = [], []
    for res in data.get("results") or []:
        for pkg in res.get("packages") or []:
            name = f"{pkg['package']['name']}@{pkg['package'].get('version', '?')}"
            for g in pkg.get("groups") or []:
                try:
                    score = float(g.get("max_severity") or 0)
                except ValueError:
                    score = 0.0
                item = f"{name} {','.join(g.get('ids', []))} CVSS {score}"
                (high if score >= 7.0 else medium).append(item)
    for m in medium:
        print(f"::warning::{m}")
    for h in high:
        print(f"::error::{h}")
    print(f"High/Critical {len(high)}，Medium 及以下 {len(medium)}")
    return 1 if high else 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "ignores":
        sys.exit(ignores())
    if cmd == "audit-gate" and len(sys.argv) > 2:
        sys.exit(audit_gate(sys.argv[2]) if tool_rc_ok("pnpm audit") else 1)
    if cmd == "osv-config" and len(sys.argv) > 2:
        sys.exit(osv_config(sys.argv[2]))
    if cmd == "gate" and len(sys.argv) > 2:
        sys.exit(gate(sys.argv[2]) if tool_rc_ok("osv-scanner") else 1)
    print(__doc__)
    sys.exit(2)
