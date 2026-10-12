---
title: Result
demo: pages/demo/display/result
---

# Result

`ms-result` — Result for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-result`).
Demo route: `#/pages/demo/display/result`.

## Basic usage

```vue
<template>
  <ms-result theme="default" title="…">
    …
  </ms-result>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Theme color |
| title | `string` | `''` | Title |
| description | `string` | `''` | Description text |
| icon | `string` | `''` | Override theme icon; 'none' hides the icon |
| image | `string` | `''` | Image URL; takes priority over icon when set |
| showActions | `boolean` | `false` | Whether to render the action area (default slot) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| description | `description` slot |
| title | `title` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-result/`
- Demo: `#/pages/demo/display/result`
- Chinese docs: [/uniappx/components/result](/uniappx/components/result)
