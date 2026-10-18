---
title: Guide 引导
demo: pages/demo/feedback/guide
---

# Guide 引导

`ms-guide` 是分步引导组件，高亮目标元素并显示提示卡，提示卡包含上一步、下一步、跳过、完成按钮和步骤计数。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-guide`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/feedback/guide`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/guide.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | 引导步骤（title/content/targetId 等） |
| current | `number` | `-1` | 当前步索引；-1 表示未开始 |
| mode | `'popover' \| 'dialog'` | `'popover'` | 模式 |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| highlightPadding | `number` | `8` | 高亮框相对目标的内边距（px） |
| hideSkip | `boolean` | `false` | 是否隐藏「跳过」 |
| hideCounter | `boolean` | `false` | 是否隐藏步数计数 |
| hideBack | `boolean` | `false` | 是否隐藏「上一步」 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| skip | 跳过 |
| finish | 完成 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-guide/`
- 演示: `#/pages/demo/feedback/guide`
