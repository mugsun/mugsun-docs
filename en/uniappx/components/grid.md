---
title: Grid
demo: pages/demo/nav/grid
---

# Grid

`ms-grid` is a grid container whose items are `ms-grid-item`. The container supports `column`, `border` and `theme`; items support `icon`, `text`, `description` and `disabled`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-grid`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/nav/grid`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/grid.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Columns -->
  <ms-grid :column="3">
    <ms-grid-item icon="home-3-line" text="Home" />
    <ms-grid-item icon="search-line" text="Search" />
    <ms-grid-item icon="settings-3-line" text="Settings" />
  </ms-grid>
  <ms-grid :column="4">
    <ms-grid-item icon="home-3-line" text="Home" />
    <ms-grid-item icon="search-line" text="Search" />
    <ms-grid-item icon="notification-line" text="Messages" />
    <ms-grid-item icon="settings-3-line" text="Settings" />
  </ms-grid>
  <ms-grid :column="5">
    <ms-grid-item icon="home-3-line" text="One" />
    <ms-grid-item icon="search-line" text="Two" />
    <ms-grid-item icon="apps-line" text="Three" />
    <ms-grid-item icon="image-line" text="Four" />
    <ms-grid-item icon="settings-3-line" text="Five" />
  </ms-grid>
  <!-- Border -->
  <ms-grid :column="3" border>
    <ms-grid-item icon="home-3-line" text="Home" />
    <ms-grid-item icon="search-line" text="Search" />
    <ms-grid-item icon="settings-3-line" text="Settings" />
  </ms-grid>
  <!-- Card style -->
  <ms-grid :column="4" theme="card">
    <ms-grid-item icon="home-3-line" text="Home" />
    <ms-grid-item icon="search-line" text="Search" />
    <ms-grid-item icon="notification-line" text="Messages" />
    <ms-grid-item icon="settings-3-line" text="Settings" />
  </ms-grid>
  <!-- Advanced -->
  <ms-grid :column="3" border theme="card">
    <ms-grid-item icon="home-3-line" text="Home" />
    <ms-grid-item icon="search-line" text="Search" />
    <ms-grid-item icon="notification-line" text="Messages" />
    <ms-grid-item icon="settings-3-line" text="Settings" />
    <ms-grid-item icon="image-line" text="Album" />
    <ms-grid-item icon="apps-line" text="More" />
  </ms-grid>
  <ms-grid :column="3">
    <ms-grid-item icon="home-3-line" text="Home" description="Quick access" />
    <ms-grid-item icon="search-line" text="Search" description="Global search" />
    <ms-grid-item icon="settings-3-line" text="Settings" description="Preferences" />
  </ms-grid>
  <ms-grid :column="3">
    <ms-grid-item icon="home-3-line" text="Enabled" />
    <ms-grid-item icon="lock-line" text="Disabled" disabled />
    <ms-grid-item icon="apps-line" text="Enabled" />
  </ms-grid>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| column | `3 \| 4 \| 5` | `4` | Column count |
| border | `boolean` | `false` | Whether to show border |
| theme | `'default' \| 'card'` | `'default'` | Theme color |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-grid/`
- Demo: `#/pages/demo/nav/grid`
- Chinese docs: [/uniappx/components/grid](/uniappx/components/grid)
