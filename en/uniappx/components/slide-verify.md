---
title: Slide Verify
demo: pages/demo/form/slide-verify
---

# Slide Verify

`ms-slide-verify` is a slide verification control. Drag the handle to the end or into the dashed target box to pass.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-slide-verify @success="onDefaultSuccess" @fail="onDefaultFail" />
  <ms-slide-verify
    ref="targetRef"
    :show-target="true"
    :target-percent="targetPercent"
    @success="onTargetSuccess"
    @fail="onTargetFail"
  />
  <!-- Advanced -->
  <ms-slide-verify
    tips="Hold and drag to the far right"
    success-tips="Verified"
    @success="onTipsSuccess"
  />
  <ms-slide-verify disabled tips="Disabled" />
  <ms-slide-verify :tolerance="24" tips="Larger tolerance, easier to pass" @success="onLooseSuccess" />
</template>

<script setup lang="uts">
const targetPercent = ref(55)

function onDefaultSuccess() : void {
  console.log('onDefaultSuccess')
}

function onDefaultFail() : void {
  console.log('onDefaultFail')
}

function onTargetSuccess() : void {
  console.log('onTargetSuccess')
}

function onTargetFail() : void {
  console.log('onTargetFail')
}

function onTipsSuccess() : void {
  console.log('onTipsSuccess')
}

function onLooseSuccess() : void {
  console.log('onLooseSuccess')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | Hint text; the default is Chinese for "Drag the slider to verify" |
| successTips | `string` | `'验证成功'` | Text shown after success; the default is Chinese for "Verified" |
| showTarget | `boolean` | `false` | Whether to show the dashed target box; without it the handle must reach the far right |
| targetPercent | `number` | `100` | Position of the target box, from 0 to 100 |
| tolerance | `number` | `8` | Allowed distance between the handle and the target on release (px) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| start | — | Fires when dragging starts |
| success | — | Fires when verification passes |
| fail | — | Fires when verification fails; the handle returns to the start |
| complete | `ok: boolean` | Fires on release; `ok` tells whether it passed |
| reset | — | Fires after `reset()` is called |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `reset()` | Restores the initial, unverified state |
