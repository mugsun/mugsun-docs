---
title: Title
demo: pages/demo/nav/title
---

# Title

`ms-title` — Title for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-title`).
Demo route: `#/pages/demo/nav/title`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/title.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-title content="一级标题" level="h1" @click="onTitleClick" />
  <ms-title content="二级标题" level="h2" />
  <ms-title content="三级标题" level="h3" />
  <!-- 组件状态 -->
  <ms-title
    level="h4"
    :lines="1"
    content="这是一段很长的标题文案用来演示单行省略截断效果请不要折行"
  />
  <!-- 组件深度 -->
  <ms-title content="四级标题" level="h4" />
  <ms-title content="五级标题" level="h5" />
  <ms-title content="六级标题" level="h6" />
</template>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Content text |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | Level count |
| lines | `number` | `0` | Row count |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Alignment |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-title/`
- Demo: `#/pages/demo/nav/title`
- Chinese docs: [/uniappx/components/title](/uniappx/components/title)
