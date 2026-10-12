---
title: Mention
demo: pages/demo/form/mention
---

# Mention

`ms-mention`: Mention. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-mention`).
Demo route: `#/pages/demo/form/mention`.

## Basic usage

```vue
<template>
  <ms-mention v-model="value" :disabled="true">
    …
  </ms-mention>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| options | `string[]` | `[]` | — |
| trigger | `string` | `'@'` | — |
| filterable | `boolean` | `true` | — |
| placeholder | `string` | `'输入 @ 提及成员'` | — |
| emptyText | `string` | `'无匹配成员'` | — |
| disabled | `boolean` | `false` | — |
| confirmType | `string` | `'send'` | — |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| mention | mention |
| select | select |
| removemention | removemention |
| confirm | Confirm |

## See also

- Component: `uni_modules/ms-ui/components/ms-mention/`
- Demo: `#/pages/demo/form/mention`
- Chinese docs: [/uniappx/components/mention](/uniappx/components/mention)
