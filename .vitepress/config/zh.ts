import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zh: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: '可私有化的中后台底座：多租户与国密、嵌入式埋点全链路，GIS / AI 按需启用。',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'Boot', link: '/boot/', activeMatch: '/boot/' },
      { text: '管理台', link: '/pc/', activeMatch: '/pc/' },
      { text: '埋点', link: '/track/', activeMatch: '/track/' },
      { text: 'Core', link: '/core/', activeMatch: '/core/' },
      { text: 'ms-ui', link: '/uniappx/', activeMatch: '/uniappx/' },
      { text: '演示', link: '/demo' },
      { text: '更新日志', link: '/changelog' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '架构全景', link: '/guide/architecture' },
            { text: '常见问题', link: '/guide/faq' },
          ],
        },
      ],
      '/boot/': [
        {
          text: 'Boot',
          items: [
            { text: '概述', link: '/boot/' },
            { text: '配置', link: '/boot/configuration' },
            { text: '安全清单', link: '/boot/security-checklist' },
          ],
        },
      ],
      '/pc/': [
        {
          text: '管理台',
          items: [
            { text: '概述', link: '/pc/' },
            { text: '本地开发', link: '/pc/development' },
          ],
        },
      ],
      '/track/': [
        {
          text: '埋点',
          items: [
            { text: '概述', link: '/track/' },
            { text: '安装', link: '/track/install' },
            { text: '第一个事件', link: '/track/first-event' },
            { text: '隐私与合规', link: '/track/privacy' },
          ],
        },
      ],
      '/core/': [
        {
          text: 'Core',
          items: [{ text: '概述', link: '/core/' }],
        },
      ],
      '/uniappx/': [
        {
          text: 'ms-ui',
          items: [
            { text: '概述', link: '/uniappx/' },
            { text: 'Button 按钮', link: '/uniappx/components/button' },
          ],
        },
      ],
    },
    outline: { label: '本页目录' },
    lastUpdated: { text: '最后更新' },
    docFooter: { prev: '上一页', next: '下一页' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',
    footer: {
      message: '免费开源：boot · core · pc · track。ms-ui 文档预览陆续开放。',
      copyright: 'Copyright © 2026 mugsun',
    },
  },
}
