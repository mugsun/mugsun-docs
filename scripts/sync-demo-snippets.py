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


JS_WORDS = set('true false null undefined this index item i e $event'.split())

def statement_at(src, start):
    """From `start`, return the full statement (balanced brackets, ends at newline at depth 0)."""
    depth, i, q = 0, start, None
    while i < len(src):
        c = src[i]
        if q:
            if c == '\\': i += 2; continue
            if c == q: q = None
        elif c in '\'"`': q = c
        elif c in '([{': depth += 1
        elif c in ')]}': depth -= 1
        elif c == '\n' and depth <= 0:
            return src[start:i]
        i += 1
    return src[start:]

def template_ids(used):
    handlers, bound, aliases = {}, set(), set()
    for m in re.finditer(r'v-for="\s*\(?([\w\s,]+?)\)?\s+in\s', used):
        aliases.update(a.strip() for a in m.group(1).split(','))
    for m in re.finditer(r'[#]\w+="\{?([\w\s,]+)\}?"|v-slot(?::\w+)?="\{?([\w\s,]+)\}?"', used):
        aliases.update(a.strip() for a in (m.group(1) or m.group(2)).split(','))
    for m in re.finditer(r'\s@[\w:.-]+="\s*([A-Za-z_]\w*)\s*(\(([^"]*)\))?\s*"', used):
        handlers[m.group(1)] = m.group(3) is not None
    for m in re.finditer(r'\s(?::[\w.-]+|v-model(?::\w+)?|v-if|v-show|v-for)="([^"]*)"', used):
        expr = re.sub(r"'[^']*'|`[^`]*`", '', m.group(1))
        expr = re.sub(r'^\s*\(?[\w\s,]+\)?\s+in\s+', '', expr)  # v-for alias
        for tok in re.findall(r'(?<![\w.$])([A-Za-z_]\w*)', expr):
            if tok not in JS_WORDS and not tok[0].isupper(): bound.add(tok)
    return handlers, bound - aliases

def declarations(script, used):
    """Minimal set of script declarations so the snippet runs standalone:
    reactive state is copied verbatim (if short), handlers become typed no-op stubs."""
    script = textwrap.dedent(script.replace('\t', '  '))
    handlers, bound = template_ids(used)
    out, seen = [], set()
    def find_decl(name):
        m = re.search(r'^(?:const|let)\s+%s\b[^\n]*' % re.escape(name), script, re.M)
        return statement_at(script, m.start()) if m else None
    for name in sorted(bound - set(handlers)):
        st = find_decl(name)
        fn = re.search(r'^function\s+%s\b' % re.escape(name), script, re.M)
        if not st and fn:
            body = statement_at(script, fn.start())
            if body.count('\n') <= 12 and name not in seen: out.append(body.rstrip()); seen.add(name)
            continue
        if st and st.count('\n') < 60 and not re.search(r'=\s*(async\s*)?(\([^)]*\)|\w+)\s*(:\s*[\w<>\[\]| ]+)?\s*=>', st.split('\n')[0]):
            if name not in seen: out.append(st.rstrip()); seen.add(name)
    for name in handlers:
        if name in seen: continue
        sig = re.search(r'^(?:async\s+)?function\s+%s\s*(\([^)]*\))\s*(:\s*[^{]+)?\{' % re.escape(name), script, re.M)
        arrow = re.search(r'^const\s+%s\s*=\s*(?:async\s*)?(\([^)]*\))\s*(:\s*[^=]+)?=>' % re.escape(name), script, re.M)
        params = (sig or arrow).group(1) if (sig or arrow) else ('(e: any)' if not handlers[name] else '(arg: any)')
        if sig:
            body = statement_at(script, sig.start())
            refs = set(re.findall(r'\b(\w+)\.value\b', body))
            calls = set(re.findall(r'(?<![\w.])([a-z]\w*)\(', body.split('{', 1)[1])) - {'console', 'String', 'Number'}
            if body.count('\n') <= 6 and refs <= seen and not (calls - {'uni'}):
                out.append(body.rstrip()); seen.add(name); continue
        out.append("function %s%s : void {\n  console.log('%s')\n}" % (name, params, name))
        seen.add(name)
    types, pending = [], ' '.join(out)
    for _ in range(3):
        for t in sorted(set(re.findall(r'\b([A-Z]\w*)\b', pending))):
            m = re.search(r'^(?:export\s+)?type\s+%s\b' % t, script, re.M)
            if m and t not in seen:
                st = statement_at(script, m.start()); types.append(st.rstrip()); seen.add(t); pending += st
    return types + out

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
    decls = declarations(script.group(1) if script else '', used)
    parts = []
    for title, els in blocks:
        if title: parts.append('  <!-- %s -->' % title)
        for e in els:
            parts.append(textwrap.indent(normalize(e), '  '))
    code = '<template>\n' + '\n'.join(parts) + '\n</template>'
    if decls:
        code += '\n\n<script setup lang="uts">\n' + '\n\n'.join(decls) + '\n</script>'
    return code

def unresolved(code):
    tpl, _, scr = code.partition('<script')
    handlers, bound = template_ids(tpl)
    declared = set(re.findall(r'(?:const|let|function)\s+(\w+)', scr))
    return sorted((set(handlers) | bound) - declared)

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
            miss = unresolved(code)
            if miss and lang == 'zh': print('  unresolved in', md.name, miss)
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
