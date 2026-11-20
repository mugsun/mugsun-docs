---
title: Link 链接
demo: pages/demo/basic/link
---

# Link 链接

`ms-link` 是文字链接，文字用 `content` 或默认插槽设置，可以带下划线和前后缀图标。

设置 `href` 后点击会跳转到应用内页面，方式由 `openType` 决定。`http(s)` 地址不跳转，需要在 `click` 事件里处理。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 主题 -->
  <ms-link theme="default">默认</ms-link>
  <ms-link theme="primary">主色</ms-link>
  <ms-link theme="danger">危险</ms-link>
  <!-- 下划线 -->
  <ms-link theme="primary">无下划线</ms-link>
  <ms-link theme="primary" :underline="true">下划线</ms-link>
  <!-- 图标 -->
  <ms-link theme="primary" icon="links-line">前缀</ms-link>
  <ms-link theme="primary" suffix-icon="arrow-right-s-line">后缀</ms-link>
  <!-- 尺寸 -->
  <ms-link size="sm" theme="primary">小号</ms-link>
  <ms-link size="md" theme="primary">中号</ms-link>
  <ms-link size="lg" theme="primary">大号</ms-link>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | 主题色 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| underline | `boolean` | `false` | 是否显示下划线 |
| disabled | `boolean` | `false` | 是否禁用 |
| href | `string` | `''` | 应用内页面路径，点击后跳转；`http(s)` 地址不跳转 |
| openType | `'navigate' \| 'redirect' \| 'switchTab' \| 'reLaunch'` | `'navigate'` | 跳转方式：navigate / redirect / switchTab / reLaunch |
| icon | `string` | `''` | 前缀图标名 |
| suffixIcon | `string` | `''` | 后缀图标名 |
| content | `string` | `''` | 文字内容，没有默认插槽内容时使用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击时触发，禁用时不触发；设置了 `href` 时先触发再跳转 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 链接文字，默认显示 `content` |
