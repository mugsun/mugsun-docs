---
title: Indexbar
demo: pages/demo/nav/indexbar
---

# Indexbar

`ms-indexbar` — Indexbar for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-indexbar`).
Demo route: `#/pages/demo/nav/indexbar`.

## Basic usage

```vue
<template>
  <ms-indexbar>
    …
  </ms-indexbar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Flat rows: { index, label, disabled }; same index = one group |
| current | `string` | `''` | Active index char; empty uses the first group |
| indexList | `UTSJSONObject[]` | `[]` | Index chars: { key, label }; empty = derived from items |
| height | `number` | `360` | Container height (px; vapor forbids %) |
| showTip | `boolean` | `true` | Show large bubble while dragging the index bar |
| showAnchor | `boolean` | `true` | Whether to render group headers |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| select | select |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-indexbar/`
- Demo: `#/pages/demo/nav/indexbar`
- Chinese docs: [/uniappx/components/indexbar](/uniappx/components/indexbar)
