---
title: Devtool
demo: pages/demo/media/devtool
---

# Devtool

`ms-devtool` — Devtool for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-devtool`).
Demo route: `#/pages/demo/media/devtool`.

## Basic usage

```vue
<template>
  <ms-devtool title="…">
    …
  </ms-devtool>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `'调试面板'` | Title |
| host | `string` | `''` | Host id |
| entries | `UTSJSONObject[]` | `[]` | Entries |
| open | `boolean` | `false` | Whether open |
| showEnv | `boolean` | `true` | Whether to show environment meta |
| maxHeight | `number` | `220` | Panel max height (px) |

## Events

| Event | Description |
| --- | --- |
| update:open | update:open |
| clear | Clear |
| entry-click | entry-click |

## See also

- Component: `uni_modules/ms-ui/components/ms-devtool/`
- Demo: `#/pages/demo/media/devtool`
- Chinese docs: [/uniappx/components/devtool](/uniappx/components/devtool)
