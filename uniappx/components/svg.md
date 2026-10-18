---
title: Svg 矢量
demo: pages/demo/media/svg
---

# Svg 矢量

`ms-svg` 用于显示矢量图，在固定尺寸的容器中用官方 `<image>` 渲染 SVG，支持内联 SVG 源码和着色。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-svg/components/ms-svg`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
可选插件：需单独安装 `uni_modules/ms-svg`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/svg`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/svg.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 资源地址 |
| source | `string` | `''` | 源码 / 内联内容 |
| size | `number` | `24` | 尺寸 |
| width | `number` | `0` | 宽度（px） |
| height | `number` | `0` | 高度（px） |
| color | `string` | `''` | 颜色 |
| mode | `string` | `'aspectFit'` | 模式 |

## 事件

| 事件 | 说明 |
| --- | --- |
| load | 加载完成 |
| error | 错误 |

## 相关

- 组件目录: `uni_modules/ms-svg/components/ms-svg/`
- 演示: `#/pages/demo/media/svg`
