---
title: Barrage 弹幕
demo: pages/demo/media/barrage
---

# Barrage 弹幕

`ms-barrage`：弹幕层，叠在默认 slot 内容上。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-barrage`）。
演示路由：`#/pages/demo/media/barrage`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/barrage.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-barrage :list="list" :height="120" :rows="3" :paused="paused" @complete="onComplete">
    <view>
      <text>多行轨道 · 营销滚动示例</text>
    </view>
  </ms-barrage>
  <!-- 组件深度 -->
  <ms-barrage :list="slowList" :height="96" :rows="2" :speed="40">
    <view>
      <text>双轨 · 慢速</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="fastList" :height="140" :rows="4" :speed="120">
    <view>
      <text>四轨 · 快速</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="singleList" :height="56" :rows="1" :speed="60">
    <view>
      <text>单轨 · 单行滚动</text>
    </view>
  </ms-barrage>
</template>

<script setup lang="uts">
const paused = ref(false)
const list = ref(seed.slice(0) as string[])
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | 数据列表 |
| height | `number` | `120` | 高度（px） |
| speed | `number` | `80` | 速度 |
| rows | `number` | `3` | 行数 |
| paused | `boolean` | `false` | 是否暂停弹幕 |

## 事件

| 事件 | 说明 |
| --- | --- |
| complete | complete |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-barrage/`
- 演示: `#/pages/demo/media/barrage`
