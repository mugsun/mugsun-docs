---
title: Cell 单元格
demo: pages/demo/basic/cell
---

# Cell 单元格

`ms-cell` 是列表单元格，左侧放图标或图片，中间是标题和描述，右侧是备注和箭头。

设置 `url` 后点击会跳转页面；右侧要放自定义内容时用 `note` 插槽。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-cell title="单行标题" arrow />
  <ms-cell title="单行标题" required note="必填" arrow />
  <ms-cell title="单行标题" note="辅助信息" arrow />
  <ms-cell
    title="单行标题"
    description="一段很长很长的内容文字"
    arrow
  />
  <ms-cell
    title="单行标题"
    description="一段很长很长的内容文字"
    required
    arrow
    :bordered="false"
  />
  <ms-cell title="带徽标" arrow :bordered="false">
    <template #note>
      <ms-badge :count="16" />
    </template>
  </ms-cell>
  <ms-cell title="单行标题" icon="customer-service-line" arrow />
  <ms-cell title="单行标题" icon="global-line" arrow />
  <ms-cell title="单行标题" icon="lock-line" arrow :bordered="false" />
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 主标题 |
| description | `string` | `''` | 下方描述 |
| note | `string` | `''` | 右侧备注 |
| icon | `string` | `''` | 图标名（icons.uts） |
| image | `string` | `''` | 左侧图片（优先于 icon） |
| arrow | `boolean` | `false` | 是否显示箭头 |
| bordered | `boolean` | `true` | 是否显示边框 |
| required | `boolean` | `false` | 是否显示必填星号 |
| url | `string` | `''` | 点击跳转地址 |
| disabled | `boolean` | `false` | 是否禁用 |
| align | `'top' \| 'middle' \| 'bottom'` | `'middle'` | 右侧区垂直对齐 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击单元格时触发，禁用时不触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| note | 自定义右侧内容，默认显示 `note` |
