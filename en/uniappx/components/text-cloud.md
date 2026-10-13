---
title: Text Cloud
demo: pages/demo/display/text-cloud
---

# Text Cloud

`ms-text-cloud` — Text Cloud for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-text-cloud`).
Demo route: `#/pages/demo/display/text-cloud`.

## Basic usage

```vue
<template>
  <ms-text-cloud>
    …
  </ms-text-cloud>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| height | `number` | `180` | Height (px) |
| minFontSize | `number` | `12` | Word-cloud min font size (px) |
| maxFontSize | `number` | `30` | Word-cloud max font size (px) |
| gap | `number` | `2` | Gap (px) |

## Events

| Event | Description |
| --- | --- |
| complete | complete |

## See also

- Component: `uni_modules/ms-ui/components/ms-text-cloud/`
- Demo: `#/pages/demo/display/text-cloud`
- Chinese docs: [/uniappx/components/text-cloud](/uniappx/components/text-cloud)
