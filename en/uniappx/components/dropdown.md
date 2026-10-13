---
title: Dropdown
demo: pages/demo/nav/dropdown
---

# Dropdown

`ms-dropdown` — Dropdown for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-dropdown` (repository not yet public).
Demo route: `#/pages/demo/nav/dropdown`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/dropdown.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-dropdown
    :menus="singleMenus"
    :options="singleOptions"
    :height="300"
    @change="onSingleChange"
  />
  <ms-dropdown
    :menus="multiMenus"
    :options="multiOptions"
    :height="320"
    @change="onMultiChange"
    @reset="onMultiReset"
  />
  <ms-dropdown
    :menus="disabledMenus"
    :options="disabledOptions"
    :height="260"
    @change="onDisabledChange"
  />
  <ms-dropdown
    :menus="columnMenus"
    :options="columnOptions"
    :height="320"
    @change="onColumnChange"
  />
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
