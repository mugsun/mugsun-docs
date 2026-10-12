---
title: Chat 对话
demo: pages/demo/media/chat
---

# Chat 对话

`ms-chat`：对话消息列表（加深版）：角色气泡、Markdown 正文、思考折叠、助手操作栏、流式态、可选定高滚底。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-chat`）。
演示路由：`#/pages/demo/media/chat`。

## 基础用法

```vue
<template>
  <ms-chat variant="…">
    …
  </ms-chat>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| messages | `UTSJSONObject[]` | `[]` | 见消息字段 |
| layout | `string` | `'both'` | `both` / `left` |
| variant | `string` | `'base'` | `base` / `outline` / `text` |
| reverse | `boolean` | `false` | 倒序渲染 |
| loadingText | `string` | `'正在思考…'` | pending 文案 |
| errorText | `string` | `'生成失败，点击重试'` | error 文案 |
| showActions | `boolean` | `true` | 助手操作栏 |
| actions | `string` | `'copy,retry,good,bad'` | 逗号分隔 |
| height | `number` | `0` | `>0` 启用内滚动 |
| autoScroll | `boolean` | `true` | 消息变化滚底 |

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
