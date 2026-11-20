---
title: Alert
demo: pages/demo/feedback/alert
---

# Alert

`ms-alert` is an in-page alert bar. It supports theme colors, light and filled styles, and can be closed.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Theme color |
| variant | `'light' \| 'solid'` | `'light'` | Style variant |
| closable | `boolean` | `true` | Whether closable |
| icon | `string` | `''` | Icon name (icons.uts) |
| showIcon | `boolean` | `true` | Whether to show the icon on the left |
| title | `string` | `''` | Title (optional; can coexist with default slot body) |
| visible | `boolean` | `true` | Whether visible; pairs with update:visible so the parent page can reopen it |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the alert is tapped |
| close | — | Fires when the close button is tapped |
| update:visible | `value: boolean` | Fires with `false` after the close button is tapped; used by `v-model:visible` |

## Slots

| Slot | Description |
| --- | --- |
| default | Body content |
