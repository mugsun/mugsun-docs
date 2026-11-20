---
pageClass: ms-first-col-nowrap
---

# 品牌规范

本页列出 mugsun 标志的各个版本，说明每个版本用在哪里，以及管理后台怎样按主题色切换标志。

源文件在文档站仓库的 `public/brand/` 下，点下表里的文件名就能打开或下载。

## 标志文件 {#logo-files}

| 文件 | 预览 | 用在哪里 |
| --- | --- | --- |
| [`mugsun-icon-dark.svg`](/brand/svg/mugsun-icon-dark.svg) | ![原版黑金标志](/brand/svg/mugsun-icon-dark.svg){width=56} | 原版黑金标志，管理后台的侧边栏和顶栏用的是它 |
| [`mugsun-icon-simple-small.svg`](/brand/svg/mugsun-icon-simple-small.svg) | ![小尺寸图标](/brand/svg/mugsun-icon-simple-small.svg){width=56} | 笔画加粗的简化版，本站的浏览器标签图标用的是它 |
| [`mugsun-lockup-light.svg`](/brand/svg/mugsun-lockup-light.svg) | ![浅底横版标志](/brand/svg/mugsun-lockup-light.svg){width=168} | 图标加字标的横版，白底，放在浅色背景上 |
| [`mugsun-lockup-dark.svg`](/brand/svg/mugsun-lockup-dark.svg) | ![深底横版标志](/brand/svg/mugsun-lockup-dark.svg){width=168} | 同样是横版，黑底，放在深色背景上 |
| [`mugsun-ms-mark-black.svg`](/brand/svg/mugsun-ms-mark-black.svg) | ![黑色 MS 字形](/brand/svg/mugsun-ms-mark-black.svg){width=76 style="background:#fff;padding:10px 12px;border-radius:6px"} | 只有 MS 两个字母，黑色，放在浅色背景上 |
| [`mugsun-ms-mark-white.svg`](/brand/svg/mugsun-ms-mark-white.svg) | ![白色 MS 字形](/brand/svg/mugsun-ms-mark-white.svg){width=76 style="background:#1b1b1f;padding:10px 12px;border-radius:6px"} | 只有 MS 两个字母，白色，放在深色背景上 |
| [`mugsun-wordmark-black.svg`](/brand/svg/mugsun-wordmark-black.svg) | ![黑色字标](/brand/svg/mugsun-wordmark-black.svg){width=150 style="background:#fff;padding:10px 12px;border-radius:6px"} | 只有 MUGSUN 字标，黑色，放在浅色背景上 |

## 主题色变体 {#theme-variants}

管理后台提供 7 种主题色，每种都有一套浅底版和一套深底版标志。各版本的字形和光弧形状与原版一致，只改变颜色。

亮色模式使用浅底版，暗色模式使用深底版。这 7 种以外的主题色，包括以后新增的自定义颜色，一律使用原版黑金标志。

::: tip 只有授权页会换标志
管理后台目前只有登录、注册、忘记密码三个授权页按主题色切换标志，详见[管理后台的授权页](#pc-auth-pages)。
:::

| 主题色 | 浅底版（亮色模式） | 深底版（暗色模式） |
| --- | --- | --- |
| 默认蓝 `#5D87FF` | ![浅底版 #5D87FF](/brand/themes/mugsun-icon-5d87ff-onlight.png){width=64} | ![深底版 #5D87FF](/brand/themes/mugsun-icon-5d87ff-ondark.png){width=64} |
| 紫 `#B48DF3` | ![浅底版 #B48DF3](/brand/themes/mugsun-icon-b48df3-onlight.png){width=64} | ![深底版 #B48DF3](/brand/themes/mugsun-icon-b48df3-ondark.png){width=64} |
| 亮蓝 `#1D84FF` | ![浅底版 #1D84FF](/brand/themes/mugsun-icon-1d84ff-onlight.png){width=64} | ![深底版 #1D84FF](/brand/themes/mugsun-icon-1d84ff-ondark.png){width=64} |
| 绿 `#60C041` | ![浅底版 #60C041](/brand/themes/mugsun-icon-60c041-onlight.png){width=64} | ![深底版 #60C041](/brand/themes/mugsun-icon-60c041-ondark.png){width=64} |
| 天蓝 `#38C0FC` | ![浅底版 #38C0FC](/brand/themes/mugsun-icon-38c0fc-onlight.png){width=64} | ![深底版 #38C0FC](/brand/themes/mugsun-icon-38c0fc-ondark.png){width=64} |
| 橙 `#F9901F` | ![浅底版 #F9901F](/brand/themes/mugsun-icon-f9901f-onlight.png){width=64} | ![深底版 #F9901F](/brand/themes/mugsun-icon-f9901f-ondark.png){width=64} |
| 粉 `#FF80C8` | ![浅底版 #FF80C8](/brand/themes/mugsun-icon-ff80c8-onlight.png){width=64} | ![深底版 #FF80C8](/brand/themes/mugsun-icon-ff80c8-ondark.png){width=64} |

变体图片在 `public/brand/themes/` 下，尺寸是 256×256。

文件名是 `mugsun-icon-<色值>-onlight.png` 和 `mugsun-icon-<色值>-ondark.png`，色值用小写的十六进制。

## 管理后台的授权页 {#pc-auth-pages}

管理后台的登录、注册、忘记密码三页按上面的规则显示标志：

- 亮色模式用当前主题色的浅底版，暗色模式用深底版。
- 在页面右上角切换主题色或亮暗时，标志立即跟着换，不用刷新。窄屏不显示取色器，只能切换亮暗。
- 主题色不在 7 种预设内时，亮暗都用原版黑金标志。
- 橙色 `#F9901F` 和粉色 `#FF80C8` 的浅底版加 1px 浅灰描边，避免和浅色背景糊在一起。
- 字标「MUGSUN」用 Saira 600 实时渲染，亮色为 `#1F2329`，暗色为白色。
- 桌面端图标高 32px，和字标相距 10px。宽度不超过 640px 时图标高 28px，小于 360px 时只显示图标。

侧边栏、顶栏、锁屏和浏览器标签图标仍用原版标志，不随主题变化。

## 其他素材 {#other-assets}

下表的位置都相对 `public/brand/` 目录。

| 素材 | 位置 | 说明 |
| --- | --- | --- |
| 仓库横幅 | `banners/repos/` | 每个仓库中英文各一张，1280×320，另有两倍尺寸的 `@2x` 版本 |
| 分享卡片图 | `banners/github-og-1200x630.png` | 1200×630，文档站的链接被分享时显示这张图 |
| 网站图标 | `web/` | `favicon.ico`、`favicon.svg` 和 180×180 的 `apple-touch-icon.png` |
| 字体许可 | `LICENSE-Saira-OFL.txt` | 字标用的 Saira 字体按 SIL Open Font License 1.1 授权 |
