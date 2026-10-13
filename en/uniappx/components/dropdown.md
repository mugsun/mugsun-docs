---
title: Dropdown
demo: pages/demo/nav/dropdown
---

# Dropdown

`ms-dropdown` — Dropdown for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-dropdown`).
Demo route: `#/pages/demo/nav/dropdown`.

## Basic usage

```vue
<template>
  <ms-dropdown>
    …
  </ms-dropdown>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| menus | `UTSJSONObject[]` | `[]` | Menus: label / multiple / columns(1-3) / disabled |
| options | `UTSJSONObject[]` | `[]` | Flat options: menu(index) / label / value / disabled / checked |
| height | `number` | `320` | Component height (px; vapor forbids %; overlay fills this area) |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| closeOnClickOverlay | `boolean` | `true` | Whether clicking the overlay closes |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| open | Opened |
| close | Closed |
| confirm | Confirm |
| reset | Reset |

## See also

- Component: `uni_modules/ms-ui/components/ms-dropdown/`
- Demo: `#/pages/demo/nav/dropdown`
- Chinese docs: [/uniappx/components/dropdown](/uniappx/components/dropdown)
