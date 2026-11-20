---
title: Countdown 倒计时
demo: pages/demo/display/countdown
---

# Countdown 倒计时

`ms-countdown` 是倒计时，`time` 是总时长（毫秒），`format` 决定显示哪些时间单位。

默认挂载后自动开始，也可以通过方法手动开始、暂停和重置。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| time | `number` | `0` | 倒计时总时长（毫秒） |
| format | `string` | `'HH:mm:ss'` | 显示格式，可用占位符 DD / HH / mm / ss / SSS |
| autoStart | `boolean` | `true` | 是否自动开始 |
| millisecond | `boolean` | `false` | 是否按 100ms 刷新（显示毫秒） |
| theme | `'default' \| 'round' \| 'square'` | `'default'` | 样式：default / round / square |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| splitWithUnit | `boolean` | `false` | 分隔符是否改用时间单位文字，默认用冒号 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `left: number` | 剩余时间变化时触发，`left` 是剩余的毫秒数 |
| finish | — | 倒计时结束时触发 |
| start | — | 开始计时时触发 |
| pause | — | 暂停时触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `start()` | 开始或继续计时；已经结束时从头开始 |
| `pause()` | 暂停计时 |
| `reset()` | 重置为 `time`；`autoStart` 为 `true` 时随即重新开始 |
| `getStatus(): string` | 返回当前状态：`initial`、`running`、`paused` 或 `finished` |
