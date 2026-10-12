---
title: Rolling Number 翻滚数字
demo: pages/demo/display/rolling-number
---

# Rolling Number 翻滚数字

`ms-rolling-number`：数值翻滚展示。`value` 变化时从当前值插值到目标值。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-rolling-number`）。
演示路由：`#/pages/demo/display/rolling-number`。

## 基础用法

```vue
<template>
  <ms-rolling-number size="md">
    …
  </ms-rolling-number>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 当前值 |
| start | `number` | `0` | 起始值 |
| duration | `number` | `400` | 时长（ms） |
| decimals | `number` | `-1` | 小数位数 |
| grouping | `boolean` | `false` | 是否分组 |
| prefix | `string` | `''` | 前缀 |
| suffix | `string` | `''` | 后缀 |
| animated | `boolean` | `true` | 是否开启动画 |
| size | `'md' \| 'lg'` | `'md'` | 尺寸 |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| complete | complete |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-rolling-number/`
- 演示: `#/pages/demo/display/rolling-number`
