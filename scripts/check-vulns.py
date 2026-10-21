#!/usr/bin/env python3
"""漏洞扫描门禁（ci-checklist 3.1）。

子命令：
  ignores            校验 osv-scanner.toml：每条有 reason 和 ignoreUntil，
                     未过期，且距今不超过 90 天。
  audit-gate <a.json> 读 pnpm audit --json 的结果：high/critical 失败，
                     osv-scanner.toml 中未过期的 id 跳过。不用 pnpm audit
                     --ignore，因为 pnpm 11 会把它写回 pnpm-workspace.yaml。
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


def ignores():
    now = dt.datetime.now(dt.timezone.utc)
    bad = []
    for v in load():
        vid = v.get("id", "?")
        until = v.get("ignoreUntil")
        if not v.get("reason"):
            bad.append(f"{vid}: 缺少 reason")
        if not isinstance(until, dt.datetime):
            bad.append(f"{vid}: 缺少 ignoreUntil")
            continue
        if until.tzinfo is None:
            until = until.replace(tzinfo=dt.timezone.utc)
        if until <= now:
            bad.append(f"{vid}: 忽略已于 {until:%Y-%m-%d} 过期")
        elif (until - now).days > MAX_DAYS:
            bad.append(f"{vid}: 到期日 {until:%Y-%m-%d} 超过 {MAX_DAYS} 天")
    if bad:
        print("\n".join(bad))
        return 1
    print(f"osv-scanner.toml: {len(load())} 条忽略均有效")
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
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
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


def gate(path):
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
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
        sys.exit(audit_gate(sys.argv[2]))
    if cmd == "gate" and len(sys.argv) > 2:
        sys.exit(gate(sys.argv[2]))
    print(__doc__)
    sys.exit(2)
