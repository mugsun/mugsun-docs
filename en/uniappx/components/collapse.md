---
title: Collapse
demo: pages/demo/display/collapse
---

# Collapse

`ms-collapse` — Collapse for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-collapse`).
Demo route: `#/pages/demo/display/collapse`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/collapse.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-collapse
    :items="baseItems"
    :value="baseValue"
    @change="onBaseChange"
  />
  <ms-collapse
    :items="actionItems"
    @change="onActionChange"
  />
  <ms-collapse
    :items="accordionItems"
    :value="accordionValue"
    accordion
    @change="onAccordionChange"
  />
  <ms-collapse
    :items="disabledItems"
    @change="onDisabledChange"
  />
  <!-- 样式 -->
  <ms-collapse
    :items="cardItems"
    :value="cardValue"
    theme="card"
    @change="onCardChange"
  />
  <ms-collapse :items="baseItems" :expand-icon="false" />
  <ms-collapse :items="accordionItems" :default-expand-all="true" />
  <ms-collapse
    v-model:value="modelValue"
    :items="baseItems"
    @change="onModelChange"
  />
</template>

<script setup lang="uts">
const modelValue = ref([0] as number[])
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Each item: label / content / note / icon / disabled |
| value | `number[]` | `[]` | Set of expanded item indexes (controlled) |
| accordion | `boolean` | `false` | Accordion: only one panel open at a time |
| theme | `string` | `'default'` | Style: default full-bleed / card |
| expandIcon | `boolean` | `true` | Whether to show the expand arrow |
| disabled | `boolean` | `false` | Disable the whole group (per-item disabled wins) |
| defaultExpandAll | `boolean` | `false` | Whether to expand all on first render (when value is omitted) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-collapse/`
- Demo: `#/pages/demo/display/collapse`
- Chinese docs: [/uniappx/components/collapse](/uniappx/components/collapse)
