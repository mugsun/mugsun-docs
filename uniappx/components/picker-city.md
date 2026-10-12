---
title: Picker City 城市
demo: pages/demo/form/picker-city
---

# Picker City 城市

`ms-picker-city`：滚轮式**联动**行政区选择（省 → 市 → 区）。数据入口与 `ms-cascader` 同形的扁平 `options`（`value`/`label`/`parent`），不内置全国区划表——真源是后端 `sys_region`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-picker-city`）。
演示路由：`#/pages/demo/form/picker-city`。

## 基础用法

```vue
<template>
  <ms-picker-city title="…" v-model:visible="open">
    …
  </ms-picker-city>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | — |
| value | `string[]` | `[]` | — |
| level | `number` | `3` | — |
| visible | `boolean` | `false` | — |
| title | `string` | `'选择地区'` | — |
| cancelText | `string` | `'取消'` | — |
| confirmText | `string` | `'确定'` | — |
| separator | `string` | `' / '` | — |
| itemHeight | `number` | `44` | — |
| visibleItemCount | `number` | `5` | — |
| usePopup | `boolean` | `true` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| update:value | v-model:value 更新 |
| change | 值变化 |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-picker-city/`
- 演示：`#/pages/demo/form/picker-city`
