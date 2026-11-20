---
title: Icon
demo: pages/demo/basic/icon
---

# Icon

`ms-icon` is the icon component. It ships a subset of Remix icons, selected by `name`.

`spin` keeps the icon rotating, which suits loading states; `rotate` sets a fixed rotation angle. When both are set, `spin` wins.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Common -->
  <ms-icon name="search-line" tone="primary" />
  <ms-icon name="add-line" tone="primary" />
  <ms-icon name="home-3-line" tone="primary" />
  <!-- Sizes -->
  <ms-icon name="settings-3-line" size="sm" tone="secondary" />
  <ms-icon name="settings-3-line" size="md" tone="secondary" />
  <ms-icon name="settings-3-line" size="lg" tone="secondary" />
  <!-- Direction -->
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="90" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="180" />
  <!-- Rotation -->
  <ms-icon name="loader-line" size="lg" tone="primary" :spin="true" />
  <ms-icon name="refresh-line" size="lg" tone="secondary" :spin="true" :spin-duration="3000" />
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `string` | `''` | Icon name |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size |
| tone | `'inherit' \| 'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning' \| 'inverse' \| 'on-primary' \| 'on-danger' \| 'on-success' \| 'on-warning' \| 'on-surface'` | `'inherit'` | Color; inherits the parent text color by default |
| spin | `boolean` | `false` | Whether to spin continuously, typically for loading |
| spinDuration | `number` | `1500` | Duration of one turn (ms) |
| rotate | `number` | `0` | Fixed rotation angle; `spin` wins when both are set |
| pressable | `boolean` | `true` | Whether it has a pressed effect; set to `false` inside a button |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the icon is tapped |

## Icon font subset

The font in the package contains only the icons listed in `components/ms-icon/icons.uts`.

An icon name that is not in that list renders blank; when `name` is an image URL, it is shown as an image.

To add an icon:

1. Take the full ttf from `remixicon@4.7.0` (Apache-2.0). The 4.5.x glyphs do not match the icon list and cannot be used.
2. Add the icon to `components/ms-icon/icons.uts`. This list is the single source of truth.
3. Generate a woff2 subset and a ttf subset with `pyftsubset` and put them in `static/fonts`.
4. Rebuild the mini program font with the script described in `uni_modules/ms-ui/styles/FONT-SUBSET.md` inside the package.
5. Open the ms-icon demo page in the App and spot-check common icons.

Android and HarmonyOS use the ttf; iOS and Web use the woff2.

The mini program font file is `remixicon-mp-face.scss`. Do not edit it by hand. The mini program font may embed only the subset, and the script refuses to generate a file larger than 64KB.
