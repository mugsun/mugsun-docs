---
title: Transition 过渡
demo: pages/demo/basic/transition
---

# Transition 过渡

`ms-transition`：进出场过渡容器，由 `visible` 驱动。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-transition`）。
演示路由：`#/pages/demo/basic/transition`。

## 基础用法

```vue
<template>
  <ms-transition name="fade" v-model:visible="open">
    …
  </ms-transition>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| name | `\| 'fade'` | `'fade'` | — |
| duration | `number` | `300` | — |
| appear | `boolean` | `false` | — |
| destroyOnHide | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| before-enter | before-enter |
| after-enter | after-enter |
| before-leave | before-leave |
| after-leave | after-leave |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-transition/`
- 演示：`#/pages/demo/basic/transition`
