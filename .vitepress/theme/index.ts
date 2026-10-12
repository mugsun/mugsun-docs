import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import DemoPhone from './components/DemoPhone.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(DemoPhone),
    })
  },
  enhanceApp({ app }) {
    app.component('DemoPhone', DemoPhone)
  },
} satisfies Theme
