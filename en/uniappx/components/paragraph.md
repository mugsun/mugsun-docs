---
title: Paragraph
demo: pages/demo/display/paragraph
---

# Paragraph

`ms-paragraph` — Paragraph for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-paragraph`).
Demo route: `#/pages/demo/display/paragraph`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/paragraph.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-paragraph
    content="Mugsun 是一套面向移动端的组件库，强调设计令牌驱动与多端表现一致。"
    @click="onParaClick"
  />
  <ms-paragraph
    tone="secondary"
    content="次要说明用于补充上下文，字色更弱，不抢主信息。"
  />
  <!-- 组件状态 -->
  <ms-paragraph
    :lines="2"
    content="这是一段很长的段落文案，用来演示多行省略截断效果。超过指定行数后应以省略号收尾，避免把卡片撑得过高，也方便在列表场景里保持节奏。"
  />
  <!-- 组件深度 -->
  <ms-paragraph tone="success" content="成功提示：资料已保存。" />
  <ms-paragraph tone="warning" content="警告提示：请核对必填项。" />
  <ms-paragraph tone="danger" content="危险提示：操作不可撤销。" />
</template>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `''` | Content text |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Text tone: default / secondary / success / warning / danger |
| lines | `number` | `0` | Row count |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-paragraph/`
- Demo: `#/pages/demo/display/paragraph`
- Chinese docs: [/uniappx/components/paragraph](/uniappx/components/paragraph)
