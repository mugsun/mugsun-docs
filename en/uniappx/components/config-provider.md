---
title: Config Provider
demo: pages/demo/basic/config-provider
---

# Config Provider

`ms-config-provider` is a scoped theme container that only affects the content it wraps. Use `themeVars` to override CSS variables inside it, or switch that section to dark mode.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-config-provider :theme-vars="greenVars" @change="onChange">
    <ms-button theme="primary" block>Button inside provider</ms-button>
  </ms-config-provider>
  <ms-config-provider theme="dark">
    <view>
      <text>Text inside dark section</text>
      <ms-button theme="primary" block>Dark button</ms-button>
    </view>
  </ms-config-provider>
  <!-- Styles -->
  <ms-config-provider :theme-vars="orangeVars">
    <ms-button theme="primary" block>Orange primary</ms-button>
  </ms-config-provider>
  <ms-config-provider :theme-vars="textVars">
    <ms-cell title="Title text" note="Description text" />
  </ms-config-provider>
  <!-- Advanced -->
  <ms-config-provider :theme-vars="pinkVars" :block="false">
    <ms-button theme="primary" size="sm">Inline button</ms-button>
  </ms-config-provider>
  <ms-config-provider theme="dark" :theme-vars="darkPrimaryVars">
    <view>
      <text>Dark + custom primary</text>
      <ms-button theme="primary" block>Dark recolored button</ms-button>
    </view>
  </ms-config-provider>
  <ms-config-provider :theme-vars="greenVars">
    <ms-button theme="primary" block>Outer primary</ms-button>
    <view>
      <ms-config-provider :theme-vars="orangeVars">
        <ms-button theme="primary" block>Inner override</ms-button>
      </ms-config-provider>
    </view>
  </ms-config-provider>
</template>

<script setup lang="uts">
const darkPrimaryVars = ref(vars('#38bdf8'))

const greenVars = ref(vars('#0d9488'))

const orangeVars = ref(vars('#ea580c'))

const pinkVars = ref(vars('#db2777'))

const textVars = ref(new UTSJSONObject())

function onChange(payload: UTSJSONObject) : void {
  console.log('onChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | CSS variables to override; keys starting with `--` are used as is, others get the `--ms-` prefix |
| theme | `string` | `'light'` | Theme: light / dark |
| block | `boolean` | `true` | Whether to take the full width |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `payload: UTSJSONObject` | Fires on mount and whenever the theme or variables change; `payload` has `count` (number of applied variables) and `theme` |

## Slots

| Slot | Description |
| --- | --- |
| default | Content the theme applies to |
