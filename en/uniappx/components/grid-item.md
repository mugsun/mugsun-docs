---
title: Grid Item
demo: pages/demo/nav/grid
---

# Grid Item

`ms-grid-item` is an item inside [`ms-grid`](./grid), made of an icon, a text label and an optional second line.

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
| icon | `string` | `'apps-line'` | Icon name (icons.uts) |
| text | `string` | `''` | Text below the icon |
| description | `string` | `''` | Secondary text under the icon |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the item is tapped; not fired while disabled |
