---
title: Chat 对话
demo: pages/demo/media/chat
---

# Chat 对话

`ms-chat` 是对话消息列表，按角色显示气泡，助手消息支持 Markdown、可折叠的思考过程和操作栏。

设置 `height` 后列表在固定高度内滚动，消息变化时自动滚到底部。组件不包含输入区。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| messages | `UTSJSONObject[]` | `[]` | 消息列表，每项支持 role / text / format / name / avatar / datetime / status / thinking / id |
| layout | `string` | `'both'` | 气泡布局：both / left |
| variant | `string` | `'base'` | 气泡样式：base / outline / text |
| reverse | `boolean` | `false` | 是否倒序渲染（最新在下时常用） |
| loadingText | `string` | `'正在思考…'` | 消息处于 `pending` 状态时显示的文字 |
| errorText | `string` | `'生成失败，点击重试'` | 消息处于 `error` 状态时显示的文字 |
| showActions | `boolean` | `true` | 是否显示助手消息下方的操作栏 |
| actions | `string` | `'copy,retry,good,bad'` | 操作项，用逗号分隔 |
| height | `number` | `0` | 列表高度（px）；大于 0 时在组件内部滚动 |
| autoScroll | `boolean` | `true` | 消息变化时是否自动滚到底部 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| message-click | `payload: UTSJSONObject` | 点击消息气泡时触发，`payload` 含 `index`、`role` 和 `text` |
| retry | `payload: UTSJSONObject` | 点击出错的消息或操作栏里的重试时触发，`payload.index` 是消息下标 |
| action | `payload: UTSJSONObject` | 点击操作栏按钮时触发，`payload` 含 `index`、`name`、`text` 和 `id` |
| thinking-toggle | `payload: UTSJSONObject` | 展开或收起思考过程时触发，`payload` 含 `index` 和 `collapsed` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `scrollToBottom()` | 滚动到列表底部，仅在 `height` 大于 0 时有效 |
