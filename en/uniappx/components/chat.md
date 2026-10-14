---
title: Chat
demo: pages/demo/media/chat
---

# Chat

`ms-chat` is a chat message list with role-based bubbles, Markdown content, collapsible reasoning, an assistant action bar and a streaming state. It can optionally use a fixed height and scroll to the bottom automatically.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-chat`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/media/chat`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/chat.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-chat :messages="basic" @message-click="onMessage" @action="onAction" />
  <ms-chat :messages="named" layout="left" />
  <!-- States -->
  <ms-chat :messages="pending" />
  <ms-chat :messages="failed" @retry="onRetry" />
  <ms-chat :messages="streaming" />
  <!-- Styles -->
  <ms-chat :messages="basic" variant="outline" />
  <ms-chat :messages="basic" variant="text" />
  <!-- Advanced -->
  <ms-chat :messages="markdownMsgs" />
  <ms-chat :messages="thinkingMsgs" @thinking-toggle="onThink" />
  <ms-chat :messages="actionMsgs" @action="onAction" />
</template>

<script setup lang="uts">
const actionMsgs = ref([
  msg('user', 'Try the action bar.'),
  rich('assistant', 'Tap copy, retry, like or dislike below; the probe will record it.', 'Assistant', '10:31', ''),
] as UTSJSONObject[])

const basic = ref([
  msg('user', 'Summarize these release notes for me.'),
  msg('assistant', 'This release adds charts and Markdown rendering, and completes the editor and debug panel.'),
] as UTSJSONObject[])

const failed = ref([
  msg('user', 'Export an acceptance report.'),
  rich('assistant', '', 'Assistant', '10:27', 'error'),
] as UTSJSONObject[])

const markdownMsgs = ref([msg('user', 'Describe the features in Markdown.'), mdAssistant] as UTSJSONObject[])

const named = ref([
  rich('user', 'How is the component library going?', 'Product', '10:24', ''),
  rich('assistant', 'The chat component now supports Markdown, collapsible thinking and an action bar.', 'Assistant', '10:25', ''),
] as UTSJSONObject[])

const pending = ref([
  msg('user', 'List the unfinished items again.'),
  rich('assistant', '', 'Assistant', '10:26', 'pending'),
] as UTSJSONObject[])

const streaming = ref([
  msg('user', 'Write a release summary.'),
  rich('assistant', 'This delivery focuses on chat depth:', 'Assistant', '10:28', 'streaming'),
] as UTSJSONObject[])

const thinkingMsgs = ref([msg('user', 'Why deepen the chat?'), thinkAssistant] as UTSJSONObject[])

function onMessage(payload: UTSJSONObject) : void {
  console.log('onMessage')
}

function onAction(payload: UTSJSONObject) : void {
  console.log('onAction')
}

function onRetry(payload: UTSJSONObject) : void {
  console.log('onRetry')
}

function onThink(payload: UTSJSONObject) : void {
  console.log('onThink')
}
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
