---
title: Sidebar
demo: pages/demo/nav/sidebar
---

# Sidebar

`ms-sidebar` — Sidebar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sidebar`).
Demo route: `#/pages/demo/nav/sidebar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/sidebar.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-sidebar
    :items="baseItems"
    :value="baseIndex"
    :height="280"
    @change="onBaseChange"
  >
    <text>{{ baseTitle }}</text>
    <text>{{ baseBody }}</text>
  </ms-sidebar>
  <ms-sidebar
    :items="iconItems"
    :value="iconIndex"
    :height="240"
    @change="onIconChange"
  >
    <text>{{ iconTitle }}</text>
    <text>带图标侧边导航内容区</text>
  </ms-sidebar>
  <ms-sidebar
    :items="badgeItems"
    :value="badgeIndex"
    :height="240"
    @change="onBadgeChange"
  >
    <text>{{ badgeTitle }}</text>
    <text>徽标用于未读提示</text>
  </ms-sidebar>
  <ms-sidebar
    :items="disabledItems"
    :value="disabledIndex"
    :height="240"
    @change="onDisabledChange"
  >
    <text>{{ disabledTitle }}</text>
    <text>禁用项不可点选</text>
  </ms-sidebar>
</template>

<script setup lang="uts">
const baseIndex = ref(0)
const iconIndex = ref(0)
const badgeIndex = ref(0)
const disabledIndex = ref(0)
const baseTitle = computed((): string => {
const baseBody = computed((): string => {
const iconTitle = computed((): string => {
const badgeTitle = computed((): string => {
const disabledTitle = computed((): string => {
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| items | `UTSJSONObject[]` | `[]` | Each item: label / icon / count / badge / dot / disabled |
| height | `number` | `320` | Sidebar total height (px; vapor forbids % height) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sidebar/`
- Demo: `#/pages/demo/nav/sidebar`
- Chinese docs: [/uniappx/components/sidebar](/uniappx/components/sidebar)
