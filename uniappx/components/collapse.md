---
title: Collapse 折叠
demo: pages/demo/display/collapse
---

# Collapse 折叠

`ms-collapse`：折叠面板：`items` 驱动；`accordion` / `theme` / `expandIcon` / `defaultExpandAll`；受控 `value`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-collapse`（商业版，源码不公开）。
演示路由：`#/pages/demo/display/collapse`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/collapse.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-collapse
    :items="baseItems"
    :value="baseValue"
    @change="onBaseChange"
  />
  <ms-collapse
    :items="actionItems"
    @change="onActionChange"
  />
  <ms-collapse
    :items="accordionItems"
    :value="accordionValue"
    accordion
    @change="onAccordionChange"
  />
  <ms-collapse
    :items="disabledItems"
    @change="onDisabledChange"
  />
  <!-- 样式 -->
  <ms-collapse
    :items="cardItems"
    :value="cardValue"
    theme="card"
    @change="onCardChange"
  />
  <ms-collapse :items="baseItems" :expand-icon="false" />
  <ms-collapse :items="accordionItems" :default-expand-all="true" />
  <ms-collapse
    v-model:value="modelValue"
    :items="baseItems"
    @change="onModelChange"
  />
</template>

<script setup lang="uts">
const accordionItems = [
  { label: '手风琴一', content: longText } as UTSJSONObject,
  { label: '手风琴二', content: longText } as UTSJSONObject,
  { label: '手风琴三', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const accordionValue = [0] as number[]

const actionItems = [
  { label: '折叠面板标题', note: '展开', content: longText } as UTSJSONObject,
  { label: '带左图标', icon: 'information-line', note: '说明', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const baseItems = [
  { label: '折叠面板标题', content: longText } as UTSJSONObject,
  { label: '第二个面板', content: longText } as UTSJSONObject,
] as UTSJSONObject[]

const baseValue = [0] as number[]

const cardItems = [
  { label: '卡片面板一', content: longText } as UTSJSONObject,
  { label: '卡片面板二', content: longText } as UTSJSONObject,
  { label: '卡片停用', content: longText, disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const cardValue = [0] as number[]

const disabledItems = [
  { label: '可展开面板', content: longText } as UTSJSONObject,
  { label: '停用面板', content: longText, disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const modelValue = ref([0] as number[])

function onBaseChange(values: number[]) : void {
  console.log('onBaseChange')
}

function onActionChange(values: number[]) : void {
  console.log('onActionChange')
}

function onAccordionChange(values: number[]) : void {
  console.log('onAccordionChange')
}

function onDisabledChange(values: number[]) : void {
  console.log('onDisabledChange')
}

function onCardChange(values: number[]) : void {
  console.log('onCardChange')
}

function onModelChange(values: number[]) : void {
  console.log('onModelChange')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / content / note / icon / disabled |
| value | `number[]` | `[]` | 展开的项下标集合（受控） |
| accordion | `boolean` | `false` | 手风琴：每次只展开一个 |
| theme | `string` | `'default'` | 风格：default 通栏 / card 卡片 |
| expandIcon | `boolean` | `true` | 是否显示展开箭头 |
| disabled | `boolean` | `false` | 整体禁用（项上 disabled 优先） |
| defaultExpandAll | `boolean` | `false` | 首次是否全部展开（未传 value 时生效） |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-collapse/`
- 演示: `#/pages/demo/display/collapse`
