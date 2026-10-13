---
title: Paragraph 段落
demo: pages/demo/display/paragraph
---

# Paragraph 段落

`ms-paragraph`：段落正文。可选次级色与行数省略。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-paragraph`（商业版，源码不公开）。
演示路由：`#/pages/demo/display/paragraph`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/paragraph.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-paragraph
    content="Mugsun 是一套面向移动端的组件库，强调设计令牌驱动与多端表现一致。"
    @click="onParaClick"
  />
  <ms-paragraph
    tone="secondary"
    content="次要说明用于补充上下文，字色更弱，不抢主信息。"
  />
  <!-- 组件状态 -->
  <ms-paragraph
    :lines="2"
    content="这是一段很长的段落文案，用来演示多行省略截断效果。超过指定行数后应以省略号收尾，避免把卡片撑得过高，也方便在列表场景里保持节奏。"
  />
  <!-- 组件深度 -->
  <ms-paragraph tone="success" content="成功提示：资料已保存。" />
  <ms-paragraph tone="warning" content="警告提示：请核对必填项。" />
  <ms-paragraph tone="danger" content="危险提示：操作不可撤销。" />
</template>

<script setup lang="uts">
function onParaClick() : void {
  console.log('onParaClick')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `''` | 内容文案 |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 文案色调：default / secondary / success / warning / danger |
| lines | `number` | `0` | 行数 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-paragraph/`
- 演示: `#/pages/demo/display/paragraph`
