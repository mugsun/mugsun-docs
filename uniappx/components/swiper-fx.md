---
title: Swiper Fx 动效轮播
demo: pages/demo/display/swiper-fx
---

# Swiper Fx 动效轮播

`ms-swiper-fx` 是带切换动效的轮播，由数据生成，`list` 中的每一项支持 `image`、`color` 和 `label`。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-swiper-fx`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/display/swiper-fx`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/swiper-fx.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-swiper-fx
    :list="list"
    :effect="effectName"
    :height="160"
    :autoplay="true"
    :interval="4000"
    @change="onChange"
    @click="onClick"
  />
  <!-- 组件样式 -->
  <ms-swiper-fx :list="list" effect="slide" :show-dots="true" :autoplay="false" :height="140" />
  <!-- 组件深度 -->
  <ms-swiper-fx
    :list="list"
    effect="fade"
    :loop="false"
    :autoplay="false"
    :height="140"
  />
  <ms-swiper-fx
    :list="list"
    effect="slide"
    :duration="200"
    :interval="2000"
    :height="140"
  />
  <ms-swiper-fx
    :list="list"
    effect="slide"
    :current="1"
    :autoplay="false"
    :height="140"
  />
</template>

<script setup lang="uts">
type FxEffect = 'fade' | 'slide' | 'zoom' | 'scale-slide'

const effectName = ref('fade' as FxEffect)

const list = ref([
  { color: '#64748b', label: '卡片一' } as UTSJSONObject,
  { color: '#0f766e', label: '卡片二' } as UTSJSONObject,
  { color: '#b45309', label: '卡片三' } as UTSJSONObject,
] as UTSJSONObject[])

function onChange(i: number) : void {
  console.log('onChange')
}

function onClick(i: number) : void {
  console.log('onClick')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
