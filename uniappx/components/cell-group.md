---
title: Cell Group 单元格组
demo: pages/demo/basic/cell
---

# Cell Group 单元格组

`ms-cell-group` 把多个 [`ms-cell`](./cell) 归为一组，可以加组标题，并在通栏和卡片两种样式之间切换。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-cell-group theme="card">
    <ms-cell title="单行标题" icon="customer-service-line" arrow />
    <ms-cell title="单行标题" icon="global-line" arrow />
    <ms-cell title="单行标题" icon="lock-line" arrow :bordered="false" />
  </ms-cell-group>
  <ms-cell-group>
    <ms-cell title="常见能力" icon="apps-line" description="高质量组件库" arrow />
    <ms-cell title="价格设置" icon="price-tag-3-line" note="+￥32" arrow />
    <ms-cell title="消息通知" icon="customer-service-line" note="测试" arrow />
    <ms-cell title="标签页面" icon="gift-line" note="测试" arrow :bordered="false" />
  </ms-cell-group>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'card'` | `'default'` | 样式：`default` 为通栏，`card` 为卡片 |
| title | `string` | `''` | 组标题 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 放置 `ms-cell` |
