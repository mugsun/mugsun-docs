---
title: Alert
demo: pages/demo/feedback/alert
---

# Alert

`ms-alert` is an in-page alert bar. It supports theme colors, light and filled styles, and can be closed.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-alert`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/alert`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/alert.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Themes -->
  <ms-alert theme="primary" :closable="false">Primary alert</ms-alert>
  <ms-alert theme="info" :closable="false">Info alert</ms-alert>
  <ms-alert theme="success" :closable="false">Success alert</ms-alert>
  <!-- Variants -->
  <ms-alert variant="light" theme="primary" :closable="false">Light</ms-alert>
  <ms-alert variant="solid" theme="primary" :closable="false">Solid</ms-alert>
  <!-- Closable -->
  <ms-alert
    theme="warning"
    :visible="showClosable"
    @update:visible="onClosableVisible"
    @close="onAlertClose"
  >Closable</ms-alert>
  <ms-alert theme="info" :closable="false">Persistent</ms-alert>
  <!-- Icon -->
  <ms-alert theme="primary" icon="information-line" :closable="false">Custom icon</ms-alert>
</template>

<script setup lang="uts">
const showClosable = ref(true)

function onClosableVisible(value: boolean): void {
  showClosable.value = value
}

function onAlertClose() : void {
  console.log('onAlertClose')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Theme color |
| variant | `'light' \| 'solid'` | `'light'` | Style variant |
| closable | `boolean` | `true` | Whether closable |
| icon | `string` | `''` | Icon name (icons.uts) |
| showIcon | `boolean` | `true` | Hide the left icon |
| title | `string` | `''` | Title (optional; can coexist with default slot body) |
| visible | `boolean` | `true` | Whether visible; pairs with update:visible so the parent page can reopen it |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| update:visible | v-model:visible update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-alert/`
- Demo: `#/pages/demo/feedback/alert`
- Chinese docs: [/uniappx/components/alert](/uniappx/components/alert)
