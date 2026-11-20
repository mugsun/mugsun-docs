import type { MarkdownRenderer } from 'vitepress'

/**
 * Render `- [ ] item` / `- [x] item` as checkboxes.
 * Kept in the repo so the site needs no extra markdown-it plugin.
 * The theme remembers ticked items per page (theme/task-checks.ts).
 */
export function taskLists(md: MarkdownRenderer): void {
  md.core.ruler.after('inline', 'ms-task-lists', (state) => {
    const tokens = state.tokens
    for (let i = 2; i < tokens.length; i++) {
      const inline = tokens[i]
      if (
        inline.type !== 'inline' ||
        tokens[i - 1].type !== 'paragraph_open' ||
        tokens[i - 2].type !== 'list_item_open'
      ) {
        continue
      }
      const first = inline.children?.[0]
      if (!first || first.type !== 'text') continue
      const marker = /^\[([ xX])\] /.exec(first.content)
      if (!marker) continue

      first.content = first.content.slice(marker[0].length)
      const label = inline.content
        .slice(marker[0].length)
        .replace(/\]\([^)]*\)/g, '')
        .replace(/[`*[\]{}]/g, '')
        .slice(0, 80)
      const box = new state.Token('html_inline', '', 0)
      box.content =
        `<input class="ms-task-check" type="checkbox" aria-label="${md.utils.escapeHtml(label)}"` +
        `${marker[1] === ' ' ? '' : ' checked'}>`
      inline.children!.unshift(box)
      tokens[i - 2].attrJoin('class', 'ms-task')
    }
  })
}
