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
Snippets below are taken from the demo source `pages/demo/media/chat.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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
const actionMsgs = ref([
  msg('user', '试试操作栏。'),
  rich('assistant', '点下方复制、重试、赞或踩，探针会回写。', '助手', '10:31', ''),
] as UTSJSONObject[])

const basic = ref([
  msg('user', '帮我总结一下这份发布说明。'),
  msg('assistant', '本次新增图表与 Markdown 渲染，并补齐了编辑器与调试面板。'),
] as UTSJSONObject[])

const failed = ref([
  msg('user', '导出一份验收报告。'),
  rich('assistant', '', '助手', '10:27', 'error'),
] as UTSJSONObject[])

const markdownMsgs = ref([msg('user', '用 Markdown 说明能力。'), mdAssistant] as UTSJSONObject[])

const named = ref([
  rich('user', '组件库进度如何？', '产品', '10:24', ''),
  rich('assistant', '对话组件已加深 Markdown、思考折叠与操作栏。', '助手', '10:25', ''),
] as UTSJSONObject[])

const pending = ref([
  msg('user', '再帮我列一下未完成项。'),
  rich('assistant', '', '助手', '10:26', 'pending'),
] as UTSJSONObject[])

const streaming = ref([
  msg('user', '写一段发布摘要。'),
  rich('assistant', '本次交付聚焦对话深度：', '助手', '10:28', 'streaming'),
] as UTSJSONObject[])

const thinkingMsgs = ref([msg('user', '为什么要加深对话？'), thinkAssistant] as UTSJSONObject[])

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
