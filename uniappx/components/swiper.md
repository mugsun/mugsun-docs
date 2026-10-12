---
title: Swiper 轮播
demo: pages/demo/display/swiper
---

# Swiper 轮播

`ms-swiper`：轮播：dots/fraction/controls；`v-model:current`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-swiper`）。
演示路由：`#/pages/demo/display/swiper`。

## 基础用法

```vue
<template>
  <ms-swiper>
    …
  </ms-swiper>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / image / tone（brand / success / warning / muted） |
| current | `number` | `0` | 当前项下标 |
| height | `number` | `160` | 轮播高度（px），蒸汽禁百分比高度 |
| autoplay | `boolean` | `false` | 自动播放 |
| interval | `number` | `3000` | 自动播放间隔 ms |
| duration | `number` | `300` | 切换动画时长 ms |
| loop | `boolean` | `true` | 衔接滑动 |
| vertical | `boolean` | `false` | 纵向滑动 |
| navigation | `string` | `'dots'` | 导航器：dots / dots-bar / fraction / controls / none |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-swiper/`
- 演示: `#/pages/demo/display/swiper`
