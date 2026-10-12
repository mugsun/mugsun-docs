---
title: Cell 单元格
demo: pages/demo/basic/cell
---

# Cell 单元格

`ms-cell`：列表单元格。用 `title` / `description` / `note` / `icon` / `arrow` / `bordered` / `required` / `url` / `disabled`；右侧自定义放 `note` 插槽。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-cell`）。
演示路由：`#/pages/demo/basic/cell`。

## 基础用法

```vue
<template>
  <ms-cell title="…">
    …
  </ms-cell>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 标题 |
| description | `string` | `''` | 描述文案 |
| note | `string` | `''` | 备注 |
| icon | `string` | `''` | 图标名（icons.uts） |
| image | `string` | `''` | 左侧图片（优先于 icon） |
| arrow | `boolean` | `false` | 是否显示箭头 |
| bordered | `boolean` | `true` | 是否带边框 |
| required | `boolean` | `false` | 是否必填 |
| url | `string` | `''` | 地址 |
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
