---
title: Chat
demo: pages/demo/media/chat
---

# Chat

`ms-chat` — Chat for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-chat` (repository not yet public).
Demo route: `#/pages/demo/media/chat`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/chat.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-chat :messages="basic" @message-click="onMessage" @action="onAction" />
  <ms-chat :messages="named" layout="left" />
  <!-- 组件状态 -->
  <ms-chat :messages="pending" />
  <ms-chat :messages="failed" @retry="onRetry" />
  <ms-chat :messages="streaming" />
  <!-- 组件样式 -->
  <ms-chat :messages="basic" variant="outline" />
  <ms-chat :messages="basic" variant="text" />
  <!-- 组件深度 -->
  <ms-chat :messages="markdownMsgs" />
  <ms-chat :messages="thinkingMsgs" @thinking-toggle="onThink" />
  <ms-chat :messages="actionMsgs" @action="onAction" />
</template>

<script setup lang="uts">
const basic = ref([
const named = ref([
const pending = ref([
const failed = ref([
const streaming = ref([
const markdownMsgs = ref([msg('user', '用 Markdown 说明能力。'), mdAssistant] as UTSJSONObject[])
const thinkingMsgs = ref([msg('user', '为什么要加深对话？'), thinkAssistant] as UTSJSONObject[])
const actionMsgs = ref([
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
