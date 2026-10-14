---
title: Countdown 倒计时
demo: pages/demo/display/countdown
---

# Countdown 倒计时

`ms-countdown` 是倒计时，通过 `time`（毫秒）和 `format` 设置，支持 theme 和 size，并对外提供 `start`、`pause`、`reset` 和 `getStatus` 方法。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-countdown`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/countdown`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/countdown.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-countdown :time="demoTime" />
  <ms-countdown :time="demoTime" format="HH:mm:ss:SSS" millisecond />
  <ms-countdown :time="demoTime" theme="square" />
  <!-- 组件尺寸 -->
  <ms-countdown :time="demoTime" size="sm" theme="square" />
  <ms-countdown :time="demoTime" size="md" theme="square" />
  <ms-countdown :time="demoTime" size="lg" theme="square" />
  <!-- 组件深度 -->
  <ms-countdown :time="90000" format="mm:ss" />
  <ms-countdown ref="finishCountdown" :time="5000" format="ss" @finish="onFinish" />
  <ms-countdown
    ref="ctrlCountdown"
    :time="120000"
    format="mm:ss"
    :auto-start="false"
    theme="square"
  />
</template>

<script setup lang="uts">
const demoTime = 5760000

function onFinish() : void {
  console.log('onFinish')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
