---
title: Chat 对话
demo: pages/demo/media/chat
---

# Chat 对话

`ms-chat`：对话消息列表（加深版）：角色气泡、Markdown 正文、思考折叠、助手操作栏、流式态、可选定高滚底。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-chat`（源码仓暂未公开）。
演示路由：`#/pages/demo/media/chat`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/chat.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| messages | `UTSJSONObject[]` | `[]` | 消息列表 |
| layout | `string` | `'both'` | 气泡布局 |
| variant | `string` | `'base'` | 样式变体 |
| reverse | `boolean` | `false` | 是否倒序渲染（最新在下时常用） |
| loadingText | `string` | `'正在思考…'` | 加载中文案 |
| errorText | `string` | `'生成失败，点击重试'` | 错误文案 |
| showActions | `boolean` | `true` | 是否显示消息操作区 |
| actions | `string` | `'copy,retry,good,bad'` | 操作项列表 |
| height | `number` | `0` | 高度（px） |
| autoScroll | `boolean` | `true` | 是否自动滚动 |

## 事件

| 事件 | 说明 |
| --- | --- |
| message-click | message-click |
| retry | retry |
| action | 操作按钮 |
| thinking-toggle | thinking-toggle |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-chat/`
- 演示: `#/pages/demo/media/chat`
