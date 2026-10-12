---
title: Textarea 多行
demo: pages/demo/form/textarea
---

# Textarea 多行

`ms-textarea`：多行输入：标签 / autosize / 字数 / 状态 / 确认类型。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-textarea`）。
演示路由：`#/pages/demo/form/textarea`。

## 基础用法

```vue
<template>
  <ms-textarea label="…" v-model="value">
    …
  </ms-textarea>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| label | `string` | `''` | — |
| placeholder | `string` | `''` | — |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | — |
| tips | `string` | `''` | — |
| disabled | `boolean` | `false` | — |
| readonly | `boolean` | `false` | — |
| maxlength | `number` | `-1` | — |
| indicator | `boolean` | `false` | — |
| autoHeight | `boolean` | `false` | — |
| maxHeight | `number` | `0` | autoHeight 时最大高度 px；0 不限制（对标 peer autosize.maxHeight） |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| align | `'left' \| 'center' \| 'right'` | `'left'` | — |
| bordered | `boolean` | `true` | — |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | input |
| focus | focus |
| blur | blur |
| confirm | 确认 |
| linechange | linechange |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | `label` 插槽 |
| tips | `tips` 插槽 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-textarea/`
- 演示：`#/pages/demo/form/textarea`
