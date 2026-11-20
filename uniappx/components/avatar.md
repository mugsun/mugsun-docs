---
title: Avatar 头像
demo: pages/demo/display/avatar
---

# Avatar 头像

`ms-avatar` 用于显示单个头像，内容可以是图片、文字或图标。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-avatar :src="demoSrc" />
  <ms-avatar text="Mug" />
  <ms-avatar />
  <!-- 形状 -->
  <ms-avatar :src="demoSrc" shape="circle" />
  <ms-avatar :src="demoSrc" shape="round" />
  <!-- 组件尺寸 -->
  <ms-avatar text="S" size="sm" />
  <ms-avatar text="M" size="md" />
  <ms-avatar text="L" size="lg" />
  <!-- 组件深度 -->
  <ms-avatar icon="customer-service-line" size="lg" />
  <ms-avatar text="圆" shape="round" size="lg" />
  <ms-avatar src="/static/not-exist.png" text="退" @error="onAvatarError" />
</template>

<script setup lang="uts">
const demoSrc = '/static/logo.png'

function onAvatarError() : void {
  console.log('onAvatarError')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 头像图片地址 |
| text | `string` | `''` | 无图时展示的文字 |
| icon | `string` | `''` | 无图无文时的图标名 |
| shape | `'circle' \| 'round'` | `'circle'` | 外形：`circle` 为圆形，`round` 为圆角 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸档位 |
| mode | `string` | `'aspectFill'` | 图片 mode（如 aspectFill） |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击头像时触发 |
| error | — | 图片加载失败时触发，此时改为显示文字或图标 |
