---
title: Guide 引导
demo: pages/demo/feedback/guide
---

# Guide 引导

`ms-guide` 是分步引导组件，逐步高亮页面上的目标元素，并在旁边显示带翻页按钮的提示卡。

当前步骤用 `v-model:current` 绑定，值为 `-1` 时不显示。目标元素通过每一步的 `targetId` 指定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-guide
    :steps="steps"
    v-model:current="current"
    :mode="mode"
    :show-overlay="overlay"
    :hide-skip="hideSkip"
    :hide-counter="hideCounter"
    :hide-back="hideBack"
    :highlight-padding="highlightPad"
    @finish="onFinish"
    @skip="onSkip"
  />
</template>

<script setup lang="uts">
type Mode = 'popover' | 'dialog'

const current = ref(-1)

const hideBack = ref(false)

const hideCounter = ref(false)

const hideSkip = ref(false)

const highlightPad = ref(8)

const mode = ref('popover' as Mode)

const overlay = ref(true)

const steps = ref(oneStep)

function onFinish() : void {
  console.log('onFinish')
}

function onSkip() : void {
  console.log('onSkip')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | 引导步骤，每项含 `targetId`、`title` 和 `content` |
| current | `number` | `-1` | 当前步骤的下标，`-1` 表示不显示，可用 `v-model:current` |
| mode | `'popover' \| 'dialog'` | `'popover'` | 提示卡位置：`popover` 贴着目标，`dialog` 在屏幕中间 |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| highlightPadding | `number` | `8` | 高亮框相对目标的内边距（px） |
| hideSkip | `boolean` | `false` | 是否隐藏「跳过」 |
| hideCounter | `boolean` | `false` | 是否隐藏步数计数 |
| hideBack | `boolean` | `false` | 是否隐藏「上一步」 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: number` | 点击上一步或下一步后触发，`index` 是切换到的步骤下标 |
| skip | `index: number` | 点击跳过时触发，`index` 是跳过时所在的步骤下标 |
| finish | — | 在最后一步点击完成时触发 |
| update:current | `value: number` | 当前步骤变化时触发，跳过或完成后值为 `-1`，用于 `v-model:current` |
