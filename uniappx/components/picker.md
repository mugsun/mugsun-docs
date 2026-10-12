---
title: Picker 选择器
demo: pages/demo/form/picker
---

# Picker 选择器

`ms-picker`：选择器。扁平 `options`（`column` 分列 + `label` / `value`），内层是原生 `picker-view` / `picker-view-column`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-picker`）。
演示路由：`#/pages/demo/form/picker`。

## 基础用法

```vue
<template>
  <ms-picker title="…" v-model:visible="open">
    …
  </ms-picker>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 扁平选项：column（列下标）+ label + value |
| value | `number[]` | `[]` | 各列选中项下标 |
| visible | `boolean` | `false` | 是否显示（usePopup 时生效） |
| title | `string` | `''` | 标题；空串则头部只留取消/确定 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确定按钮文案 |
| header | `boolean` | `true` | 是否显示头部 |
| itemHeight | `number` | `44` | 单项高度 px |
| visibleItemCount | `number` | `5` | 可视项数 |
| usePopup | `boolean` | `true` | 是否用弹出层包裹；false 则内嵌 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| change | 值变化 |
| pick | 选中项变化（未确认） |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-picker/`
- 演示: `#/pages/demo/form/picker`
