---
title: Code Input 验证码
demo: pages/demo/form/code-input
---

# Code Input 验证码

`ms-code-input`：验证码格：透明 `input` 盖住整排格子拉键盘；`skin` / `placeShape` / `password` / `autoFocus`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-code-input`）。
演示路由：`#/pages/demo/form/code-input`。

## 基础用法

```vue
<template>
  <ms-code-input v-model="value" :disabled="true">
    …
  </ms-code-input>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| length | `number` | `4` | — |
| skin | `'outline' \| 'fill'` | `'outline'` | — |
| placeShape | `'none' \| 'line' \| 'dot'` | `'dot'` | — |
| password | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| autoFocus | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| complete | complete |
| click | 点击 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-code-input/`
- 演示：`#/pages/demo/form/code-input`
