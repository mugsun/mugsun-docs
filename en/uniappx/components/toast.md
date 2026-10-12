---
title: Toast
demo: pages/demo/feedback/toast
---

# Toast

`ms-toast`: Toast. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-toast`).
Demo route: `#/pages/demo/feedback/toast`.

## Basic usage

```vue
<template>
  <ms-toast theme="default" v-model:visible="open">
    …
  </ms-toast>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| message | `string` | `''` | — |
| theme | `'default' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'default'` | — |
| icon | `string` | `''` | 自定义图标名（icons.uts 注册名）；theme 自带图标时可省 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | — |
| placement | `'top' \| 'middle' \| 'bottom'` | `'middle'` | — |
| duration | `number` | `2000` | 毫秒；0 表示不自动关闭 |
| showOverlay | `boolean` | `false` | 显示遮罩挡住点击穿透 |
| zIndex | `number` | `1100` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |

## See also

- Component: `uni_modules/ms-ui/components/ms-toast/`
- Demo: `#/pages/demo/feedback/toast`
- Chinese docs: [/uniappx/components/toast](/uniappx/components/toast)
