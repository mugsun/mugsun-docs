---
title: Tag 标签
demo: pages/demo/basic/tag
---

# Tag 标签

`ms-tag` 是标签，用来标记分类或状态，可以带图标和关闭按钮。

开启 `checkable` 后可以点击选中，适合做筛选条件，选中状态用 `v-model:checked` 绑定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 形态 -->
  <ms-tag variant="light" theme="primary">浅色</ms-tag>
  <ms-tag variant="solid" theme="primary">填充</ms-tag>
  <ms-tag variant="outline" theme="primary">描边</ms-tag>
  <!-- 主题 -->
  <ms-tag variant="light" theme="default">默认</ms-tag>
  <ms-tag variant="light" theme="primary">主色</ms-tag>
  <ms-tag variant="light" theme="danger">危险</ms-tag>
  <!-- 尺寸 -->
  <ms-tag size="sm" theme="primary">小号</ms-tag>
  <ms-tag size="md" theme="primary">中号</ms-tag>
  <ms-tag size="lg" theme="primary">大号</ms-tag>
  <!-- 形状 -->
  <ms-tag shape="square" theme="primary">方形</ms-tag>
  <ms-tag shape="round" theme="primary">圆角</ms-tag>
  <ms-tag shape="mark" variant="outline" theme="primary">标记</ms-tag>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | 主题色 |
| variant | `'solid' \| 'light' \| 'outline' \| 'light-outline'` | `'light'` | 样式：solid 实心 / light 浅色 / outline 描边 / light-outline 浅色描边 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| shape | `'square' \| 'round' \| 'mark'` | `'square'` | 外形：square / round / mark |
| closable | `boolean` | `false` | 是否显示关闭按钮 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `string` | `''` | 图标名 |
| checkable | `boolean` | `false` | 是否可以点击选中 |
| checked | `boolean` | `false` | 是否选中，可用 `v-model:checked` |
| maxWidth | `number` | `0` | 文字的最大宽度（px），超出部分省略；`0` 表示不限制 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击标签时触发，禁用时不触发 |
| close | — | 点击关闭按钮时触发；组件不会自己消失，需要自行移除 |
| update:checked | `value: boolean` | `checkable` 时点击触发，用于 `v-model:checked` |
| change | `value: boolean` | `checkable` 时点击触发，`value` 是新的选中状态 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 标签文字 |
