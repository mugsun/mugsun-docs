---
title: Icon 图标
demo: pages/demo/basic/icon
---

# Icon 图标

`ms-icon` 提供 Remix 图标的子集。`spin` 旋转在 App 和 Web 上使用 `UniElement.animate`（作用于外层 view），在微信小程序上对 text 或 image 使用 CSS `animation`（与 x-icon 的 `faceSpinIcon` 一致，不要作用于外层 view）。`rotate` 设置字形的静态旋转角度。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-icon`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/basic/icon`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/icon.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 常用 -->
  <ms-icon name="search-line" tone="primary" />
  <ms-icon name="add-line" tone="primary" />
  <ms-icon name="home-3-line" tone="primary" />
  <!-- 尺寸 -->
  <ms-icon name="settings-3-line" size="sm" tone="secondary" />
  <ms-icon name="settings-3-line" size="md" tone="secondary" />
  <ms-icon name="settings-3-line" size="lg" tone="secondary" />
  <!-- 方向 -->
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="90" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="180" />
  <!-- 旋转 -->
  <ms-icon name="loader-line" size="lg" tone="primary" :spin="true" />
  <ms-icon name="refresh-line" size="lg" tone="secondary" :spin="true" :spin-duration="3000" />
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| name | `string` | `''` | 名称 / 字段名 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| tone | `\| 'inherit'` | `'inherit'` | 色调（inherit / primary / secondary / danger…） |
| spin | `boolean` | `false` | 旋转加载：App/Web 用 UniElement.animate；微信小程序用 text CSS animation |
| spinDuration | `number` | `1500` | 一圈时长 ms（默认 1500） |
| rotate | `number` | `0` | 静态旋转角度（与 spin 互斥，spin 优先） |
| pressable | `boolean` | `true` | 是否自带按压态；嵌在 button 内时应为 false，避免双层 hover |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 图标字体子集

组件包内的字体只包含码表 `components/ms-icon/icons.uts` 里的图标。

图标名不在码表里时显示空白；`name` 传图片地址时按图片显示。

新增图标的步骤如下：

1. 取 `remixicon@4.7.0` 的全量 ttf（Apache-2.0）。4.5.x 版本的字形与码表不一致，不能使用。
2. 在 `components/ms-icon/icons.uts` 里加上新图标。码表是唯一的真源。
3. 用 `pyftsubset` 生成 woff2 和 ttf 子集，放到 `static/fonts`，两种都要生成。
4. 按组件包内 `uni_modules/ms-ui/styles/FONT-SUBSET.md` 里的脚本重建小程序字体。
5. 在 App 端打开 ms-icon 演示页，抽查常用图标是否显示正常。

Android 和鸿蒙使用 ttf，iOS 和 Web 使用 woff2。

小程序字体文件是 `remixicon-mp-face.scss`，不要手改。小程序字体只能内嵌子集，超过 64KB 时脚本会拒绝生成。

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-icon/`
- 演示: `#/pages/demo/basic/icon`
