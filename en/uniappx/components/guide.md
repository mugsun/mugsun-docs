---
title: Guide
demo: pages/demo/feedback/guide
---

# Guide

`ms-guide` is a step-by-step tour. It highlights a target and shows a tip card with Previous, Next, Skip and Done buttons and a step counter.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-guide`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/guide`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/guide.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | Guide steps (title/content/targetId, etc.) |
| current | `number` | `-1` | Current step index; -1 = not started |
| mode | `'popover' \| 'dialog'` | `'popover'` | Mode |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| highlightPadding | `number` | `8` | Highlight padding relative to the target (px) |
| hideSkip | `boolean` | `false` | Whether to hide “Skip” |
| hideCounter | `boolean` | `false` | Whether to hide the step counter |
| hideBack | `boolean` | `false` | Whether to hide “Previous” |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| skip | Skipped |
| finish | Finished |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-guide/`
- Demo: `#/pages/demo/feedback/guide`
- Chinese docs: [/uniappx/components/guide](/uniappx/components/guide)
