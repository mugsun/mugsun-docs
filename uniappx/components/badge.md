---
title: Badge 徽标
demo: pages/demo/basic/badge
---

# Badge 徽标

`ms-badge` 是徽标组件，包裹默认插槽，在右上角显示红点、数字或文字。`label` 的优先级高于 `count` 和 `dot`；设置 `standalone` 后可单独显示。组件不提供 color、fontSize 等样式属性。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-badge`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/basic/badge`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/badge.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| count | `number` | `0` | 数字徽标；优先于 label |
| label | `string` | `''` | 文案徽标（非数字时） |
| dot | `boolean` | `false` | 是否圆点徽标（忽略数字） |
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
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-badge/`
- 演示: `#/pages/demo/basic/badge`
