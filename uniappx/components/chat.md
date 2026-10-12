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
