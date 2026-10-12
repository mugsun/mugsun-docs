---
title: Text Cloud
demo: pages/demo/display/text-cloud
---

# Text Cloud

`ms-text-cloud`: Text Cloud. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-text-cloud`).
Demo route: `#/pages/demo/display/text-cloud`.

## Basic usage

```vue
<template>
  <ms-text-cloud>
    …
  </ms-text-cloud>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| height | `number` | `180` | — |
| minFontSize | `number` | `12` | — |
| maxFontSize | `number` | `30` | — |
| gap | `number` | `2` | — |

## Events

| Event | Description |
| --- | --- |
| complete | complete |

## See also

- Component: `uni_modules/ms-ui/components/ms-text-cloud/`
- Demo: `#/pages/demo/display/text-cloud`
- Chinese docs: [/uniappx/components/text-cloud](/uniappx/components/text-cloud)
