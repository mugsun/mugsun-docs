---
title: Image Resizer 裁剪
demo: pages/demo/display/image-resizer
---

# Image Resizer 裁剪

`ms-image-resizer`：图片裁剪：固定居中裁剪窗 + 图片拖动平移 + 滑条缩放 + 左右/上下翻转 + 重置 + 取消/确认导出。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-image-resizer`（商业版，源码不公开）。
演示路由：`#/pages/demo/display/image-resizer`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/image-resizer.uvue`，可在右侧手机框中查看运行效果。

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
