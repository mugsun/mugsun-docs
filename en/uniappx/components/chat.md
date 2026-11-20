---
title: Chat
demo: pages/demo/media/chat
---

# Chat

`ms-chat` is a chat message list with role-based bubbles. Assistant messages support Markdown, collapsible reasoning and an action bar.

With `height` set, the list scrolls inside a fixed height and jumps to the bottom when messages change. It does not include an input area.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| messages | `UTSJSONObject[]` | `[]` | Messages; each item supports role / text / format / name / avatar / datetime / status / thinking / id |
| layout | `string` | `'both'` | Bubble layout: both / left |
| variant | `string` | `'base'` | Bubble style: base / outline / text |
| reverse | `boolean` | `false` | Whether to render in reverse (common when newest is at bottom) |
| loadingText | `string` | `'正在思考…'` | Text shown while a message is `pending`; the default is Chinese for "Thinking…" |
| errorText | `string` | `'生成失败，点击重试'` | Text shown when a message is in the `error` state; the default is Chinese for "Generation failed, tap to retry" |
| showActions | `boolean` | `true` | Whether to show the action bar under assistant messages |
| actions | `string` | `'copy,retry,good,bad'` | Action items, separated by commas |
| height | `number` | `0` | List height (px); when above 0 the list scrolls inside the component |
| autoScroll | `boolean` | `true` | Whether to scroll to the bottom when messages change |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| message-click | `payload: UTSJSONObject` | Fires when a bubble is tapped; `payload` has `index`, `role` and `text` |
| retry | `payload: UTSJSONObject` | Fires when a failed message or the retry action is tapped; `payload.index` is the message index |
| action | `payload: UTSJSONObject` | Fires when an action button is tapped; `payload` has `index`, `name`, `text` and `id` |
| thinking-toggle | `payload: UTSJSONObject` | Fires when the reasoning block is expanded or collapsed; `payload` has `index` and `collapsed` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `scrollToBottom()` | Scrolls to the bottom of the list; only works when `height` is above 0 |
