---
title: Slide Verify 滑块验证
demo: pages/demo/form/slide-verify
---

# Slide Verify 滑块验证

`ms-slide-verify`：滑动验证：拖拇指到终点或目标虚框完成验证。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-slide-verify`）。
演示路由：`#/pages/demo/form/slide-verify`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/slide-verify.uvue`，可在右侧手机框中查看运行效果。

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
const targetRef = ref<MsSlideVerifyComponentPublicInstance | null>(null)
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | 提示文案 |
| successTips | `string` | `'验证成功'` | 验证成功文案 |
| showTarget | `boolean` | `false` | 是否显示目标缺口位置 |
| targetPercent | `number` | `100` | 目标位置 0~100 |
| tolerance | `number` | `8` | 滑块与目标允许误差（px） |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| success | success |
| fail | fail |
| complete | complete |
| reset | 重置 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-slide-verify/`
- 演示: `#/pages/demo/form/slide-verify`
