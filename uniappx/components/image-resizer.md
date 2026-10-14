---
title: Image Resizer 图片裁剪
demo: pages/demo/display/image-resizer
---

# Image Resizer 图片裁剪

`ms-image-resizer` 是图片裁剪组件，提供固定居中的裁剪框，支持拖动平移、滑条缩放、水平和垂直翻转、重置，以及取消或确认导出。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-image-resizer`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/image-resizer`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/image-resizer.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 资源地址 |
| cropWidth | `number` | `240` | 裁剪宽度（px） |
| cropHeight | `number` | `240` | 裁剪高度（px） |
| height | `number` | `320` | 高度（px） |
| quality | `number` | `1` | 输出图片质量 0–1 |
| hideFlip | `boolean` | `false` | 是否隐藏翻转 |

## 事件

| 事件 | 说明 |
| --- | --- |
| confirm | 确认 |
| cancel | 取消 |
| error | 错误 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-image-resizer/`
- 演示: `#/pages/demo/display/image-resizer`
