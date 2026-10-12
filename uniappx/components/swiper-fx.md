---
title: Swiper Fx 动效轮播
demo: pages/demo/display/swiper-fx
---

# Swiper Fx 动效轮播

`ms-swiper-fx`：动效轮播（数据驱动）。`list` 项支持 `image` / `color` / `label`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-swiper-fx`）。
演示路由：`#/pages/demo/display/swiper-fx`。

## 基础用法

```vue
<template>
  <ms-swiper-fx>
    …
  </ms-swiper-fx>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| effect | `'fade' \| 'slide' \| 'zoom' \| 'scale-slide'` | `'fade'` | — |
| current | `number` | `0` | — |
| height | `number` | `160` | — |
| autoplay | `boolean` | `true` | — |
| interval | `number` | `3500` | — |
| duration | `number` | `600` | — |
| loop | `boolean` | `true` | — |
| showDots | `boolean` | `true` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-swiper-fx/`
- 演示：`#/pages/demo/display/swiper-fx`
