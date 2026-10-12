---
title: Search 搜索
demo: pages/demo/form/search
---

# Search 搜索

`ms-search`：搜索栏：shape / action / leftIcon；expose focus/blur/clear。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-search`）。
演示路由：`#/pages/demo/form/search`。

## 基础用法

```vue
<template>
  <ms-search v-model="value" :disabled="true">
    …
  </ms-search>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| placeholder | `string` | `''` | — |
| shape | `'square' \| 'round'` | `'square'` | — |
| action | `string` | `''` | — |
| center | `boolean` | `false` | — |
| clearable | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |
| readonly | `boolean` | `false` | — |
| maxlength | `number` | `-1` | — |
| leftIcon | `string` | `'search'` | — |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | input |
| focus | focus |
| blur | blur |
| clear | clear |
| confirm | 确认 |
| action | 操作按钮 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| action | `action` 插槽 |
| left | `left` 插槽 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-search/`
- 演示：`#/pages/demo/form/search`
