---
title: Notice Bar
demo: pages/demo/feedback/notice-bar
---

# Notice Bar

`ms-notice-bar` — Notice Bar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-notice-bar` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/notice-bar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/notice-bar.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Themes -->
  <ms-notice-bar theme="default" content="Default notice" />
  <ms-notice-bar theme="primary" content="Primary notice" />
  <ms-notice-bar theme="success" content="Success notice" />
  <!-- Long text -->
  <ms-notice-bar
    theme="primary"
    content="This is a very long notice that should be truncated with an ellipsis instead of breaking the layout"
  />
  <!-- Vertical -->
  <ms-notice-bar direction="vertical" theme="primary" :list="verticalList" />
  <!-- Closable -->
  <ms-notice-bar theme="warning" content="Closable notice" closable @close="onNoticeClose" />
</template>

<script setup lang="uts">
const verticalList = ['Rotating notice 1', 'Rotating notice 2', 'Rotating notice 3'] as string[]

function onNoticeClose() : void {
  console.log('onNoticeClose')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Theme color |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| content | `string` | `''` | Content text |
| list | `string[]` | `[]` | Data list |
| closable | `boolean` | `false` | Whether closable |
| icon | `string` | `'megaphone-line'` | Icon name (icons.uts) |
| showIcon | `boolean` | `true` | Whether to show the left icon; also hidden when icon is empty |
| operation | `string` | `''` | Right action label |
| suffixIcon | `string` | `''` | Right suffix icon; closable wins if both set |
| interval | `number` | `3000` | Vertical autoplay interval (ms) |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| operation | operation |

## See also

- Component: `uni_modules/ms-ui/components/ms-notice-bar/`
- Demo: `#/pages/demo/feedback/notice-bar`
- Chinese docs: [/uniappx/components/notice-bar](/uniappx/components/notice-bar)
