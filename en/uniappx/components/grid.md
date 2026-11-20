---
title: Grid
demo: pages/demo/nav/grid
---

# Grid

`ms-grid` is a grid container for [`ms-grid-item`](./grid-item) children, with 3, 4 or 5 columns per row.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| column | `3 \| 4 \| 5` | `4` | Columns per row |
| border | `boolean` | `false` | Whether to show border |
| theme | `'default' \| 'card'` | `'default'` | Style: `default` is full-width, `card` is a card |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-grid-item` children here |
