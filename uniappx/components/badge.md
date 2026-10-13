---
title: Badge 徽标
demo: pages/demo/basic/badge
---

# Badge 徽标

`ms-badge`：角标：包裹 default 插槽，右上角展示红点 / 数字 / 文案。`label` 优先于 `count` / `dot`；`standalone` 可独立展示。禁止 color / fontSize 等样式 props。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-badge`）。
演示路由：`#/pages/demo/basic/badge`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/badge.uvue`，可在右侧手机框中查看运行效果。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

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
