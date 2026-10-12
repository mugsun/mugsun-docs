---
title: Button
demo: pages/demo/basic/button
---

# Button

语义化按钮。`theme` + `variant` + `size` + `block` + `disabled` + `loading` + `loadingText` + `formType` + `ghost` + `icon` / `iconOnly` + `shape` + `haptic`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-button`).
Demo route: `#/pages/demo/basic/button`.

## Basic usage

```vue
<template>
  <ms-button theme="default" variant="solid">
    …
  </ms-button>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | — |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | — |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | — |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | — |
| block | `boolean` | `false` | — |
| ghost | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| loading | `boolean` | `false` | — |
| loadingText | `string` | `'加载中…'` | 加载态文案；空串则只显示转圈 |
| icon | `string` | `''` | — |
| iconOnly | `boolean` | `false` | — |
| formType | `'' \| 'submit' \| 'reset'` | `''` | — |
| haptic | `boolean` | `true` | App/小程序点击短震动；Web 无能力自动跳过。cite: api/vibrate.md |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-button/`
- Demo: `#/pages/demo/basic/button`
- Chinese docs: [/uniappx/components/button](/uniappx/components/button)
