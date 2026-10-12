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
| messages | `UTSJSONObject[]` | `[]` | See message field schema |
| layout | `string` | `'both'` | `both` / `left` |
| variant | `string` | `'base'` | `base` / `outline` / `text` |
| reverse | `boolean` | `false` | Render in reverse order |
| loadingText | `string` | `'正在思考…'` | Pending-state text |
| errorText | `string` | `'生成失败，点击重试'` | Error-state text |
| showActions | `boolean` | `true` | Assistant action bar |
| actions | `string` | `'copy,retry,good,bad'` | Comma-separated |
| height | `number` | `0` | `>0` enables inner scrolling |
| autoScroll | `boolean` | `true` | Scroll to bottom when messages change |

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
