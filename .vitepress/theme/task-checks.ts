import { useRoute } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'

const PREFIX = 'ms-task:'

/** Items are keyed by their text, so reordering a checklist keeps the ticks. */
function itemKey(box: HTMLInputElement): string {
  return (box.closest('li')?.textContent ?? '').trim().slice(0, 80)
}

function load(path: string): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(PREFIX + path) ?? '[]') as string[])
  } catch {
    return new Set()
  }
}

function save(path: string, done: Set<string>): void {
  try {
    if (done.size) localStorage.setItem(PREFIX + path, JSON.stringify([...done]))
    else localStorage.removeItem(PREFIX + path)
  } catch {
    // Storage is unavailable (private mode): the boxes still work for this visit.
  }
}

/** Remember ticked `- [ ]` items per page, in this browser only. */
export function useTaskChecks(): void {
  const route = useRoute()

  const sync = () => {
    const boxes = document.querySelectorAll<HTMLInputElement>('.vp-doc input.ms-task-check')
    if (!boxes.length) return
    const path = route.path
    const done = load(path)
    boxes.forEach((box) => {
      const key = itemKey(box)
      box.checked = done.has(key)
      box.onchange = () => {
        const current = load(path)
        if (box.checked) current.add(key)
        else current.delete(key)
        save(path, current)
      }
    })
  }

  onMounted(sync)
  watch(() => route.path, () => nextTick(sync))
}
