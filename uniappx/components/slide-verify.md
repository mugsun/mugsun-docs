---
title: Slide Verify 滑块验证
demo: pages/demo/form/slide-verify
---

# Slide Verify 滑块验证

`ms-slide-verify`：滑动验证：拖拇指到终点或目标虚框完成验证。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-slide-verify`）。
演示路由：`#/pages/demo/form/slide-verify`。

## 基础用法

```vue
<template>
  <ms-slide-verify>
    …
  </ms-slide-verify>
</template>
```

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
