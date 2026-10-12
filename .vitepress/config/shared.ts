import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'mugsun',
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: '/brand/banners/github-og-1200x630.png' }],
  ],
  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
      alt: 'mugsun',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mugsun' },
    ],
    search: {
      provider: 'local',
    },
  },
})
