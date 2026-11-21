<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import MsIcon from './MsIcon.vue'

// All copy comes from the `landing` block in the page frontmatter (index.md and en/index.md).
const { frontmatter } = useData()
const d = computed<any>(() => frontmatter.value.landing ?? {})
const active = ref(0)
const copied = ref(false)
const tablist = ref<HTMLElement | null>(null)

const external = (link?: string) => !!link && /^(https?:)?\/\//.test(link)
const href = (link?: string) => (!link ? undefined : external(link) ? link : withBase(link))
const target = (link?: string) => (external(link) ? '_blank' : undefined)
const rel = (link?: string) => (external(link) ? 'noopener' : undefined)
const pad = (n: number) => String(n).padStart(2, '0')

const shots = computed<any[]>(() => d.value.showcase?.items ?? [])
const shown = computed(() => shots.value[active.value])
const script = computed(() =>
  ((d.value.start?.lines ?? []) as { cmd: string }[]).map((l) => l.cmd).join('\n'),
)

// Arrow keys move between tabs, as the tablist role promises.
function onTabKey(e: KeyboardEvent) {
  const n = shots.value.length
  const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
  let next = -1
  if (e.key in step) next = (active.value + step[e.key] + n) % n
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = n - 1
  if (next < 0) return
  e.preventDefault()
  active.value = next
  const tab = tablist.value?.children[next] as HTMLElement | undefined
  tab?.focus()
  tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

// Panels marked .mh-spot light up under the pointer; the CSS reads --mx and --my.
function onSpot(e: MouseEvent) {
  const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.mh-spot')
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

async function copyScript() {
  const text = script.value
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
    } catch {
      /* clipboard not available */
    }
    document.body.removeChild(ta)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <div class="ms-home" @mousemove.passive="onSpot">
    <section v-if="d.hero" class="mh-hero">
      <div class="mh-hero__bg" aria-hidden="true">
        <span class="mh-beam mh-beam--a"></span>
        <span class="mh-beam mh-beam--b"></span>
        <span class="mh-beam mh-beam--c"></span>
      </div>

      <div class="mh-wrap mh-hero__text">
        <component
          :is="d.hero.badge.link ? 'a' : 'p'"
          v-if="d.hero.badge"
          class="mh-chip"
          :href="href(d.hero.badge.link)"
          :target="target(d.hero.badge.link)"
          :rel="rel(d.hero.badge.link)"
        >
          <span class="mh-chip__dot" aria-hidden="true"></span>
          {{ d.hero.badge.text }}
          <MsIcon v-if="d.hero.badge.link" name="external" :size="13" />
        </component>
        <h1 class="mh-title">
          <span
            v-for="(line, i) in d.hero.title"
            :key="i"
            :class="{ 'mh-title__accent': i + 1 === d.hero.accentLine }"
            >{{ line }}</span
          >
        </h1>
        <p class="mh-lead">{{ d.hero.lead }}</p>
        <div class="mh-actions">
          <a
            v-for="a in d.hero.actions"
            :key="a.text"
            class="mh-btn"
            :class="`mh-btn--${a.theme || 'alt'}`"
            :href="href(a.link)"
            :target="target(a.link)"
            :rel="rel(a.link)"
          >
            {{ a.text }}
            <MsIcon v-if="a.theme === 'brand'" name="arrow" :size="16" />
          </a>
        </div>
        <p v-if="d.hero.note" class="mh-note">{{ d.hero.note }}</p>
      </div>

      <div v-if="shown" class="mh-wrap mh-show">
        <h2 class="visually-hidden">{{ d.showcase.title }}</h2>
        <div class="mh-win">
          <div class="mh-win__bar">
            <div
              ref="tablist"
              class="mh-tabs"
              role="tablist"
              :aria-label="d.showcase.title"
              @keydown="onTabKey"
            >
              <button
                v-for="(s, i) in shots"
                :id="`mh-tab-${i}`"
                :key="s.title"
                type="button"
                role="tab"
                aria-controls="mh-shot"
                :aria-selected="i === active"
                :tabindex="i === active ? 0 : -1"
                :class="{ active: i === active }"
                @click="active = i"
              >
                {{ s.title }}
              </button>
            </div>
            <span class="mh-win__path">{{ shown.label }}</span>
          </div>
          <div id="mh-shot" role="tabpanel" :aria-labelledby="`mh-tab-${active}`">
            <figure class="mh-shot">
              <div class="mh-shot__img">
                <img
                  v-for="(s, i) in shots"
                  v-show="i === active"
                  :key="s.src"
                  :class="{ contain: s.fit === 'contain' }"
                  :src="withBase(s.src)"
                  :alt="s.alt"
                  :loading="i === 0 ? 'eager' : 'lazy'"
                  :fetchpriority="i === 0 ? 'high' : undefined"
                />
              </div>
              <figcaption class="mh-shot__cap">
                <strong>{{ shown.label }}</strong>
                <span>{{ shown.text }}</span>
                <a v-if="shown.link" :href="href(shown.link)">
                  {{ d.showcase.more }}<MsIcon name="arrow" :size="14" />
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
        <p v-if="d.showcase.lead" class="mh-show__note">{{ d.showcase.lead }}</p>
      </div>

      <div v-if="d.facts" class="mh-wrap">
        <dl class="mh-facts">
          <div v-for="f in d.facts" :key="f.value" class="mh-fact">
            <dt>{{ f.value }}</dt>
            <dd>{{ f.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section v-if="d.paths" class="mh-section">
      <div class="mh-wrap">
        <p class="mh-label">{{ d.paths.eyebrow }}</p>
        <header class="mh-head">
          <h2>{{ d.paths.title }}</h2>
          <p class="mh-sub">{{ d.paths.lead }}</p>
        </header>
        <div class="mh-paths">
          <article v-for="p in d.paths.items" :key="p.title" class="mh-path mh-spot">
            <h3><MsIcon :name="p.icon" :size="18" />{{ p.title }}</h3>
            <p>{{ p.text }}</p>
            <ol>
              <li v-for="(l, i) in p.links" :key="l.link">
                <a :href="href(l.link)">
                  <span class="mh-path__n">{{ pad(i + 1) }}</span>
                  <span class="mh-path__t">{{ l.text }}</span>
                  <MsIcon name="arrow" :size="14" />
                </a>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </section>

    <section v-if="d.features" class="mh-section">
      <div class="mh-wrap">
        <p class="mh-label">{{ d.features.eyebrow }}</p>
        <header class="mh-head">
          <h2>{{ d.features.title }}</h2>
          <p class="mh-sub">{{ d.features.lead }}</p>
        </header>
        <div class="mh-features">
          <a
            v-for="f in d.features.items"
            :key="f.title"
            class="mh-feature mh-spot"
            :href="href(f.link)"
          >
            <MsIcon class="mh-feature__icon" :name="f.icon" :size="20" />
            <MsIcon class="mh-feature__go" name="external" :size="16" />
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </a>
        </div>
      </div>
    </section>

    <section v-if="d.start" class="mh-section">
      <div class="mh-wrap">
        <p class="mh-label">{{ d.start.eyebrow }}</p>
        <div class="mh-start">
          <div class="mh-start__text">
            <h2>{{ d.start.title }}</h2>
            <p class="mh-sub">{{ d.start.lead }}</p>
            <a v-if="d.start.action" class="mh-btn mh-btn--brand" :href="href(d.start.action.link)">
              {{ d.start.action.text }}<MsIcon name="arrow" :size="16" />
            </a>
          </div>
          <div class="mh-term">
            <div class="mh-term__bar">
              <span class="mh-term__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="mh-term__name">bash</span>
              <button
                class="mh-copy"
                type="button"
                :title="d.copyLabel"
                :aria-label="d.copyLabel"
                @click="copyScript"
              >
                <MsIcon :name="copied ? 'check' : 'copy'" :size="16" />
              </button>
            </div>
            <pre><code><template v-for="(l, i) in d.start.lines" :key="i"><span v-if="l.comment" class="c"># {{ l.comment }}{{ '\n' }}</span><span class="p">$ </span>{{ l.cmd }}{{ '\n' }}<span v-if="l.out" class="o">{{ l.out }}{{ '\n' }}</span></template></code></pre>
          </div>
          <ol class="mh-steps">
            <li v-for="s in d.start.steps" :key="s.title">
              <strong>{{ s.title }}</strong>
              <span>{{ s.text }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section v-if="d.products" class="mh-section">
      <div class="mh-wrap">
        <p class="mh-label">{{ d.products.eyebrow }}</p>
        <header class="mh-head">
          <h2>{{ d.products.title }}</h2>
          <p class="mh-sub">{{ d.products.lead }}</p>
        </header>
        <ul class="mh-repos">
          <li v-for="p in d.products.items" :key="p.name" class="mh-repo">
            <div>
              <h3>{{ p.name }}</h3>
              <p class="mh-repo__role">{{ p.role }}</p>
            </div>
            <div>
              <p class="mh-repo__text">{{ p.text }}</p>
              <ul v-if="p.tags" class="mh-tags">
                <li v-for="t in p.tags" :key="t">{{ t }}</li>
              </ul>
            </div>
            <div class="mh-repo__links">
              <a :href="href(p.link)">{{ d.products.docs }}<MsIcon name="arrow" :size="14" /></a>
              <a v-if="p.repo" class="mh-repo__gh" :href="p.repo" target="_blank" rel="noopener">
                GitHub<MsIcon name="external" :size="14" />
              </a>
              <span v-else-if="p.note" class="mh-repo__note">{{ p.note }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="d.cta" class="mh-section mh-section--cta">
      <div class="mh-wrap">
        <div class="mh-cta">
          <h2>{{ d.cta.title }}</h2>
          <p>{{ d.cta.text }}</p>
          <div class="mh-actions">
            <a
              v-for="a in d.cta.actions"
              :key="a.text"
              class="mh-btn"
              :class="`mh-btn--${a.theme || 'alt'}`"
              :href="href(a.link)"
              :target="target(a.link)"
              :rel="rel(a.link)"
            >
              {{ a.text }}
              <MsIcon v-if="a.theme === 'brand'" name="arrow" :size="16" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
