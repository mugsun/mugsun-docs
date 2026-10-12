import { defineConfig } from 'vitepress'

/** Project Pages default; override with DOCS_BASE=/ for apex custom domains (e.g. docs.mugsun.com). */
const base = process.env.DOCS_BASE ?? '/mugsun-docs/'

export const shared = defineConfig({
  title: 'mugsun',
  base,
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: 'any' }],
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` }],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:image',
        content: `${base}brand/banners/github-og-1200x630.png`,
      },
    ],
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
