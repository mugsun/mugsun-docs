---
title: Devtool
demo: pages/demo/media/devtool
---

# Devtool

`ms-devtool`: Devtool. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-devtool`).
Demo route: `#/pages/demo/media/devtool`.

## Basic usage

```vue
<template>
  <ms-devtool title="…">
    …
  </ms-devtool>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `'调试面板'` | — |
| host | `string` | `''` | — |
| entries | `UTSJSONObject[]` | `[]` | — |
| open | `boolean` | `false` | — |
| showEnv | `boolean` | `true` | — |
| maxHeight | `number` | `220` | — |

## Events

| Event | Description |
| --- | --- |
| update:open | update:open |
| clear | clear |
| entry-click | entry-click |

## See also

- Component: `uni_modules/ms-ui/components/ms-devtool/`
- Demo: `#/pages/demo/media/devtool`
- Chinese docs: [/uniappx/components/devtool](/uniappx/components/devtool)
