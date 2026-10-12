---
title: Keyboard 键盘
demo: pages/demo/form/keyboard
---

# Keyboard 键盘

`ms-keyboard`：自定义键盘：`type` 为 `number` / `password` / `idcard` / `car`，底部 `ms-popup` 弹出。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-keyboard`）。
演示路由：`#/pages/demo/form/keyboard`。

## 基础用法

```vue
<template>
  <ms-keyboard title="…" v-model="value">
    …
  </ms-keyboard>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| visible | `boolean` | `false` | — |
| type | `string` | `'number'` | number / password / idcard / car |
| title | `string` | `'安全键盘'` | — |
| maxLen | `number` | `0` | — |
| max | `number` | `0` | — |
| digit | `boolean` | `true` | — |
| hold | `boolean` | `false` | — |
| confirmText | `string` | `'确认'` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| update:visible | v-model:visible 更新 |
| change | 值变化 |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-keyboard/`
- 演示：`#/pages/demo/form/keyboard`
