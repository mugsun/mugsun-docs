---
title: Cell 单元格
demo: pages/demo/basic/cell
---

# Cell 单元格

`ms-cell` 是列表单元格，支持 `title`、`description`、`note`、`icon`、`arrow`、`bordered`、`required`、`url` 和 `disabled`；右侧的自定义内容放在 `note` 插槽中。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-cell`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/basic/cell`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/cell.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| note | `note` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-cell/`
- 演示: `#/pages/demo/basic/cell`
