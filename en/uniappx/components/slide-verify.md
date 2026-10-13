---
title: Slide Verify
demo: pages/demo/form/slide-verify
---

# Slide Verify

`ms-slide-verify` — Slide Verify for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-slide-verify` (repository not yet public).
Demo route: `#/pages/demo/form/slide-verify`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/slide-verify.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-slide-verify @success="onDefaultSuccess" @fail="onDefaultFail" />
  <ms-slide-verify
    ref="targetRef"
    :show-target="true"
    :target-percent="targetPercent"
    @success="onTargetSuccess"
    @fail="onTargetFail"
  />
  <!-- 组件深度 -->
  <ms-slide-verify
    tips="按住拖到最右"
    success-tips="校验通过"
    @success="onTipsSuccess"
  />
  <ms-slide-verify disabled tips="已禁用" />
  <ms-slide-verify :tolerance="24" tips="容差更大更易过" @success="onLooseSuccess" />
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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | Tip text |
| successTips | `string` | `'验证成功'` | Verification success text |
| showTarget | `boolean` | `false` | Whether to show the target gap position |
| targetPercent | `number` | `100` | Target position 0–100 |
| tolerance | `number` | `8` | Allowed slider-to-target error (px) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| success | success |
| fail | fail |
| complete | complete |
| reset | Reset |

## See also

- Component: `uni_modules/ms-ui/components/ms-slide-verify/`
- Demo: `#/pages/demo/form/slide-verify`
- Chinese docs: [/uniappx/components/slide-verify](/uniappx/components/slide-verify)
