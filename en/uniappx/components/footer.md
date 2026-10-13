---
title: Footer
demo: pages/demo/nav/footer
---

# Footer

`ms-footer` — Footer for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-footer`).
Demo route: `#/pages/demo/nav/footer`.

## Basic usage

```vue
<template>
  <ms-footer text="…">
    …
  </ms-footer>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `''` | Display text |
| links | `UTSJSONObject[]` | `[]` | Footer link list (name, etc.) |
| logoTitle | `string` | `''` | Title next to the logo |
| logoIcon | `string` | `''` | Logo icon name |
| logoWithInfo | `boolean` | `false` | In logo mode, whether to still show links and copyright |

## Events

| Event | Description |
| --- | --- |
| link | Link click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-footer/`
- Demo: `#/pages/demo/nav/footer`
- Chinese docs: [/uniappx/components/footer](/uniappx/components/footer)
