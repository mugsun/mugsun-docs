---
title: Icon 图标
demo: pages/demo/basic/icon
---

# Icon 图标

`ms-icon`：Remix 子集图标。`spin`：App/Web 用 `UniElement.animate`（宿主 view）；微信用 **text/image** 上 CSS `animation`（对齐 x-icon `faceSpinIcon`，勿挂宿主 view）。`rotate` 静态角度挂字形。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-icon`（商业版，源码不公开）。
演示路由：`#/pages/demo/basic/icon`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/icon.uvue`，可在右侧手机框中查看运行效果。

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

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-icon/`
- 演示: `#/pages/demo/basic/icon`
