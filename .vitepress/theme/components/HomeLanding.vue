<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import MsIcon from './MsIcon.vue'

// All copy comes from the `landing` block in the page frontmatter (index.md and en/index.md).
const { frontmatter } = useData()
const d = computed<any>(() => frontmatter.value.landing ?? {})
const active = ref(0)
const copied = ref(false)

const external = (link?: string) => !!link && /^(https?:)?\/\//.test(link)
const href = (link?: string) => (!link ? undefined : external(link) ? link : withBase(link))
const target = (link?: string) => (external(link) ? '_blank' : undefined)
const rel = (link?: string) => (external(link) ? 'noopener' : undefined)

const shown = computed(() => d.value.showcase?.items?.[active.value])
const script = computed(() =>
  ((d.value.start?.lines ?? []) as { cmd: string }[]).map((l) => l.cmd).join('\n'),
)

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
  <div class="ms-home">
    <section v-if="d.hero" class="mh-hero">
      <div class="mh-hero__bg" aria-hidden="true" />
      <div class="mh-wrap mh-hero__grid">
        <div class="mh-hero__text">
          <component
            :is="d.hero.badge.link ? 'a' : 'p'"
            v-if="d.hero.badge"
            class="mh-badge"
            :href="href(d.hero.badge.link)"
            :target="target(d.hero.badge.link)"
            :rel="rel(d.hero.badge.link)"
          >
            <span class="mh-badge__dot" />{{ d.hero.badge.text }}
            <MsIcon v-if="d.hero.badge.link" name="arrow" :size="13" />
          </component>
          <h1 class="mh-title">
            <span
              v-for="(line, i) in d.hero.title"
              :key="i"
              :class="{ 'mh-title__accent': i === d.hero.title.length - 1 }"
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
          <p v-if="d.hero.note" class="mh-hero__note">{{ d.hero.note }}</p>
        </div>

        <div v-if="d.hero.shot" class="mh-hero__visual">
          <div class="mh-window mh-window--main">
            <div class="mh-window__bar">
              <i /><i /><i /><span class="mh-window__url">{{ d.hero.shot.label }}</span>
            </div>
            <img :src="withBase(d.hero.shot.src)" :alt="d.hero.shot.alt" fetchpriority="high" />
          </div>
          <div v-if="d.hero.shot2" class="mh-window mh-window--float">
            <div class="mh-window__bar">
              <i /><i /><i /><span class="mh-window__url">{{ d.hero.shot2.label }}</span>
            </div>
            <img :src="withBase(d.hero.shot2.src)" :alt="d.hero.shot2.alt" />
          </div>
        </div>
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
        <header class="mh-head">
          <p class="mh-eyebrow">{{ d.paths.eyebrow }}</p>
          <h2>{{ d.paths.title }}</h2>
          <p class="mh-sub">{{ d.paths.lead }}</p>
        </header>
        <div class="mh-paths">
          <article v-for="p in d.paths.items" :key="p.title" class="mh-path">
            <div class="mh-path__top">
              <span class="mh-chip"><MsIcon :name="p.icon" :size="20" /></span>
              <div>
                <h3>{{ p.title }}</h3>
                <p>{{ p.text }}</p>
              </div>
            </div>
            <ol>
              <li v-for="(l, i) in p.links" :key="l.link">
                <a :href="href(l.link)">
                  <span class="mh-path__n">{{ i + 1 }}</span>
                  <span class="mh-path__t">{{ l.text }}</span>
                  <MsIcon name="arrow" :size="14" />
                </a>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </section>

    <section v-if="d.showcase" class="mh-section mh-section--alt">
      <div class="mh-wrap">
        <header class="mh-head">
          <p class="mh-eyebrow">{{ d.showcase.eyebrow }}</p>
          <h2>{{ d.showcase.title }}</h2>
          <p class="mh-sub">{{ d.showcase.lead }}</p>
        </header>
        <div class="mh-show">
          <div class="mh-show__tabs" role="tablist">
            <button
              v-for="(s, i) in d.showcase.items"
              :key="s.title"
              type="button"
              role="tab"
              :aria-selected="i === active"
              :class="{ active: i === active }"
              @click="active = i"
            >
              <strong>{{ s.title }}</strong>
              <span>{{ s.text }}</span>
            </button>
          </div>
          <div class="mh-show__stage">
            <div class="mh-window">
              <div class="mh-window__bar">
                <i /><i /><i /><span class="mh-window__url">{{ shown.label }}</span>
              </div>
              <div class="mh-show__img">
                <img
                  v-for="(s, i) in d.showcase.items"
                  v-show="i === active"
                  :key="s.src"
                  :class="{ contain: s.fit === 'contain' }"
                  :src="withBase(s.src)"
                  :alt="s.alt"
                  loading="lazy"
                />
              </div>
            </div>
            <p class="mh-show__caption">
              <span>{{ shown.text }}</span>
              <a v-if="shown.link" :href="href(shown.link)">
                {{ d.showcase.more }}<MsIcon name="arrow" :size="14" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="d.features" class="mh-section">
      <div class="mh-wrap">
        <header class="mh-head">
          <p class="mh-eyebrow">{{ d.features.eyebrow }}</p>
          <h2>{{ d.features.title }}</h2>
          <p class="mh-sub">{{ d.features.lead }}</p>
        </header>
        <div class="mh-features">
          <a v-for="f in d.features.items" :key="f.title" class="mh-feature" :href="href(f.link)">
            <span class="mh-chip"><MsIcon :name="f.icon" :size="20" /></span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
            <span class="mh-more">{{ d.features.more }}<MsIcon name="arrow" :size="14" /></span>
          </a>
        </div>
      </div>
    </section>

    <section v-if="d.start" class="mh-section mh-section--alt">
      <div class="mh-wrap mh-start">
        <div class="mh-start__text">
          <p class="mh-eyebrow">{{ d.start.eyebrow }}</p>
          <h2>{{ d.start.title }}</h2>
          <p class="mh-sub">{{ d.start.lead }}</p>
          <ol class="mh-steps">
            <li v-for="s in d.start.steps" :key="s.title">
              <strong>{{ s.title }}</strong>
              <span>{{ s.text }}</span>
            </li>
          </ol>
          <a v-if="d.start.action" class="mh-btn mh-btn--brand" :href="href(d.start.action.link)">
            {{ d.start.action.text }}<MsIcon name="arrow" :size="16" />
          </a>
        </div>
        <div class="mh-term">
          <div class="mh-term__bar">
            <i /><i /><i /><span>bash</span>
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
      </div>
    </section>

    <section v-if="d.products" class="mh-section">
      <div class="mh-wrap">
        <header class="mh-head">
          <p class="mh-eyebrow">{{ d.products.eyebrow }}</p>
          <h2>{{ d.products.title }}</h2>
          <p class="mh-sub">{{ d.products.lead }}</p>
        </header>
        <div class="mh-products">
          <article v-for="p in d.products.items" :key="p.name" class="mh-product">
            <div class="mh-product__top">
              <span class="mh-chip mh-chip--dark"><MsIcon :name="p.icon" :size="20" /></span>
              <div>
                <h3>{{ p.name }}</h3>
                <p class="mh-product__role">{{ p.role }}</p>
              </div>
            </div>
            <p class="mh-product__text">{{ p.text }}</p>
            <ul v-if="p.tags" class="mh-tags">
              <li v-for="t in p.tags" :key="t">{{ t }}</li>
            </ul>
            <div class="mh-product__links">
              <a :href="href(p.link)">{{ d.products.docs }}<MsIcon name="arrow" :size="14" /></a>
              <a v-if="p.repo" class="mh-product__repo" :href="p.repo" target="_blank" rel="noopener">
                GitHub<MsIcon name="external" :size="14" />
              </a>
              <span v-else-if="p.note" class="mh-product__note">{{ p.note }}</span>
            </div>
          </article>
        </div>
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
