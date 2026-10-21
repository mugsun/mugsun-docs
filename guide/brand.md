# 品牌规范

本页记录 mugsun 的标志用法。标志源文件在 `public/brand/svg/` 下。

## 主题色变体 {#theme-variants}

管理台提供 7 种主题色，每种主题色都有一套浅底版和一套深底版标志。各版本的字形和光弧形状与原版一致，只改变颜色。

亮色模式使用浅底版，暗色模式使用深底版。这 7 种以外的主题色，包括以后新增的自定义颜色，一律使用原版黑金标志。

::: tip
管理台目前只有登录、注册、忘记密码三个授权页按主题色切换标志，侧边栏、顶栏、锁屏和浏览器标签图标仍显示原版黑金标志，见[管理台授权页](#pc-auth-pages)。
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

原版黑金标志：

![原版黑金标志](/brand/svg/mugsun-icon-dark.svg){width=64}

变体图片在 `public/brand/themes/` 下，尺寸为 256×256。

文件名为 `mugsun-icon-<主题色>-onlight.png` 和 `mugsun-icon-<主题色>-ondark.png`。

## 管理台授权页 {#pc-auth-pages}

mugsun-pc 的登录、注册、忘记密码三页按上面的规则显示标志：

- 亮色模式用当前主题色的浅底版，暗色模式用深底版。
- 在页面右上角切换主题色或亮暗时，标志立即跟着换，不用刷新。窄屏不显示取色器，只能切换亮暗。
- 主题色不在 7 种预设内时，亮暗都用原版黑金标志。
- 橙色 `#F9901F` 和粉色 `#FF80C8` 的浅底版加 1px 浅灰描边，避免和浅色背景糊在一起。
- 字标「MUGSUN」用 Saira 600 实时渲染，亮色为 `#1F2329`，暗色为白色。
- 桌面端图标高 32px，与字标间距 10px；宽度 ≤640px 时图标高 28px；<360px 时只显示图标。

侧边栏、顶栏、锁屏和浏览器标签图标（favicon）仍用原版标志，不随主题变化。
