---
title: Guide
demo: pages/demo/feedback/guide
---

# Guide

`ms-guide` is a step-by-step tour. It highlights target elements on the page one at a time and shows a tip card with navigation buttons next to each.

Bind the current step with `v-model:current`; `-1` hides the tour. Each step names its target through `targetId`.

## Basic usage

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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | Tour steps, each with `targetId`, `title` and `content` |
| current | `number` | `-1` | Index of the current step; `-1` hides the tour. Works with `v-model:current` |
| mode | `'popover' \| 'dialog'` | `'popover'` | Tip card placement: `popover` next to the target, `dialog` centered on screen |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| highlightPadding | `number` | `8` | Highlight padding relative to the target (px) |
| hideSkip | `boolean` | `false` | Whether to hide “Skip” |
| hideCounter | `boolean` | `false` | Whether to hide the step counter |
| hideBack | `boolean` | `false` | Whether to hide “Previous” |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: number` | Fires after Previous or Next is tapped; `index` is the step switched to |
| skip | `index: number` | Fires when Skip is tapped; `index` is the step the user was on |
| finish | — | Fires when Done is tapped on the last step |
| update:current | `value: number` | Fires when the current step changes, with `-1` after skip or finish; used by `v-model:current` |
