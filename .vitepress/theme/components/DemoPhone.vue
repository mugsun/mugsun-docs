<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter, page, lang } = useData()
const isEn = computed(() => (lang.value || '').toLowerCase().startsWith('en'))
const t = computed(() => isEn.value ? {
  openPreview: 'Open the uni-app x (ms-ui) preview', preview: 'Preview', demo: 'uni-app x (ms-ui) component demo',
  toolbar: 'Preview toolbar', landscape: 'Switch to landscape', portrait: 'Switch to portrait', newWindow: 'Open in a new window',
  collapse: 'Collapse', close: 'Close', demoTitle: 'Demo', entry: 'H5 demo', openH5: 'Open H5 demo', sub: 'Full interaction on the demo page',
} : {
  openPreview: '打开 uni-app x（ms-ui）预览', preview: '预览', demo: 'uni-app x（ms-ui）组件演示',
  toolbar: '预览工具栏', landscape: '切换横屏', portrait: '切换竖屏', newWindow: '在新窗口打开',
  collapse: '收起', close: '关闭', demoTitle: '演示', entry: 'H5 演示入口', openH5: '打开 H5 演示', sub: '完整交互请在演示页中查看',
})

type Orientation = 'portrait' | 'landscape'

const collapsed = ref(false)
const closed = ref(false)
const orientation = ref<Orientation>('portrait')
const demoPath = computed(() => {
  const raw = frontmatter.value.demo
  if (typeof raw !== 'string' || !raw.trim()) return ''
  return raw.trim().replace(/^\//, '')
})

const show = computed(() => Boolean(demoPath.value) && !closed.value)

/** HBuilderX web export under public/demo/; hash = uni-app x page path. */
const iframeSrc = computed(() => {
  if (!demoPath.value) return ''
  return `${withBase('/demo/index.html')}#/${demoPath.value}`
})

watch(
  () => page.value.relativePath,
  () => {
    collapsed.value = false
    closed.value = false
    orientation.value = 'portrait'
  },
)

function toggleOrientation() {
  orientation.value = orientation.value === 'portrait' ? 'landscape' : 'portrait'
}

function collapse() {
  collapsed.value = true
}

function expand() {
  collapsed.value = false
  closed.value = false
}

function closePanel() {
  closed.value = true
  collapsed.value = false
}

/** Same-origin /demo/ — hide scrollbars visually, keep overflow scroll. */
const iframeRef = ref<HTMLIFrameElement | null>(null)

const HIDE_SCROLLBAR_CSS = `
html, body, #app,
uni-app, uni-page, uni-page-wrapper, uni-page-body,
.uni-scroll-view, .uni-scroll-view-content {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
*::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent !important;
}
`

function hideIframeScrollbars() {
  const iframe = iframeRef.value
  if (!iframe) return
  try {
    const doc = iframe.contentDocument
    if (!doc?.documentElement) return
    let style = doc.getElementById('ms-demo-hide-scrollbar') as HTMLStyleElement | null
    if (!style) {
      style = doc.createElement('style')
      style.id = 'ms-demo-hide-scrollbar'
      ;(doc.head || doc.documentElement).appendChild(style)
    }
    style.textContent = HIDE_SCROLLBAR_CSS
  } catch {
    // cross-origin or not ready — ignore
  }
}

watch(iframeSrc, () => {
  // hash-only navigations may not re-fire load; re-apply after a tick
  if (typeof window === 'undefined') return
  requestAnimationFrame(() => hideIframeScrollbars())
})
</script>

<template>
  <ClientOnly>
    <!-- FAB when panel collapsed or closed on a demo page -->
    <button
      v-if="demoPath && (collapsed || closed)"
      type="button"
      class="ms-demo-fab"
      :title="t.openPreview"
      :aria-label="t.openPreview"
      @click="expand"
    >
      <span class="ms-demo-fab__icon" aria-hidden="true">▣</span>
      <span class="ms-demo-fab__label">{{ t.preview }}</span>
    </button>

    <aside
      v-if="show && !collapsed"
      class="ms-demo-phone"
      :class="[
        `ms-demo-phone--${orientation}`,
      ]"
      :aria-label="t.demo"
    >
      <div class="ms-demo-phone__toolbar">
        <div class="ms-demo-phone__toolbar-left">
          <span class="ms-demo-phone__brand">uni-app x（ms-ui）</span>
          <span class="ms-demo-phone__hint">H5</span>
        </div>
        <div class="ms-demo-phone__toolbar-right" role="toolbar" :aria-label="t.toolbar">
          <button
            type="button"
            class="ms-demo-phone__tool"
            :title="orientation === 'portrait' ? t.landscape : t.portrait"
            :aria-pressed="(orientation === 'landscape').toString()"
            @click="toggleOrientation"
          >
            {{ orientation === 'portrait' ? '⇄' : '⇅' }}
          </button>
          <a
            class="ms-demo-phone__tool"
            :href="iframeSrc"
            target="_blank"
            rel="noopener noreferrer"
            :title="t.newWindow"
          >↗</a>
          <button
            type="button"
            class="ms-demo-phone__tool"
            :title="t.collapse"
            @click="collapse"
          >
            —
          </button>
          <button
            type="button"
            class="ms-demo-phone__tool ms-demo-phone__tool--danger"
            :title="t.close"
            @click="closePanel"
          >
            ×
          </button>
        </div>
      </div>

      <div class="ms-demo-phone__bezel">
        <div class="ms-demo-phone__notch" aria-hidden="true" />
        <iframe
          ref="iframeRef"
          class="ms-demo-phone__frame"
          :src="iframeSrc"
          :title="`${t.demoTitle} ${demoPath}`"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          @load="hideIframeScrollbars"
        />
      </div>
    </aside>
    <!-- ≤960px: bottom bar linking to the full H5 demo (no iframe) -->
    <nav v-if="demoPath" class="ms-demo-mobile-bar" :aria-label="t.entry">
      <a
        class="ms-demo-mobile-bar__cta"
        :href="iframeSrc"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="t.openH5"
      >{{ t.openH5 }}</a>
      <span class="ms-demo-mobile-bar__sub">{{ t.sub }}</span>
    </nav>
  </ClientOnly>
</template>
