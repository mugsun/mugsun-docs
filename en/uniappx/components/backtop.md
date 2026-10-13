---
title: Backtop
demo: pages/demo/nav/backtop
---

# Backtop

`ms-backtop` — Backtop for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-backtop` (repository not yet public).
Demo route: `#/pages/demo/nav/backtop`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/backtop.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 主题样式 -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
    text="顶部"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="half-round"
    text="返回"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round-dark"
  />
  <!-- 内容 -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
  />
  <!-- 局部滚动 -->
  <ms-backtop
    :scroll-top="localScrollY"
    :visibility-height="40"
    local
    theme="round-dark"
    @to-top="onLocalToTop"
  />
</template>

<script setup lang="uts">
const localScrollY = ref(0)

function onLocalToTop() : void {
  console.log('onLocalToTop')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | Page scroll distance (px) |
| visibilityHeight | `number` | `200` | Show only after scrolling past this distance (px) |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | Theme color |
| text | `string` | `''` | Display text |
| icon | `string` | `'skip-up-fill'` | Icon name (icons.uts) |
| fixed | `boolean` | `true` | Whether fixed positioned |
| local | `boolean` | `false` | Whether positioned relative to parent (not fixed) |

## Events

| Event | Description |
| --- | --- |
| to-top | to-top |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-backtop/`
- Demo: `#/pages/demo/nav/backtop`
- Chinese docs: [/uniappx/components/backtop](/uniappx/components/backtop)
