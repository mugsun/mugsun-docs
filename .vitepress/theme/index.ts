import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineComponent, h } from 'vue'
import ArchDiagram from './components/ArchDiagram.vue'
import DemoPhone from './components/DemoPhone.vue'
import HomeLanding from './components/HomeLanding.vue'
import MsIcon from './components/MsIcon.vue'
import { useTaskChecks } from './task-checks'
import './custom.css'
import './doc.css'
import './home.css'

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: 'MsLayout',
    setup() {
      useTaskChecks()
      return () =>
        h(DefaultTheme.Layout, null, {
          'layout-bottom': () => h(DemoPhone),
        })
    },
  }),
  enhanceApp({ app, router }) {
    app.component('ArchDiagram', ArchDiagram)
    app.component('DemoPhone', DemoPhone)
    app.component('HomeLanding', HomeLanding)
    app.component('MsIcon', MsIcon)
    // D1: legacy /ms-ui/* (and /en/ms-ui/*) → /uniappx/* (GitHub Pages has no server 301s)
    const legacy = (p: string) => p.replace(/^(\/(?:en\/)?)ms-ui(\/|\.html|$)/, (_m, pre, rest) => `${pre}uniappx${rest === '.html' ? '/' : rest || '/'}`)
    if (typeof window !== 'undefined') {
      const { pathname, search, hash } = window.location
      const next = legacy(pathname)
      if (next !== pathname) window.location.replace(next + search + hash)
    }
    router.onBeforeRouteChange = (to) => {
      const [path, rest = ''] = to.split(/(?=[?#])/)
      const next = legacy(path)
      if (next !== path) {
        router.go(next + rest)
        return false
      }
    }
  },
} satisfies Theme
