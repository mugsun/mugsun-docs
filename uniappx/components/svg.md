---
title: Svg 矢量
demo: pages/demo/media/svg
---

# Svg 矢量

`ms-svg` 用于显示矢量图，在固定尺寸的容器中用官方 `<image>` 渲染 SVG，支持内联 SVG 源码和着色。

这是可选插件，需要单独安装 `uni_modules/ms-svg`，并依赖 `ms-ui`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-svg :source="check" :size="32" color="#2563eb" @load="onLoad" @error="onError" />
  <ms-svg :source="star" :size="32" color="#f59e0b" />
  <ms-svg src="/static/demo-vector.svg" :size="32" />
  <!-- 组件样式 -->
  <ms-svg :source="check" :size="16" :color="tint" />
  <ms-svg :source="check" :size="24" :color="tint" />
  <ms-svg :source="check" :size="40" :color="tint" />
  <!-- 组件深度 -->
  <ms-svg :source="star" :width="64" :height="32" mode="aspectFill" color="#2563eb" />
  <ms-svg :source="check" :width="64" :height="32" mode="aspectFill" :color="tint" />
  <ms-svg :source="star" :width="72" :height="28" mode="scaleToFill" color="#0f766e" />
</template>

<script setup lang="uts">
const check =

const star =

const tint = ref('#2563eb')

function onLoad(payload: UTSJSONObject) : void {
  console.log('onLoad')
}

function onError(payload: UTSJSONObject) : void {
  console.log('onError')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 图片地址，可以是 `/static/` 下的路径或 http(s) 地址 |
| source | `string` | `''` | 内联的 SVG 源码，优先于 `src` |
| size | `number` | `24` | 边长（px） |
| width | `number` | `0` | 宽度（px），大于 0 时覆盖 `size` |
| height | `number` | `0` | 高度（px），大于 0 时覆盖 `size` |
| color | `string` | `''` | 颜色，替换内联源码里的 `currentColor` |
| mode | `string` | `'aspectFit'` | 缩放模式：scaleToFill / aspectFit / aspectFill |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| load | `payload: UTSJSONObject` | 加载成功时触发，`payload` 含 `width` 和 `height` |
| error | `payload: UTSJSONObject` | 加载失败时触发，`payload.errMsg` 是错误信息 |
