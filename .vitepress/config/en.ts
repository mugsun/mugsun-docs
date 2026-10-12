import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const en: LocaleSpecificConfig<DefaultTheme.Config> = {
  description:
    'Self-hosted admin stack with multi-tenant & SM crypto, plus an embedded analytics path (SDK → API → dashboard). GIS and AI are optional.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/en/guide/introduction', activeMatch: '/en/guide/' },
      { text: 'Boot', link: '/en/boot/', activeMatch: '/en/boot/' },
      { text: 'Admin', link: '/en/pc/', activeMatch: '/en/pc/' },
      { text: 'Track', link: '/en/track/', activeMatch: '/en/track/' },
      { text: 'Demo', link: '/en/demo' },
      { text: 'Changelog', link: '/en/changelog' },
    ],
    sidebar: {
      '/en/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/en/guide/introduction' },
            { text: 'Getting Started', link: '/en/guide/getting-started' },
            { text: 'Architecture', link: '/en/guide/architecture' },
            { text: 'FAQ', link: '/en/guide/faq' },
          ],
        },
      ],
      '/en/boot/': [
        {
          text: 'Boot',
          items: [
            { text: 'Overview', link: '/en/boot/' },
            { text: 'Configuration', link: '/en/boot/configuration' },
            { text: 'Security Checklist', link: '/en/boot/security-checklist' },
          ],
        },
      ],
      '/en/pc/': [
        {
          text: 'Admin',
          items: [
            { text: 'Overview', link: '/en/pc/' },
            { text: 'Development', link: '/en/pc/development' },
          ],
        },
      ],
      '/en/track/': [
        {
          text: 'Track',
          items: [
            { text: 'Overview', link: '/en/track/' },
            { text: 'Install', link: '/en/track/install' },
            { text: 'First Event', link: '/en/track/first-event' },
            { text: 'Privacy', link: '/en/track/privacy' },
          ],
        },
      ],
      '/en/core/': [
        {
          text: 'Core',
          items: [{ text: 'Overview', link: '/en/core/' }],
        },
      ],
    },
    footer: {
      message: 'Open source: boot · core · pc · track. cloud / uniappx-ui are planned.',
      copyright: 'Copyright © 2026 mugsun',
    },
  },
}
