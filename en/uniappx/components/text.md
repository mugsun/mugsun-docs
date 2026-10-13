---
title: Text
demo: pages/demo/basic/text
---

# Text

`ms-text` — Text for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-text` (repository not yet public).
Demo route: `#/pages/demo/basic/text`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/text.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 正文与语义色 -->
  <ms-text>这是一段默认正文，用于页面正文展示。</ms-text>
  <ms-text variant="secondary">次要</ms-text>
  <ms-text variant="primary">主色</ms-text>
  <!-- 字号与样式 -->
  <ms-text size="sm">小号 · 辅助说明与标签</ms-text>
  <ms-text size="md">中号 · 默认正文与表单</ms-text>
  <ms-text size="lg">大号 · 小标题与强调</ms-text>
  <!-- 交互 -->
  <ms-text :lines="2">
    这是一段很长的文字，用来测试最大行数与省略号。第二行继续。第三行应该被截断并显示省略号效果。
  </ms-text>
  <ms-text selectable>可选中文字，长按或拖选</ms-text>
  <ms-text variant="primary" @click="onTextClick">点我（看 toast）</ms-text>
  <!-- 组件深度 -->
  <ms-text variant="danger" bold>危险操作不可恢复，请谨慎确认</ms-text>
  <ms-text variant="warning" align="right" size="sm">余额不足，请先充值</ms-text>
  <ms-text :lines="1" selectable variant="secondary">
    这是一段很长的可复制文案，超出一行时省略，仍可长按选中复制整段内容。
  </ms-text>
</template>

<script setup lang="uts">
function onTextClick() : void {
  console.log('onTextClick')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Style variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| bold | `boolean` | `false` | Whether bold |
| lines | `number` | `0` | Row count |
| selectable | `boolean` | `false` | Whether text is selectable |
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

- Component: `uni_modules/ms-ui/components/ms-text/`
- Demo: `#/pages/demo/basic/text`
- Chinese docs: [/uniappx/components/text](/uniappx/components/text)
