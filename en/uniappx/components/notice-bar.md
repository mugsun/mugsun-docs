---
title: Notice Bar
demo: pages/demo/feedback/notice-bar
---

# Notice Bar

`ms-notice-bar` — Notice Bar for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-notice-bar`).
Demo route: `#/pages/demo/feedback/notice-bar`.

## Basic usage

```vue
<template>
  <ms-notice-bar theme="default">
    …
  </ms-notice-bar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Theme |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| content | `string` | `''` | Content text |
| list | `string[]` | `[]` | Data list |
| closable | `boolean` | `false` | Whether closable |
| icon | `string` | `'megaphone-line'` | Icon name (icons.uts) |
| showIcon | `boolean` | `true` | Whether to show the left icon; also hidden when icon is empty |
| operation | `string` | `''` | Right action label |
| suffixIcon | `string` | `''` | Right suffix icon; closable wins if both set |
| interval | `number` | `3000` | Vertical autoplay interval (ms) |

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
