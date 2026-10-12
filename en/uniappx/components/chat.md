---
title: Chat
demo: pages/demo/media/chat
---

# Chat

`ms-chat` — Chat for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-chat`).
Demo route: `#/pages/demo/media/chat`.

## Basic usage

```vue
<template>
  <ms-chat variant="…">
    …
  </ms-chat>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| messages | `UTSJSONObject[]` | `[]` | Message list |
| layout | `string` | `'both'` | Popover layout |
| variant | `string` | `'base'` | Style variant |
| reverse | `boolean` | `false` | Whether to render in reverse (common when newest is at bottom) |
| loadingText | `string` | `'正在思考…'` | Loading text |
| errorText | `string` | `'生成失败，点击重试'` | Error text |
| showActions | `boolean` | `true` | Whether to show message actions |
| actions | `string` | `'copy,retry,good,bad'` | Action items |
| height | `number` | `0` | Height (px) |
| autoScroll | `boolean` | `true` | Whether to auto-scroll |

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
