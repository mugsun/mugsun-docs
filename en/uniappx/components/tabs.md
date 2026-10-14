---
title: Tabs
demo: pages/demo/nav/tabs
---

# Tabs

`ms-tabs` provides tabs in line, tag and card styles. Tabs can share the width evenly or scroll horizontally, and support badges and a content area.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-tabs`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/nav/tabs`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/tabs.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-tabs
    :items="baseItems"
    :value="baseIndex"
    @change="onBaseChange"
  />
  <ms-tabs
    :items="scrollItems"
    :value="scrollIndex"
    :space-evenly="false"
    @change="onScrollChange"
  />
  <ms-tabs
    :items="iconItems"
    :value="iconIndex"
    @change="onIconChange"
  />
  <ms-tabs
    :items="statusItems"
    :value="statusIndex"
    @change="onStatusChange"
  />
  <ms-tabs :items="themeItems" :value="mdIndex" size="md" @change="onMdChange" />
  <ms-tabs
    :items="themeItems"
    :value="lgIndex"
    size="lg"
    @change="onLgChange"
  />
  <ms-tabs
    :items="themeItems"
    :value="tagIndex"
    theme="tag"
    @change="onTagChange"
  />
</template>

<script setup lang="uts">
const baseIndex = ref(0)

const baseItems = [
  { label: 'Option 1' } as UTSJSONObject,
  { label: 'Option 2' } as UTSJSONObject,
  { label: 'Option 3' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { label: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { label: 'Discover', icon: 'search-line' } as UTSJSONObject,
  { label: 'Me', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const lgIndex = ref(0)

const mdIndex = ref(0)

const scrollIndex = ref(0)

const scrollItems = [
  { label: 'For you' } as UTSJSONObject,
  { label: 'Popular' } as UTSJSONObject,
  { label: 'New' } as UTSJSONObject,
  { label: 'Apparel' } as UTSJSONObject,
  { label: 'Digital' } as UTSJSONObject,
  { label: 'Appliances' } as UTSJSONObject,
  { label: 'Beauty' } as UTSJSONObject,
  { label: 'More' } as UTSJSONObject,
] as UTSJSONObject[]

const statusIndex = ref(0)

const statusItems = [
  { label: 'Enabled 1' } as UTSJSONObject,
  { label: 'Enabled 2' } as UTSJSONObject,
  { label: 'Disabled', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const tagIndex = ref(0)

const themeItems = [
  { label: 'Option 1' } as UTSJSONObject,
  { label: 'Option 2' } as UTSJSONObject,
  { label: 'Option 3' } as UTSJSONObject,
  { label: 'Option 4' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onScrollChange(index: number) : void {
  console.log('onScrollChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onStatusChange(index: number) : void {
  console.log('onStatusChange')
}

function onMdChange(index: number) : void {
  console.log('onMdChange')
}

function onLgChange(index: number) : void {
  console.log('onLgChange')
}

function onTagChange(index: number) : void {
  console.log('onTagChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| items | `UTSJSONObject[]` | `[]` | Each item: label / icon / count / badge / dot / disabled / content |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | Theme color |
| size | `'md' \| 'lg'` | `'md'` | Size |
| spaceEvenly | `boolean` | `true` | Equal-width header; false = content width + horizontal scroll |
| showLine | `boolean` | `true` | Whether the line theme shows the bottom active bar |
| showContent | `boolean` | `false` | Whether to render content (items[].content or default slot) |

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

- Component: `uni_modules/ms-ui/components/ms-tabs/`
- Demo: `#/pages/demo/nav/tabs`
- Chinese docs: [/uniappx/components/tabs](/uniappx/components/tabs)
