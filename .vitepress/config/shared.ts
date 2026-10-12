import { defineConfig } from 'vitepress'

/** Site root default for docs.mugsun.com; use DOCS_BASE=/mugsun-docs/ only for github.io project path. */
const base = process.env.DOCS_BASE ?? '/'

export const shared = defineConfig({
  title: 'mugsun',
  base,
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,
  ignoreDeadLinks: [
    // Local run URLs shown as docs examples (not published routes)
    /^https?:\/\/localhost/,
    // README is not a VitePress page; relative LICENSE link is fine in GitHub
    './LICENSE',
  ],
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
