<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import landUrl from '../home/land-mask.webp'

// All copy comes from the `landing` block in the page frontmatter (index.md and en/index.md).
// This component only renders it; what moves is in ../home/hero.js, sections.js and features.js,
// loaded once the page is in the browser.
const { frontmatter, isDark, theme } = useData()
const d = computed<any>(() => frontmatter.value.landing ?? {})
const g = computed<any>(() => d.value.hero?.globe ?? {})
const root = ref<HTMLElement | null>(null)

const MODES = ['track', 'gis', 'ai'] as const

const external = (link?: string) => !!link && /^(https?:)?\/\//.test(link)
const href = (link?: string) => (!link ? undefined : external(link) ? link : withBase(link))
const target = (link?: string) => (external(link) ? '_blank' : undefined)
const rel = (link?: string) => (external(link) ? 'noopener' : undefined)
const pad = (n: number) => String(n).padStart(2, '0')
const latin = (s: string) => /^[\x20-\x7e]+$/.test(s)
const lines = (v: string | string[]) => (Array.isArray(v) ? v : [v])

// "自带{track}、{gis} 和 {ai} 的" -> plain text and the three words that switch the globe
const parts = (line: string) =>
  line
    .split(/(\{\w+\})/)
    .filter(Boolean)
    .map((s) => (/^\{\w+\}$/.test(s) ? { key: s.slice(1, -1) } : { text: s }))

// The lines of the headline are blocks with nothing between them. Latin lines need a space
// there, or the headline reads as "Open-sourceadmin platform" to anything that takes the text.
const gap = (line: string, i: number) => {
  const text = line.replace(/\{(\w+)\}/g, (_, k) => d.value.hero.words?.[k] ?? '')
  return i < d.value.hero.title.length - 1 && /[\x21-\x7e]$/.test(text) ? ' ' : ''
}

// "119 个组件" -> the number that counts up, and the rest
const facts = computed(() =>
  ((d.value.facts ?? []) as { value: string; unit?: string; label: string }[]).map((f) => {
    const m = /^(\d+)\s*(.*)$/.exec(f.value)
    return m ? { num: m[1], unit: m[2], label: f.label } : { word: f.value, unit: f.unit ?? '', label: f.label }
  }),
)

const shots = computed<any[]>(() => d.value.showcase?.items ?? [])

// What the small diagrams in the "built in" section show. The identifiers are the ones the docs
// use: permission codes from boot/permissions, the platform tenant and the sample tenant from
// boot/tenant, and the files listed in boot/codegen/output.
const PERM_CODES = ['sys:user:list', 'sys:user:add', 'sys:user:export']
const TENANT_ROWS = [
  ['000000', 'admin'],
  ['226994', 'zhangsan'],
  ['000000', 'lisi'],
  ['226994', 'wangwu'],
]
const GEN_FILES = [
  'ProductComment.java',
  'ProductCommentMapper.java',
  'ProductCommentController.java',
  'index.vue',
  'index.ts · type.ts',
  'product_comment_menu.sql',
]

type Mounted = { setTheme(dark: boolean): void; destroy(): void }
let mounted: Mounted[] = []
let gone = false

onMounted(async () => {
  const el = root.value
  if (!el) return
  try {
    const [{ mountHero }, { mountSections }, { mountFeatures }] = await Promise.all([
      import('../home/hero.js'),
      import('../home/sections.js'),
      import('../home/features.js'),
    ])
    if (gone) return
    const data = d.value
    const globe = g.value
    const hero = mountHero(el, {
      landUrl,
      dark: isDark.value,
      text: {
        vertex: globe.gis.vertex,
        shape: globe.gis.shape,
        area: globe.gis.area,
        idle: globe.ai.idle,
        running: globe.ai.running,
        step: globe.ai.step,
        done: globe.ai.done,
        thinking: globe.ai.thinking,
      },
    })
    const sections = mountSections(el, {
      dark: isDark.value,
      ui: data.ui,
      shots: shots.value.map((s) => ({
        path: s.label,
        light: withBase(s.src),
        dark: s.dark ? withBase(s.dark) : undefined,
        alt: s.alt,
        contain: s.fit === 'contain',
        link: href(s.link),
      })),
      mods: {
        names: Object.fromEntries(data.modules.items.map((m: any) => [m.key, m.short])),
        cmd: data.modules.cmd,
        cmdRun: data.modules.cmdRun,
        notes: data.modules.notes,
        comments: data.modules.comments,
      },
      term: [
        ...data.start.lines.flatMap((l: any) => [
          { c: `# ${l.comment}`, step: l.step ?? 0 },
          { cmd: l.cmd, step: l.step ?? 0 },
        ]),
        { c: `# ${data.start.open}`, step: data.start.steps.length - 1 },
      ],
    })
    mounted = [hero, sections, mountFeatures(el)]
    // a handle for screenshots and checks while developing
    if (import.meta.env.DEV) (window as any).__msHome = { hero, sections }
  } catch (err) {
    console.error(err)
    // without the scripts nothing would ever scroll into view
    el.classList.add('is-static')
  }
})

watch(isDark, (dark) => mounted.forEach((m) => m.setTheme(dark)))

onBeforeUnmount(() => {
  gone = true
  mounted.forEach((m) => m.destroy())
  mounted = []
})
</script>

<template>
  <div ref="root" class="ms-home">
    <!-- first screen -->
    <section v-if="d.hero?.globe" id="hero" class="hero" data-mod="track">
      <canvas class="hero-gl" aria-hidden="true"></canvas>

      <div class="hero-in">
        <div class="copy">
          <component
            :is="d.hero.badge.link ? 'a' : 'p'"
            v-if="d.hero.badge"
            class="lic"
            :href="href(d.hero.badge.link)"
            :target="target(d.hero.badge.link)"
            :rel="rel(d.hero.badge.link)"
          >
            <i></i>{{ d.hero.badge.text }}<span v-if="d.hero.badge.link" aria-hidden="true">↗</span>
          </component>
          <h1>
            <template v-for="(line, i) in d.hero.title" :key="i"
              ><span class="ln"
                ><span
                  ><template v-for="(part, k) in parts(line)" :key="k"
                    ><button
                      v-if="part.key"
                      type="button"
                      class="kw"
                      :class="{ lat: latin(d.hero.words[part.key]) }"
                      :data-mod="part.key"
                    >
                      {{ d.hero.words[part.key] }}</button
                    ><template v-else>{{ part.text }}</template></template
                  ></span
                ></span
              >{{ gap(line, i) }}</template
            >
          </h1>
          <p class="lead">{{ d.hero.lead }}</p>
          <div class="cta">
            <a
              v-for="a in d.hero.actions"
              :key="a.text"
              class="btn"
              :class="a.theme === 'brand' ? 'btn-main' : 'btn-alt'"
              :href="href(a.link)"
              :target="target(a.link)"
              :rel="rel(a.link)"
            >
              {{ a.text }}
              <svg
                v-if="a.theme === 'brand'"
                viewBox="0 0 16 16"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <p v-if="d.hero.note" class="note">{{ d.hero.note }}</p>
        </div>

        <div class="stage">
          <div class="globe-anchor" :title="g.hint"></div>

          <div class="hud hud-pos" aria-hidden="true">
            <div class="hud-live">
              <i></i><span class="lat">LIVE</span><em>{{ d.ui.demo }}</em>
            </div>
            <div class="hud-coord lat"><b id="hud-lat">39.9087°N</b><b id="hud-lon">116.3975°E</b></div>
            <div class="hud-sub lat"><span id="hud-src">EVENT</span> · WGS84</div>
          </div>

          <!-- labels that follow points on the globe; placed by hero.js -->
          <div id="pin" class="pin tone-dark" aria-hidden="true">
            <i></i>
            <div><b></b><span class="lat"></span></div>
          </div>
          <div
            v-for="(s, i) in g.ai.steps"
            :key="s.name"
            class="node tone-dark"
            :data-i="i"
            aria-hidden="true"
          >
            <i></i>{{ s.name }}
          </div>

          <div id="console" class="console">
            <div class="con-tabs" role="tablist" :aria-label="g.tabs">
              <button
                v-for="(m, i) in MODES"
                :key="m"
                type="button"
                role="tab"
                class="con-tab"
                :data-mod="m"
                :aria-selected="i === 0"
              >
                <span class="no lat">{{ pad(i + 1) }}</span>{{ g[m].tab }}<i></i>
              </button>
              <span class="con-demo">{{ d.ui.demo }}</span>
            </div>
            <div class="con-body">
              <div class="con-pane" data-mod="track" role="tabpanel">
                <div class="kpis">
                  <div v-for="k in g.track.kpis" :key="k.id">
                    <b :id="`k-${k.id}`" class="lat">{{ k.value }}</b><span>{{ k.label }}</span>
                  </div>
                </div>
                <div class="stream">
                  <div class="pane-h">
                    <span>{{ g.track.stream }}</span><em>{{ g.track.hint }}</em>
                  </div>
                  <ol id="stream"></ol>
                </div>
              </div>

              <div class="con-pane" data-mod="gis" role="tabpanel">
                <div class="layers">
                  <div class="pane-h">
                    <span>{{ g.gis.layers }}</span>
                  </div>
                  <label v-for="(l, i) in g.gis.items" :key="l.name">
                    <button type="button" class="sw" :data-layer="i" aria-pressed="true"></button>
                    <span>{{ l.name }}</span><em>{{ l.note }}</em>
                  </label>
                </div>
                <dl class="facts-dl">
                  <div>
                    <dt>{{ g.gis.draw }}</dt>
                    <dd>
                      {{ g.gis.drawText }}<button id="redraw" type="button" class="mini">{{ g.gis.again }}</button>
                    </dd>
                  </div>
                  <div>
                    <dt>{{ g.gis.areaLabel }}</dt>
                    <dd id="gis-area" class="lat">—</dd>
                  </div>
                  <div>
                    <dt>{{ g.gis.view }}</dt>
                    <dd>{{ g.gis.viewText }}</dd>
                  </div>
                  <div>
                    <dt>{{ g.gis.store }}</dt>
                    <dd class="lat">{{ g.gis.storeText }}</dd>
                  </div>
                </dl>
              </div>

              <div class="con-pane" data-mod="ai" role="tabpanel">
                <div class="chain-wrap">
                  <div class="pane-h">
                    <span>{{ g.ai.app }}</span><em id="chain-state">{{ g.ai.idle }}</em>
                  </div>
                  <ol id="chain" class="chain">
                    <li v-for="(s, i) in g.ai.steps" :key="s.name" :data-i="i" :data-name="s.name">
                      <small class="lat">{{ s.kind }}</small>{{ s.name }}
                    </li>
                  </ol>
                </div>
                <div class="ask">
                  <div class="pane-h">
                    <span>{{ g.ai.ask }}</span><em>{{ g.ai.askHint }}</em>
                  </div>
                  <div class="chips">
                    <button
                      v-for="q in g.ai.questions"
                      :key="q.intent"
                      type="button"
                      class="chip"
                      :data-intent="q.intent"
                      :data-a="q.a"
                    >
                      {{ q.q }}
                    </button>
                  </div>
                  <p id="answer" class="answer" aria-live="polite">
                    <span class="dim">{{ g.ai.askIntro }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- four facts -->
    <section v-if="facts.length" class="facts" :aria-label="d.ui.facts">
      <div class="sec-in">
        <ul id="facts" class="facts-row">
          <li v-for="f in facts" :key="f.label">
            <p class="fact-v">
              <b v-if="f.num" class="lat" :data-to="f.num">{{ f.num }}</b>
              <b v-else class="lat mit"
                ><i v-for="(ch, i) in f.word" :key="i">{{ ch }}</i></b
              >
              <span>{{ f.unit }}</span>
            </p>
            <p class="fact-l">{{ f.label }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- the product, in a window -->
    <section v-if="d.showcase" id="window" class="sec win">
      <div class="sec-in win-grid">
        <div class="win-side">
          <h2 data-rv>{{ d.showcase.title }}</h2>
          <p class="sec-lead" data-rv>{{ d.showcase.lead }}</p>
          <ol id="win-list" class="win-list" role="tablist" :aria-label="d.showcase.list" data-rv>
            <li v-for="(s, i) in shots" :key="s.title" role="presentation">
              <button
                type="button"
                role="tab"
                class="win-tab"
                :aria-selected="i === 0"
                :tabindex="i === 0 ? 0 : -1"
              >
                <span class="no lat">{{ pad(i + 1) }}</span>
                <b>{{ s.title }}</b>
                <span class="tx"
                  ><span>{{ s.text }}</span></span
                >
                <i class="bar"></i>
              </button>
            </li>
          </ol>
        </div>

        <div class="win-main">
          <div id="win-frame" class="win-frame">
            <div class="win-bar">
              <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span id="win-path" class="win-path">{{ shots[0]?.label }}</span>
              <span class="win-tools">
                <span id="win-theme" class="seg" role="group" :aria-label="d.showcase.theme.label">
                  <button type="button" data-theme="dark" aria-pressed="false">{{ d.showcase.theme.dark }}</button>
                  <button type="button" data-theme="light" aria-pressed="false">{{ d.showcase.theme.light }}</button>
                </span>
                <a id="win-doc" class="win-doc" :href="href(shots[0]?.link)">
                  {{ d.showcase.more }}<span aria-hidden="true">→</span>
                </a>
              </span>
            </div>
            <div id="win-view" class="win-view">
              <img alt="" width="2880" height="1800" decoding="async" />
              <img alt="" width="2880" height="1800" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- the three optional modules -->
    <section v-if="d.modules" id="modules" class="sec mods">
      <div class="sec-in mods-grid">
        <div class="mods-side">
          <h2 data-rv>
            <template v-for="(line, i) in lines(d.modules.title)" :key="i"><br v-if="i" />{{ line }}</template>
          </h2>
          <p class="sec-lead" data-rv>{{ d.modules.lead }}</p>
          <ul id="mod-list" class="mod-list" data-rv>
            <li>
              <div class="mod is-fixed">
                <span class="sw" aria-hidden="true"></span>
                <span class="mod-t"
                  ><b>{{ d.modules.core.name }}</b
                  ><code>{{ d.modules.core.code }}</code></span
                >
                <span class="mod-d">{{ d.modules.core.text }}</span>
                <em>{{ d.modules.fixed }}</em>
              </div>
            </li>
            <li v-for="m in d.modules.items" :key="m.key">
              <button type="button" class="mod" :data-mod="m.key" aria-pressed="true">
                <span class="sw" aria-hidden="true"></span>
                <span class="mod-t"
                  ><b>{{ m.name }}</b
                  ><code>{{ m.code }}</code></span
                >
                <span class="mod-d">{{ m.text }}</span>
              </button>
            </li>
          </ul>
        </div>

        <div id="mods-out" class="mods-out" data-rv>
          <div class="out-block">
            <div class="out-h">
              <span>{{ d.modules.jar }}</span><em id="jar-note">{{ d.modules.notes.all }}</em>
            </div>
            <div id="jar" class="jar" aria-hidden="true">
              <span class="jar-seg is-core lat">core</span>
              <span v-for="m in d.modules.items" :key="m.key" class="jar-seg lat" :data-mod="m.key">{{ m.key }}</span>
            </div>
          </div>
          <div class="out-block">
            <div class="out-h">
              <span>{{ d.modules.menu }}</span><em>{{ d.modules.menuHint }}</em>
            </div>
            <div id="menu-mock" class="menu-mock" aria-hidden="true">
              <span class="mm-brand lat">MUGSUN</span>
              <span
                v-for="item in d.modules.menuItems"
                :key="item.text"
                class="mm-i"
                :class="{ 'is-cur': item.current }"
                :data-mod="item.mod"
                >{{ item.text }}</span
              >
            </div>
          </div>
          <div class="out-block">
            <div class="out-h">
              <span id="cmd-title">{{ d.modules.cmd }}</span>
              <button type="button" class="mini" data-copy="mod-cmd">{{ d.ui.copy }}</button>
            </div>
            <pre id="mod-cmd" class="cmd tone-dark" aria-live="polite"></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- built in: six features, each with a small working model -->
    <section v-if="d.features" id="features" class="sec feats">
      <div class="sec-in">
        <div class="sec-head">
          <h2 data-rv>
            <template v-for="(line, i) in lines(d.features.title)" :key="i"><br v-if="i" />{{ line }}</template>
          </h2>
          <p class="sec-lead" data-rv>{{ d.features.lead }}</p>
        </div>
        <ul id="feats" class="feat-grid" data-rv>
          <li v-for="f in d.features.items" :key="f.title">
            <a class="feat" :href="href(f.link)">
              <div class="fx" :class="`fx-${f.kind}`" data-v="0" aria-hidden="true">
                <!-- a role decides which buttons work and which rows come back -->
                <template v-if="f.kind === 'perm'">
                  <div class="fx-seg">
                    <span v-for="r in f.demo.roles" :key="r">{{ r }}</span>
                  </div>
                  <ul class="fx-codes">
                    <li v-for="(c, i) in PERM_CODES" :key="c" :class="{ opt: i > 0 }">
                      <code>{{ c }}</code><i></i>
                    </li>
                  </ul>
                  <p class="fx-kv">
                    <span>{{ f.demo.scope }}</span>
                    <b
                      ><em v-for="s in f.demo.scopes" :key="s">{{ s }}</em></b
                    >
                  </p>
                </template>

                <!-- the tenant condition is added to the query, and only that tenant's rows are left -->
                <template v-else-if="f.kind === 'tenant'">
                  <p class="fx-sql">SELECT * FROM sys_user</p>
                  <p class="fx-sql fx-auto">
                    <span>WHERE tenant_id = '<b><em>000000</em><em>226994</em></b>'</span>
                    <small>{{ f.demo.auto }}</small>
                  </p>
                  <ul class="fx-rows">
                    <li v-for="r in TENANT_ROWS" :key="r[1]" :class="r[0] === '000000' ? 't0' : 't1'">
                      <span>{{ r[0] }}</span><span>{{ r[1] }}</span>
                    </li>
                  </ul>
                </template>

                <!-- a request runs through an AI review, a condition and two parallel approvals -->
                <template v-else-if="f.kind === 'flow'">
                  <svg viewBox="0 0 340 132" focusable="false">
                    <path
                      class="trk"
                      d="M48 66H70M138 66H155M177 66H190M190 34V98M190 34H202M190 98H202M254 34H266M254 98H266M266 34V98M266 66H290"
                    />
                    <path class="run" pathLength="100" d="M25 66H190V34H266V66H314" />
                    <path class="run" pathLength="100" d="M25 66H190V98H266V66H314" />
                    <rect class="nd" style="--at: 0" x="2" y="53" width="46" height="26" rx="13" />
                    <rect class="nd" style="--at: 0.21" x="70" y="53" width="68" height="26" rx="6" />
                    <path class="nd" style="--at: 0.37" d="M166 55l11 11-11 11-11-11z" />
                    <rect class="nd" style="--at: 0.62" x="202" y="21" width="52" height="26" rx="6" />
                    <rect class="nd" style="--at: 0.62" x="202" y="85" width="52" height="26" rx="6" />
                    <rect class="nd" style="--at: 0.93" x="290" y="53" width="48" height="26" rx="13" />
                    <text x="25" y="70">{{ f.demo.nodes[0] }}</text>
                    <text x="104" y="70">{{ f.demo.nodes[1] }}</text>
                    <text class="sm" x="166" y="46">{{ f.demo.nodes[2] }}</text>
                    <text x="228" y="38">{{ f.demo.nodes[3] }}</text>
                    <text x="228" y="102">{{ f.demo.nodes[3] }}</text>
                    <text class="sm" x="228" y="70">{{ f.demo.parallel }}</text>
                    <text x="314" y="70">{{ f.demo.nodes[4] }}</text>
                  </svg>
                </template>

                <!-- one table in, the files of a working page out -->
                <template v-else-if="f.kind === 'gen'">
                  <code class="fx-src">product_comment</code>
                  <ul class="fx-files">
                    <li v-for="(name, i) in GEN_FILES" :key="name" :style="{ '--i': i }">{{ name }}</li>
                  </ul>
                </template>

                <!-- three algorithms at work, and the databases it runs on -->
                <template v-else-if="f.kind === 'gm'">
                  <p v-for="r in f.demo.rows" :key="r.algo" class="fx-enc">
                    <b class="lat">{{ r.algo }}</b><span>{{ r.use }}</span><code data-hex="24" data-group="4">7b25 f08d 04a1 9c3e 51d6 e2a0</code>
                  </p>
                  <div class="fx-db">
                    <span v-for="(n, i) in f.demo.db" :key="n" :style="{ '--i': i }">{{ n }}</span>
                  </div>
                </template>

                <!-- a signed request passes once; sent again unchanged, it is refused -->
                <template v-else-if="f.kind === 'open'">
                  <p class="fx-req"><b>GET</b>/open/user/list</p>
                  <p class="fx-hd"><span>X-Timestamp</span><code data-hex="time">1795228800000</code></p>
                  <p class="fx-hd"><span>X-Nonce</span><code data-hex="16">9f2c41d07ab3e85d</code></p>
                  <p class="fx-hd"><span>X-Sign</span><code data-hex="24">e7f20d5c81b4a6390f1d2c7a</code></p>
                  <p class="fx-res r1"><b class="lat">200</b></p>
                  <p class="fx-res r2">
                    <span>{{ f.demo.again }}</span><b class="lat">401</b><span>{{ f.demo.replay }}</span>
                  </p>
                </template>
              </div>
              <h3>{{ f.title }}<span class="arr" aria-hidden="true">→</span></h3>
              <p>{{ f.text }}</p>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- the repositories -->
    <section v-if="d.products" id="repos" class="sec repos">
      <div class="sec-in">
        <div class="sec-head">
          <h2 data-rv>
            <template v-for="(line, i) in lines(d.products.title)" :key="i"><br v-if="i" />{{ line }}</template>
          </h2>
          <p class="sec-lead" data-rv>{{ d.products.lead }}</p>
        </div>
        <ul class="repo-list">
          <li v-for="p in d.products.items" :key="p.name" class="repo" data-rv>
            <div class="repo-id">
              <a class="repo-name lat" :href="href(p.link)">{{ p.name }}</a>
              <span class="repo-role">{{ p.role }}</span>
            </div>
            <p class="repo-text">{{ p.text }}</p>
            <ul class="repo-tags">
              <li v-for="t in p.tags" :key="t">{{ t }}</li>
            </ul>
            <div class="repo-go">
              <span class="repo-doc" aria-hidden="true">{{ d.products.docs }}<i>→</i></span>
              <a v-if="p.repo" class="repo-src" :href="p.repo" target="_blank" rel="noopener"
                >GitHub<i aria-hidden="true">↗</i></a
              >
              <span v-else-if="p.note" class="repo-note">{{ p.note }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- three commands -->
    <section v-if="d.start" id="start" class="sec start">
      <div class="sec-in start-grid">
        <div class="start-side">
          <h2 data-rv>
            <template v-for="(line, i) in lines(d.start.title)" :key="i"><br v-if="i" />{{ line }}</template>
          </h2>
          <p class="sec-lead" data-rv>{{ d.start.lead }}</p>
          <ol id="steps" class="steps" data-rv>
            <li v-for="(s, i) in d.start.steps" :key="s.title">
              <span class="lat">{{ i + 1 }}</span>
              <div>
                <b>{{ s.title }}</b>
                <p>{{ s.text }}</p>
              </div>
            </li>
          </ol>
          <a v-if="d.start.action" class="more" :href="href(d.start.action.link)" data-rv>
            {{ d.start.action.text }}<span aria-hidden="true">→</span>
          </a>
        </div>

        <div id="term" class="term tone-dark" data-rv>
          <div class="term-bar">
            <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="term-title lat">mugsun-boot</span>
            <button id="term-replay" type="button" class="mini">{{ d.ui.replay }}</button>
          </div>
          <div id="term-body" class="term-body"></div>
        </div>
      </div>
    </section>

    <!-- where to start reading -->
    <section v-if="d.paths" id="paths" class="sec paths">
      <div class="sec-in">
        <div class="sec-head">
          <h2 data-rv>
            <template v-for="(line, i) in lines(d.paths.title)" :key="i"><br v-if="i" />{{ line }}</template>
          </h2>
          <p class="sec-lead" data-rv>{{ d.paths.lead }}</p>
        </div>
        <div class="route" data-rv>
          <div class="route-tabs" role="tablist" :aria-label="d.paths.label">
            <button
              v-for="(p, i) in d.paths.items"
              :id="`route-tab-${i}`"
              :key="p.title"
              type="button"
              class="route-tab"
              role="tab"
              :aria-selected="i === 0"
              :aria-controls="`route-${i}`"
              :tabindex="i === 0 ? 0 : -1"
            >
              {{ p.title }}
            </button>
          </div>
          <div
            v-for="(p, i) in d.paths.items"
            :id="`route-${i}`"
            :key="p.title"
            class="route-panel"
            role="tabpanel"
            :aria-labelledby="`route-tab-${i}`"
            :hidden="i !== 0"
          >
            <p class="route-text">{{ p.text }}</p>
            <ol class="route-line">
              <li v-for="(l, k) in p.links" :key="l.link" :style="{ '--i': k }">
                <a class="stop" :href="href(l.link)">
                  <span class="no lat">{{ pad(k + 1) }}</span>
                  <b>{{ l.text }}<i aria-hidden="true">→</i></b>
                  <code>{{ l.link }}</code>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- closing -->
    <section v-if="d.cta" id="cta-band" class="cta-band tone-dark">
      <div class="horizon" aria-hidden="true"><i></i></div>
      <div class="sec-in">
        <h2 data-rv>{{ d.cta.title }}</h2>
        <p data-rv>{{ d.cta.text }}</p>
        <div class="cta" data-rv>
          <a
            v-for="a in d.cta.actions"
            :key="a.text"
            class="btn"
            :class="a.theme === 'brand' ? 'btn-main' : 'btn-alt'"
            :href="href(a.link)"
            :target="target(a.link)"
            :rel="rel(a.link)"
          >
            {{ a.text }}
            <svg
              v-if="a.theme === 'brand'"
              viewBox="0 0 16 16"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              aria-hidden="true"
            >
              <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <footer v-if="d.footer" class="foot tone-dark">
      <div class="sec-in foot-grid">
        <div class="foot-brand">
          <img :src="withBase('/logo-dark.svg')" alt="mugsun" width="164" height="64" />
          <p>{{ d.footer.tagline }}</p>
        </div>
        <nav v-for="col in d.footer.columns" :key="col.title" :aria-label="col.title">
          <h3>{{ col.title }}</h3>
          <a v-for="l in col.links" :key="l.text" :href="href(l.link)" :target="target(l.link)" :rel="rel(l.link)">
            {{ l.text }}<em v-if="l.note">{{ l.note }}</em>
          </a>
        </nav>
      </div>
      <!-- the licence line and the record number come from the site config, the same as on every other page -->
      <div v-if="theme.footer" class="sec-in foot-legal">
        <span v-html="theme.footer.message"></span><span v-html="theme.footer.copyright"></span>
      </div>
      <div class="foot-mark lat" aria-hidden="true">MUGSUN</div>
    </footer>
  </div>
</template>
