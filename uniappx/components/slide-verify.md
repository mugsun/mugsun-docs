---
title: Slide Verify 滑块验证
demo: pages/demo/form/slide-verify
---

# Slide Verify 滑块验证

`ms-slide-verify`：滑动验证：拖拇指到终点或目标虚框完成验证。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-slide-verify`）。
演示路由：`#/pages/demo/form/slide-verify`。

## 基础用法

```vue
<template>
  <ms-slide-verify :disabled="true">
    …
  </ms-slide-verify>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | — |
| successTips | `string` | `'验证成功'` | — |
| showTarget | `boolean` | `false` | — |
| targetPercent | `number` | `100` | 目标位置 0~100 |
| tolerance | `number` | `8` | — |
| disabled | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| success | success |
| fail | fail |
| complete | complete |
| reset | 重置 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-slide-verify/`
- 演示：`#/pages/demo/form/slide-verify`
