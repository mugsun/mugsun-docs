---
title: Notice Bar
demo: pages/demo/feedback/notice-bar
---

# Notice Bar

`ms-notice-bar`: Notice Bar. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-notice-bar`).
Demo route: `#/pages/demo/feedback/notice-bar`.

## Basic usage

```vue
<template>
  <ms-notice-bar theme="default">
    …
  </ms-notice-bar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | — |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | — |
| content | `string` | `''` | — |
| list | `string[]` | `[]` | — |
| closable | `boolean` | `false` | — |
| icon | `string` | `'megaphone-line'` | — |
| showIcon | `boolean` | `true` | 是否显示左侧图标；icon 为空时也隐藏 |
| operation | `string` | `''` | 右侧操作文案 |
| suffixIcon | `string` | `''` | 右侧后缀图标（如箭头）；与 closable 互斥时优先 closable |
| interval | `number` | `3000` | 竖向轮播间隔（ms） |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| operation | operation |

## See also

- Component: `uni_modules/ms-ui/components/ms-notice-bar/`
- Demo: `#/pages/demo/feedback/notice-bar`
- Chinese docs: [/uniappx/components/notice-bar](/uniappx/components/notice-bar)
