---
title: Mention
demo: pages/demo/form/mention
---

# Mention

`ms-mention` — Mention for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-mention`).
Demo route: `#/pages/demo/form/mention`.

## Basic usage

```vue
<template>
  <ms-mention v-model="value">
    …
  </ms-mention>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| options | `string[]` | `[]` | Options list |
| trigger | `string` | `'@'` | Trigger |
| filterable | `boolean` | `true` | Whether filterable |
| placeholder | `string` | `'输入 @ 提及成员'` | Placeholder |
| emptyText | `string` | `'无匹配成员'` | Empty-state text |
| disabled | `boolean` | `false` | Whether disabled |
| confirmType | `string` | `'send'` | Keyboard confirm-key type |

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
