#!/usr/bin/env python3
"""文档行宽检查（ci-checklist 四、mugsun-docs「中文行宽 ≤80」）。

只查本次 diff 新增或改动的中文段落和列表项：
- 每段或每个列表项按 python len 不超过 80；
- 跳过 frontmatter、代码块、表格行、HTML 行、::: 容器标记；
- 链接只计文字，URL 不计长度；行内代码照常计；
- 中文不要硬折行：一个段落写在一行里。检测到折行时只提示，
  长度按整段合并后计算，所以折行也绕不过限制。

用法:
  check-doc-width.py <base_sha>     对比 base..HEAD
  check-doc-width.py --all          检查全部 .md（用于盘点）
CHANGELOG.md 由 check-changelog.py 单独检查，这里跳过。
"""
import re
import subprocess
import sys

LIMIT = 80
CJK = re.compile(r"[\u3400-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef]")
SKIP_FILES = {"CHANGELOG.md"}


def git(*args):
    return subprocess.run(["git", *args], capture_output=True, text=True,
                          check=True).stdout


def changed(base):
    """返回 {文件: 新增行号集合}。"""
    if set(base) == {"0"} or not base:
        base = "HEAD~1"
    out = git("diff", "-U0", "--diff-filter=AM", base, "HEAD", "--", "*.md")
    res, cur = {}, None
    for line in out.splitlines():
        if line.startswith("+++ "):
            cur = line[6:] if line.startswith("+++ b/") else None
            if cur:
                res.setdefault(cur, set())
        elif line.startswith("@@") and cur:
            m = re.search(r"\+(\d+)(?:,(\d+))?", line)
            start, n = int(m.group(1)), int(m.group(2) or 1)
            res[cur].update(range(start, start + n))
    return res


def visible(text):
    text = re.sub(r"!?\[([^\]]*)\]\([^)]*\)", r"\1", text)  # 链接只留文字
    text = re.sub(r"\[([^\]]*)\]\[[^\]]*\]", r"\1", text)
    text = re.sub(r"<?https?://[^\s)>]+>?", "", text)       # 裸 URL 不计
    return text


ITEM = re.compile(r"^(\s*)(?:[-*+]|\d+[.)])\s+")


def blocks(lines):
    """切出段落和列表项，返回 [(起始行号, [行号...], 合并文本)]。"""
    out, cur = [], None
    fence = None
    front = lines[:1] == ["---"]

    def flush():
        nonlocal cur
        if cur:
            out.append(cur)
        cur = None

    for i, raw in enumerate(lines, 1):
        s = raw.strip()
        if front:
            if i > 1 and s == "---":
                front = False
            continue
        m = re.match(r"^\s*(```+|~~~+)", raw)
        if fence:
            if m and m.group(1)[0] == fence[0] and len(m.group(1)) >= len(fence):
                fence = None
            continue
        if m:
            flush()
            fence = m.group(1)
            continue
        if (not s or s.startswith("|") or s.startswith("<") or s.startswith(":::")
                or s.startswith("#") or re.match(r"^[-*_]{3,}$", s)
                or re.match(r"^\[[^\]]+\]:\s", s)):
            flush()
            continue
        body = re.sub(r"^(>\s*)+", "", s)
        im = ITEM.match(body)
        if im:
            flush()
            body = body[im.end():]
            cur = [i, [i], body]
        elif cur:
            cur[1].append(i)
            cur[2] += body
        else:
            cur = [i, [i], body]
    flush()
    return out


def check(path, wanted):
    try:
        lines = open(path, encoding="utf-8").read().splitlines()
    except FileNotFoundError:
        return [], []
    bad, warn = [], []
    for start, nums, text in blocks(lines):
        if wanted is not None and not wanted.intersection(nums):
            continue
        if not CJK.search(text):
            continue
        n = len(visible(text))
        if n > LIMIT:
            bad.append(f"{path}:{start} 段落或列表项 {n} 字，超过 {LIMIT}")
        if len(nums) > 1:
            warn.append(f"{path}:{start} 中文段落折成了 {len(nums)} 行，请写成一行")
    return bad, warn


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    if sys.argv[1] == "--all":
        files = {f: None for f in git("ls-files", "*.md").split()}
    else:
        files = changed(sys.argv[1])
    bad, warn = [], []
    for f, wanted in sorted(files.items()):
        if f.rsplit("/", 1)[-1] in SKIP_FILES or "node_modules/" in f:
            continue
        b, w = check(f, wanted)
        bad += b
        warn += w
    for w in warn:
        print(f"提示: {w}")
    for b in bad:
        print(b)
    print(f"check-doc-width: {len(files)} 个文件，{len(bad)} 处超长")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
