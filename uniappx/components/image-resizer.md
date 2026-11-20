---
title: Image Resizer 图片裁剪
demo: pages/demo/display/image-resizer
---

# Image Resizer 图片裁剪

`ms-image-resizer` 是图片裁剪组件，裁剪框固定在中间，通过拖动和缩放图片来选取区域，还可以翻转图片。

点击确认后导出裁剪结果，`confirm` 事件返回图片的 data URL 和宽高。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-image-resizer
    ref="squareRef"
    :src="src"
    :crop-width="200"
    :crop-height="200"
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
  <ms-image-resizer
    :src="src"
    :crop-width="280"
    :crop-height="140"
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
  <!-- 组件样式 -->
  <ms-image-resizer
    :src="src"
    :crop-width="200"
    :crop-height="200"
    hide-flip
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
</template>

<script setup lang="uts">
const src = ref('/static/demo-crop.png')

function onConfirm(payload: UTSJSONObject) : void {
  console.log('onConfirm')
}

function onCancel() : void {
  console.log('onCancel')
}

function onError(msg: string) : void {
  console.log('onError')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 图片地址 |
| cropWidth | `number` | `240` | 裁剪框宽度（px） |
| cropHeight | `number` | `240` | 裁剪框高度（px） |
| height | `number` | `320` | 组件高度（px） |
| quality | `number` | `1` | 输出图片质量 0–1 |
| hideFlip | `boolean` | `false` | 是否隐藏翻转按钮 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| confirm | `payload: UTSJSONObject` | 导出成功时触发，`payload` 含 `src`（data URL）、`width` 和 `height` |
| cancel | — | 点击取消按钮时触发 |
| error | `message: string` | 图片加载或导出失败时触发，`message` 是错误说明 |
| change | `payload: UTSJSONObject` | 拖动、缩放或翻转后触发，`payload` 含 `scale`、`flipX` 和 `flipY` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `reset()` | 恢复初始的缩放、位置和翻转状态 |
| `confirm()` | 导出裁剪结果，等同于点击确认按钮 |
