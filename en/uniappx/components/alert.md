---
title: Alert
demo: pages/demo/feedback/alert
---

# Alert

`ms-alert` — Alert for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-alert` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/alert`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/alert.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 主题 -->
  <ms-alert theme="primary" :closable="false">主色提醒</ms-alert>
  <ms-alert theme="info" :closable="false">信息提醒</ms-alert>
  <ms-alert theme="success" :closable="false">成功提醒</ms-alert>
  <!-- 形态 -->
  <ms-alert variant="light" theme="primary" :closable="false">浅色</ms-alert>
  <ms-alert variant="solid" theme="primary" :closable="false">填充</ms-alert>
  <!-- 可关闭 -->
  <ms-alert
    theme="warning"
    :visible="showClosable"
    @update:visible="onClosableVisible"
    @close="onAlertClose"
  >可关闭</ms-alert>
  <ms-alert theme="info" :closable="false">常驻</ms-alert>
  <!-- 图标 -->
  <ms-alert theme="primary" icon="information-line" :closable="false">自定义图标</ms-alert>
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
| visible | `boolean` | `true` | Whether visible; pairs with update:visible so host can reopen |

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
