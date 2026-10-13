---
title: Countdown 倒计时
demo: pages/demo/display/countdown
---

# Countdown 倒计时

`ms-countdown`：倒计时：`time`（ms）+ `format` + theme/size；expose `start`/`pause`/`reset`/`getStatus`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| time | `number` | `0` | 时间 |
| format | `string` | `'HH:mm:ss'` | 格式 |
| autoStart | `boolean` | `true` | 是否自动开始 |
| millisecond | `boolean` | `false` | 是否按 100ms 刷新（显示毫秒） |
| theme | `'default' \| 'round' \| 'square'` | `'default'` | 主题色 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| splitWithUnit | `boolean` | `false` | 分隔处是否显示单位字（否则用 :） |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| finish | 完成 |
| start | 开始 |
| pause | 暂停 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-countdown/`
- 演示: `#/pages/demo/display/countdown`
