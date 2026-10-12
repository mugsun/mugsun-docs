---
title: Alert
demo: pages/demo/feedback/alert
---

# Alert

`ms-alert`: Alert. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-alert`).
Demo route: `#/pages/demo/feedback/alert`.

## Basic usage

```vue
<template>
  <ms-alert theme="primary" variant="light">
    …
  </ms-alert>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | — |
| variant | `'light' \| 'solid'` | `'light'` | — |
| closable | `boolean` | `true` | — |
| icon | `string` | `''` | — |
| showIcon | `boolean` | `true` | 不显示左侧图标 |
| title | `string` | `''` | 标题（可选，与默认插槽正文并存） |
| visible | `boolean` | `true` | 是否显示；配合 update:visible，关闭后可由宿主重开 |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| update:visible | v-model:visible update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-alert/`
- Demo: `#/pages/demo/feedback/alert`
- Chinese docs: [/uniappx/components/alert](/uniappx/components/alert)
