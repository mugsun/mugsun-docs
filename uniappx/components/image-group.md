---
title: Image Group 图集
demo: pages/demo/display/image-group
---

# Image Group 图集

`ms-image-group` 是评论或详情页使用的图片网格，支持多图排版、可选标签、超出数量时显示遮罩，以及点击预览。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 布局 -->
  <ms-image-group
    :list="listBasic"
    @click="onClick"
  />
  <ms-image-group :list="listTwo" :columns="2" />
  <!-- 标签 -->
  <ms-image-group :list="listLabeled" label-mode="inset" />
  <ms-image-group :list="listLabeled" label-mode="outer" />
  <!-- 数量限制 -->
  <ms-image-group :list="listMany" :max-count="3" />
  <!-- 组件深度 -->
  <ms-image-group :list="listBasic" :preview="false" @click="onClick" />
  <ms-image-group :list="listTwo" :columns="2" mode="aspectFit" disabled />
  <ms-image-group :list="listMany" :columns="2" :max-count="2" />
</template>

<script setup lang="uts">
const listBasic = [
  row(IMG1),
  row(IMG2),
  row(IMG3),
  row(IMG1),
] as UTSJSONObject[]

const listLabeled = [
  row(IMG1, '封面 A'),
  row(IMG2, '封面 B'),
  row(IMG3, '封面 C'),
] as UTSJSONObject[]

const listMany = [
  row(IMG1),
  row(IMG2),
  row(IMG3),
  row(IMG1),
  row(IMG2),
  row(IMG3),
] as UTSJSONObject[]

const listTwo = [
  row(IMG2),
  row(IMG3),
  row(IMG1),
  row(IMG2),
] as UTSJSONObject[]

function onClick(payload: UTSJSONObject) : void {
  console.log('onClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 图片列表，每项含 `url`，可选 `label`（标签）和 `temp`（优先显示的缩略图） |
| columns | `number` | `3` | 每行列数 |
| mode | `string` | `'aspectFill'` | 图片缩放和裁剪模式 |
| labelMode | `string` | `'inset'` | 标签位置：`inset` 在图片内，`outer` 在图片外 |
| maxCount | `number` | `-1` | 最多显示的图片数，`-1` 表示不限制；超出的部分用遮罩提示 |
| preview | `boolean` | `true` | 点击图片是否打开预览 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | `payload: UTSJSONObject` | 点击图片时触发，`payload` 含 `index` 和 `item`（该项的原始数据）；禁用时不触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义超出数量时遮罩上的内容 |
