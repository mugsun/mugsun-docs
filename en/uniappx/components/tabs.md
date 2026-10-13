---
title: Tabs
demo: pages/demo/nav/tabs
---

# Tabs

`ms-tabs` — Tabs for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tabs` (repository not yet public).
Demo route: `#/pages/demo/nav/tabs`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/tabs.uvue`; see them running in the phone frame.

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
const scrollIndex = ref(0)
const iconIndex = ref(0)
const statusIndex = ref(0)
const mdIndex = ref(0)
const lgIndex = ref(0)
const tagIndex = ref(0)
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
