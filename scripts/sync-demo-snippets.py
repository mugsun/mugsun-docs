#!/usr/bin/env python3
"""Fill ms-ui component pages' 「基础用法 / Basic usage」 with real snippets
taken from mugsun-uniappx-ui pages/demo/*.uvue.

Usage: python3 scripts/sync-demo-snippets.py ../mugsun-uniappx-ui
Re-run after demo pages change; the block between the markers is regenerated.
"""
import re, sys, pathlib, textwrap

UI = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '../mugsun-uniappx-ui')
DOCS = pathlib.Path(__file__).resolve().parent.parent
START, END = '<!-- demo-snippets:start -->', '<!-- demo-snippets:end -->'
MAX_SECTIONS, MAX_PER_SECTION = 4, 3

def find_elements(src, tag):
    """Outermost <tag ...>...</tag> or <tag .../> occurrences (depth aware)."""
    out, i = [], 0
    open_re = re.compile(r'<%s(?=[\s>/])' % re.escape(tag))
    while True:
        m = open_re.search(src, i)
        if not m: break
        start = m.start()
        gt = src.find('>', m.end())
        # skip '>' inside attribute expressions like "a > b": naive but adequate
        while gt != -1 and src.count('"', m.end(), gt) % 2 == 1:
            gt = src.find('>', gt + 1)
        if gt == -1: break
        if src[gt - 1] == '/':
            out.append(src[start:gt + 1]); i = gt + 1; continue
        depth, j = 1, gt + 1
        tok = re.compile(r'<(/?)%s(?=[\s>/])' % re.escape(tag))
        while depth:
            t = tok.search(src, j)
            if not t: j = len(src); break
            e = src.find('>', t.end())
            if t.group(1): depth -= 1
            elif src[e - 1] != '/': depth += 1
            j = e + 1
        out.append(src[start:j]); i = j
    return out

def dedent(s):
    lines = s.replace('\t', '  ').split('\n')
    if len(lines) > 1:
        rest = textwrap.dedent('\n'.join(lines[1:]))
        first_indent = min((len(l) - len(l.lstrip()) for l in rest.split('\n') if l.strip()), default=0)
        return lines[0].strip() + '\n' + rest if first_indent == 0 else lines[0].strip() + '\n' + rest
    return s.strip()

DEMO_ATTR = re.compile(r'\s+(?:id="(?:demo|probe)-[^"]*"|class="demo-[^"]*")')
DEMO_TEXT = re.compile(r'^\s*<text class="demo-card-[^"]*"[^>]*>[^<]*</text>\s*\n', re.M)

def clean(el):
    return DEMO_TEXT.sub('', DEMO_ATTR.sub('', el))

def normalize(el):
    el = clean(el)
    lines = el.replace('\t', '  ').split('\n')
    if len(lines) == 1: return el.strip()
    body = textwrap.dedent('\n'.join(lines[1:]))
    # closing tag sets baseline
    last = body.split('\n')[-1]
    base = len(last) - len(last.lstrip())
    body = '\n'.join(l[base:] if l[:base].strip() == '' else l for l in body.split('\n'))
    return lines[0].strip() + '\n' + body

def sections(template):
    secs = []
    for blk in find_elements(template, 'ms-sheet'):
        t = re.search(r'class="demo-card-title"[^>]*>([^<]+)<', blk)
        secs.append(((t.group(1).strip() if t else ''), blk))
    return secs

def build(tag, demo_src, lang):
    tm = re.search(r'<template>([\s\S]*)</template>', demo_src)
    if not tm: return None
    tpl = tm.group(1)
    if tag.endswith('-item') and re.search(r'<%s(?=[\s>/])' % re.escape(tag[:-5]), tpl):
        tag = tag[:-5]
    blocks, seen, budget = [], set(), 48
    secs = sections(tpl) if tag != 'ms-sheet' else []
    for title, blk in secs:
        els = [e for e in find_elements(blk[len('<ms-sheet'):], tag) if clean(e) not in seen][:MAX_PER_SECTION]
        if not els: continue
        cost = sum(e.count('\n') + 1 for e in els)
        if blocks and cost > budget: break
        seen.update(clean(e) for e in els); budget -= cost
        blocks.append((title, els))
        if len(blocks) >= MAX_SECTIONS or budget <= 0: break
    if not blocks:
        els = find_elements(tpl, tag)
        if not els: return None
        blocks = [('', els[:MAX_PER_SECTION])]
    used = ' '.join(e for _, els in blocks for e in els)
    script = re.search(r'<script[^>]*>([\s\S]*?)</script>', demo_src)
    decls = []
    if script:
        for line in script.group(1).split('\n'):
            m = re.match(r'\s*const\s+(\w+)\s*=\s*(ref|reactive|computed)\b.*$', line)
            if m and re.search(r'\b%s\b' % m.group(1), used) and len(line) < 140:
                decls.append(line.strip())
    parts = []
    for title, els in blocks:
        if title: parts.append('  <!-- %s -->' % title)
        for e in els:
            parts.append(textwrap.indent(normalize(e), '  '))
    code = '<template>\n' + '\n'.join(parts) + '\n</template>'
    if decls:
        code += '\n\n<script setup lang="uts">\n' + '\n'.join(decls) + '\n</script>'
    return code

def main():
    changed = 0
    for lang, base in (('zh', DOCS / 'uniappx/components'), ('en', DOCS / 'en/uniappx/components')):
        for md in sorted(base.glob('*.md')):
            text = md.read_text()
            dm = re.search(r'^demo:\s*(\S+)', text, re.M)
            if not dm: continue
            demo = UI / (dm.group(1) + '.uvue')
            if not demo.exists(): print('skip (no demo):', md.name); continue
            code = build('ms-' + md.stem, demo.read_text(), lang)
            if not code: print('skip (no tag in demo):', md.name); continue
            note = ('以下片段摘自演示源码 `%s.uvue`，可在右侧手机框中查看运行效果。' % dm.group(1)) if lang == 'zh' else \
                   ('Snippets below are taken from the demo source `%s.uvue`; see them running in the phone frame.' % dm.group(1))
            block = '%s\n%s\n\n```vue\n%s\n```\n%s' % (START, note, code, END)
            head = '## 基础用法' if lang == 'zh' else '## Basic usage'
            if START in text:
                new = re.sub(re.escape(START) + r'[\s\S]*?' + re.escape(END), lambda _: block, text)
            else:
                new = re.sub(r'(%s\n\n)```vue\n[\s\S]*?\n```' % re.escape(head), lambda m: m.group(1) + block, text, count=1)
            if new != text:
                md.write_text(new); changed += 1
    print('updated', changed, 'pages')

main()
