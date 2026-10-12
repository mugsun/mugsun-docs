---
title: Countdown 倒计时
demo: pages/demo/display/countdown
---

# Countdown 倒计时

`ms-countdown`：倒计时：`time`（ms）+ `format` + theme/size；expose `start`/`pause`/`reset`/`getStatus`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-countdown`）。
演示路由：`#/pages/demo/display/countdown`。

## 基础用法

```vue
<template>
  <ms-countdown theme="default" size="sm">
    …
  </ms-countdown>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| time | `number` | `0` | — |
| format | `string` | `'HH:mm:ss'` | — |
| autoStart | `boolean` | `true` | — |
| millisecond | `boolean` | `false` | — |
| theme | `'default' \| 'round' \| 'square'` | `'default'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| splitWithUnit | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| finish | 完成 |
| start | 开始 |
| pause | 暂停 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-countdown/`
- 演示：`#/pages/demo/display/countdown`
