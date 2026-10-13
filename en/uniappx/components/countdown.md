---
title: Countdown
demo: pages/demo/display/countdown
---

# Countdown

`ms-countdown` — Countdown for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-countdown`).
Demo route: `#/pages/demo/display/countdown`.

## Basic usage

```vue
<template>
  <ms-countdown theme="default" size="sm">
    …
  </ms-countdown>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
