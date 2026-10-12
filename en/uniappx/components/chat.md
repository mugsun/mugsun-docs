---
title: Chat
demo: pages/demo/media/chat
---

# Chat

`ms-chat`: Chat. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-chat`).
Demo route: `#/pages/demo/media/chat`.

## Basic usage

```vue
<template>
  <ms-chat variant="…">
    …
  </ms-chat>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| messages | `UTSJSONObject[]` | `[]` | — |
| layout | `string` | `'both'` | — |
| variant | `string` | `'base'` | — |
| reverse | `boolean` | `false` | — |
| loadingText | `string` | `'正在思考…'` | — |
| errorText | `string` | `'生成失败，点击重试'` | — |
| showActions | `boolean` | `true` | — |
| actions | `string` | `'copy,retry,good,bad'` | — |
| height | `number` | `0` | — |
| autoScroll | `boolean` | `true` | — |

## Events

| Event | Description |
| --- | --- |
| message-click | message-click |
| retry | retry |
| action | Action button |
| thinking-toggle | thinking-toggle |

## See also

- Component: `uni_modules/ms-ui/components/ms-chat/`
- Demo: `#/pages/demo/media/chat`
- Chinese docs: [/uniappx/components/chat](/uniappx/components/chat)
