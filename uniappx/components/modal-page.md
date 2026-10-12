---
title: Modal Page 整页模态
demo: pages/demo/feedback/modal-page
---

# Modal Page 整页模态

`ms-modal-page`：整页模态层：`position: fixed` 全屏覆盖（不依赖 x-design 原生 `xModalPage`）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-modal-page`）。
演示路由：`#/pages/demo/feedback/modal-page`。

## 基础用法

```vue
<template>
  <ms-modal-page title="…" v-model:visible="open">
    …
  </ms-modal-page>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| title | `string` | `''` | — |
| showClose | `boolean` | `true` | — |
| closeOnOverlayClick | `boolean` | `false` | — |
| zIndex | `number` | `1100` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |
| open | 打开 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| footer | `footer` 插槽 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-modal-page/`
- 演示：`#/pages/demo/feedback/modal-page`
