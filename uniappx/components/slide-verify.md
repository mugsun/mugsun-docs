---
title: Slide Verify 滑块验证
demo: pages/demo/form/slide-verify
---

# Slide Verify 滑块验证

`ms-slide-verify` 是滑动验证，将滑块拖到终点或目标虚线框即可完成验证。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | 提示文字 |
| successTips | `string` | `'验证成功'` | 验证成功后的文字 |
| showTarget | `boolean` | `false` | 是否显示目标虚线框；不显示时需要拖到最右侧 |
| targetPercent | `number` | `100` | 目标框的位置，范围 0–100 |
| tolerance | `number` | `8` | 松手时滑块与目标允许的误差（px） |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| start | — | 开始拖动时触发 |
| success | — | 验证通过时触发 |
| fail | — | 验证未通过时触发，滑块回到起点 |
| complete | `ok: boolean` | 松手后触发，`ok` 表示是否通过 |
| reset | — | 调用 `reset()` 后触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `reset()` | 恢复到未验证的初始状态 |
