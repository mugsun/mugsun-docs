import { defineConfig } from 'vitepress'

/** Site root default for docs.mugsun.com; use DOCS_BASE=/mugsun-docs/ only for github.io project path. */
const base = process.env.DOCS_BASE ?? '/'

export const shared = defineConfig({
  // Browser tab / SEO title. Nav bar text is hidden via siteTitle: false
  // because logo.svg already includes the MUGSUN wordmark.
  title: 'mugsun',
  titleTemplate: ':title · mugsun',
  base,
  cleanUrls: true,
  // Repo-level Keep a Changelog; site page is changelog.md (case collision on Linux)
  srcExclude: ['**/CHANGELOG.md', 'README.md', 'CONTRIBUTING.md', 'docs/**'],
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
    ['meta', { property: 'og:site_name', content: 'mugsun' }],
    // Social cards require an absolute image URL
    ['meta', { property: 'og:image', content: 'https://docs.mugsun.com/brand/banners/github-og-1200x630.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'theme-color', content: '#111111' }],
  ],
  themeConfig: {
    // Logo already ships MS mark + MUGSUN wordmark; hide duplicate <span>mugsun</span>
    siteTitle: false,
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
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询',
                backButtonTitle: '关闭搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
  },
})
