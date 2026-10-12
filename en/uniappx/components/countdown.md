---
title: Countdown
demo: pages/demo/display/countdown
---

# Countdown

倒计时：`time`（ms）+ `format` + theme/size；expose `start`/`pause`/`reset`/`getStatus`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-countdown`).
Demo route: `#/pages/demo/display/countdown`.

## Basic usage

```vue
<template>
  <ms-countdown theme="default" size="sm">
    …
  </ms-countdown>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| time | `number` | `0` | — |
| format | `string` | `'HH:mm:ss'` | — |
| autoStart | `boolean` | `true` | — |
| millisecond | `boolean` | `false` | — |
| theme | `'default' \| 'round' \| 'square'` | `'default'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| splitWithUnit | `boolean` | `false` | — |

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
