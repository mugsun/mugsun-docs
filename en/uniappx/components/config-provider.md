---
title: Config Provider
demo: pages/demo/basic/config-provider
---

# Config Provider

`ms-config-provider` is a scoped theme container. It writes `themeVars` as inline CSS variables on its subtree, so a whole section can switch to dark mode.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-config-provider`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/config-provider`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/config-provider.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | Local CSS variables (applied to the subtree) |
| theme | `string` | `'light'` | Theme color |
| block | `boolean` | `true` | Whether full-bleed / block |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-config-provider/`
- Demo: `#/pages/demo/basic/config-provider`
- Chinese docs: [/uniappx/components/config-provider](/uniappx/components/config-provider)
