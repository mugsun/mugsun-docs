---
title: Pull Refresh
demo: pages/demo/feedback/pull-refresh
---

# Pull Refresh

`ms-pull-refresh` — Pull Refresh for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-pull-refresh`).
Demo route: `#/pages/demo/feedback/pull-refresh`.

## Basic usage

```vue
<template>
  <ms-pull-refresh v-model="value">
    …
  </ms-pull-refresh>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Refreshing; set false when done to collapse |
| disabled | `boolean` | `false` | Disable pull-to-refresh |
| threshold | `number` | `60` | Trigger distance (px); also fixed refresher slot height |
| height | `number` | `360` | Fixed container height (px; vapor forbids %) |
| texts | `UTSJSONObject[]` | `[]` | Override four-state texts: { status, text } |
| successDuration | `number` | `500` | How long (ms) to keep the “refresh done” state |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| refresh | Refresh |
| pulling | pulling |
| restore | restore |
| scrolltolower | Scrolled to lower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| refresher | `refresher` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-pull-refresh/`
- Demo: `#/pages/demo/feedback/pull-refresh`
- Chinese docs: [/uniappx/components/pull-refresh](/uniappx/components/pull-refresh)
