---
title: Badge 徽标
demo: pages/demo/basic/badge
---

# Badge 徽标

`ms-badge` 是徽标组件，包裹默认插槽里的内容，在右上角显示红点、数字或文字。

三种内容同时设置时，`label` 优先于 `dot`，`dot` 优先于 `count`。设置 `standalone` 后徽标单独显示。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 红点 -->
  <ms-badge dot>
    <view />
  </ms-badge>
  <ms-badge dot>
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <!-- 数字 -->
  <ms-badge :count="8">
    <view />
  </ms-badge>
  <ms-badge :count="100" :max="99">
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <!-- 自定义 -->
  <ms-badge label="NEW">
    <ms-button size="sm" variant="outline" theme="default">按钮</ms-button>
  </ms-badge>
  <!-- 形状 -->
  <ms-badge :count="2" shape="circle">
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
  <ms-badge :count="6" shape="square">
    <view>
      <ms-icon name="notification-line" size="lg" tone="secondary" />
    </view>
  </ms-badge>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| count | `number` | `0` | 数字徽标；设置了 label 或 dot 时不显示数字 |
| label | `string` | `''` | 文案徽标；非空时优先于 dot 和 count |
| dot | `boolean` | `false` | 圆点徽标；优先于 count，label 非空时不生效 |
| max | `number` | `99` | 数字封顶；超出显示 max+ |
| showZero | `boolean` | `false` | count 为 0 时是否仍显示 |
| theme | `'danger' \| 'primary' \| 'success' \| 'warning'` | `'danger'` | 主题色 |
| shape | `'circle' \| 'square'` | `'circle'` | 外形 |
| size | `'sm' \| 'md'` | `'md'` | 尺寸 |
| offset | `number[]` | `[]` | 相对锚点的 [x,y] 偏移（px） |
| standalone | `boolean` | `false` | 独立展示徽标（不包裹锚点） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 徽标依附的内容 |
