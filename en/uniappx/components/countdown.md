---
title: Countdown
demo: pages/demo/display/countdown
---

# Countdown

`ms-countdown` is a countdown. `time` is the total duration in milliseconds, and `format` decides which time units are shown.

It starts automatically on mount by default, and can also be started, paused and reset through its methods.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-countdown :time="demoTime" />
  <ms-countdown :time="demoTime" format="HH:mm:ss:SSS" millisecond />
  <ms-countdown :time="demoTime" theme="square" />
  <!-- Sizes -->
  <ms-countdown :time="demoTime" size="sm" theme="square" />
  <ms-countdown :time="demoTime" size="md" theme="square" />
  <ms-countdown :time="demoTime" size="lg" theme="square" />
  <!-- Advanced -->
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| time | `number` | `0` | Total duration (ms) |
| format | `string` | `'HH:mm:ss'` | Display format with the tokens DD / HH / mm / ss / SSS |
| autoStart | `boolean` | `true` | Whether to auto-start |
| millisecond | `boolean` | `false` | Whether to refresh every 100ms (show milliseconds) |
| theme | `'default' \| 'round' \| 'square'` | `'default'` | Style: default / round / square |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| splitWithUnit | `boolean` | `false` | Whether to separate with unit words instead of colons |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `left: number` | Fires whenever the remaining time changes; `left` is the milliseconds remaining |
| finish | — | Fires when the countdown reaches zero |
| start | — | Fires when counting starts |
| pause | — | Fires when counting is paused |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `start()` | Starts or resumes counting; restarts from the full duration if it has finished |
| `pause()` | Pauses counting |
| `reset()` | Resets to `time`; starts again right away when `autoStart` is `true` |
| `getStatus(): string` | Returns the current status: `initial`, `running`, `paused` or `finished` |
