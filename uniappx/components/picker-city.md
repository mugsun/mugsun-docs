---
title: Picker City 城市
demo: pages/demo/form/picker-city
---

# Picker City 城市

`ms-picker-city`：滚轮式**联动**行政区选择（省 → 市 → 区）。数据入口与 `ms-cascader` 同形的扁平 `options`（`value`/`label`/`parent`），不内置全国区划表——真源是后端 `sys_region`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项列表 |
| value | `string[]` | `[]` | 当前值 |
| level | `number` | `3` | 省市区级数 |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `'选择地区'` | 标题 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| separator | `string` | `' / '` | 分隔符 |
| itemHeight | `number` | `44` | 单项高度（px） |
| visibleItemCount | `number` | `5` | 每列可视条目数 |
| usePopup | `boolean` | `true` | 是否包在弹出层内 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-picker-city/`
- 演示: `#/pages/demo/form/picker-city`
