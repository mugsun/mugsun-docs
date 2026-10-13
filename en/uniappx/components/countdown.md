---
title: Countdown
demo: pages/demo/display/countdown
---

# Countdown

`ms-countdown` — Countdown for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-countdown` (commercial edition; source not public).
Demo route: `#/pages/demo/display/countdown`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/countdown.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| time | `number` | `0` | Time |
| format | `string` | `'HH:mm:ss'` | Format |
| autoStart | `boolean` | `true` | Whether to auto-start |
| millisecond | `boolean` | `false` | Whether to refresh every 100ms (show milliseconds) |
| theme | `'default' \| 'round' \| 'square'` | `'default'` | Theme color |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| splitWithUnit | `boolean` | `false` | Whether to show unit labels at separators (otherwise :) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| finish | Finished |
| start | Started |
| pause | Paused |

## See also

- Component: `uni_modules/ms-ui/components/ms-countdown/`
- Demo: `#/pages/demo/display/countdown`
- Chinese docs: [/uniappx/components/countdown](/uniappx/components/countdown)
