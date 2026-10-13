---
title: Color Picker 颜色
demo: pages/demo/form/color-picker
---

# Color Picker 颜色

`ms-color-picker`：颜色选择：预设色板 + 离散色相条 + 饱和度/明度/透明度滑块。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-color-picker`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/color-picker`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/color-picker.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-color-picker v-model="baseColor" type="base" @change="onBaseChange" />
  <ms-color-picker v-model="fullColor" type="multiple" @change="onFullChange" />
  <!-- 组件样式 -->
  <ms-color-picker v-model="alphaColor" :enable-alpha="true" format="rgb" @change="onAlphaChange" />
  <ms-color-picker v-model="hslColor" format="hsl" :columns="6" @change="onHslChange" />
  <ms-color-picker v-model="disabledColor" type="base" :disabled="true" />
  <!-- 组件深度 -->
  <ms-color-picker
    v-model="swatchColor"
    type="base"
    :swatch-colors="customSwatches"
    :columns="5"
    @change="onSwatchChange"
  />
  <ms-color-picker
    v-model="noPreviewColor"
    type="base"
    :show-preview="false"
    @change="onNoPreviewChange"
  />
  <ms-color-picker ref="pickerRef" v-model="exposeColor" type="multiple" @change="onExposeChange" />
</template>

<script setup lang="uts">
const alphaColor = ref('rgba(0,155,58,0.6)')

const baseColor = ref('#0579ff')

const customSwatches = ['#e11d48', '#ea580c', '#ca8a04', '#16a34a', '#2563eb'] as string[]

const disabledColor = ref('#8c9099')

const exposeColor = ref('#2563eb')

const fullColor = ref('#ff4f00')

const hslColor = ref('#0f766e')

const noPreviewColor = ref('#2563eb')

const swatchColor = ref('#e11d48')

function onBaseChange(value: string) : void {
  console.log('onBaseChange')
}

function onFullChange(value: string) : void {
  console.log('onFullChange')
}

function onAlphaChange(value: string) : void {
  console.log('onAlphaChange')
}

function onHslChange(value: string) : void {
  console.log('onHslChange')
}

function onSwatchChange(value: string) : void {
  console.log('onSwatchChange')
}

function onNoPreviewChange(value: string) : void {
  console.log('onNoPreviewChange')
}

function onExposeChange(value: string) : void {
  console.log('onExposeChange')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `'#0579ff'` | 当前色值，hex / rgb / rgba 可入 |
| type | `string` | `'multiple'` | base 仅色板；multiple 色板 + 滑块 |
| format | `string` | `'hex'` | 输出格式：hex / rgb / hsl |
| enableAlpha | `boolean` | `false` | 是否开透明度滑块 |
| swatchColors | `string[]` | `[]` | 预设色，空则用内置 |
| columns | `number` | `8` | 色板每行格数 |
| showPreview | `boolean` | `true` | 是否显示预览块与色值 |
| disabled | `boolean` | `false` | 禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| pick | 选中项变化（未确认） |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-color-picker/`
- 演示: `#/pages/demo/form/color-picker`
