---
title: Swiper Fx 动效轮播
demo: pages/demo/display/swiper-fx
---

# Swiper Fx 动效轮播

`ms-swiper-fx`：动效轮播（数据驱动）。`list` 项支持 `image` / `color` / `label`。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| effect | `'fade' \| 'slide' \| 'zoom' \| 'scale-slide'` | `'fade'` | 切换特效：fade / slide / zoom / scale-slide |
| current | `number` | `0` | 当前索引 |
| height | `number` | `160` | 高度（px） |
| autoplay | `boolean` | `true` | 是否自动播放 |
| interval | `number` | `3500` | 间隔（ms） |
| duration | `number` | `600` | 时长（ms） |
| loop | `boolean` | `true` | 是否循环 |
| showDots | `boolean` | `true` | 是否显示指示点 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-swiper-fx/`
- 演示: `#/pages/demo/display/swiper-fx`
