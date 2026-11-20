---
title: Markdown
demo: pages/demo/media/markdown
---

# Markdown

`ms-markdown` 以原生方式渲染 Markdown 的常用语法，不依赖第三方库，也不使用 webview。

这是可选插件，需要单独安装 `uni_modules/ms-markdown`，并依赖 `ms-ui`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-markdown :value="doc" @link="onLink" @parsed="onParsed" />
  <ms-markdown :value="listDoc" />
  <!-- 组件样式 -->
  <ms-markdown :value="listDoc" :font-size="17" />
  <ms-markdown :value="quoteDoc" selectable :show-code-lang="false" />
  <!-- 组件深度 -->
  <ms-markdown :value="imageDoc" @image="onImage" />
  <ms-markdown :value="taskDoc" />
  <ms-markdown :value="tableDoc" />
</template>

<script setup lang="uts">
const doc = ref(docA)

const imageDoc = ref('### 配图说明\n\n![演示封面](/static/demo-cover.png)\n')

const listDoc = ref('- 轻量渲染\n- 跨端一致\n- 零第三方依赖\n\n1. 解析\n2. 渲染\n3. 事件')

const quoteDoc = ref('> 可选中文本便于复制\n\n```\nnpm run dev\n```\n')

const tableDoc = ref('| 列A | 列B | 列C |\n| --- | --- | --- |\n| 1 | 甲 | 是 |\n| 2 | 乙 | 否 |\n')

const taskDoc = ref('- [x] 完成解析器\n- [ ] 补齐图片预览\n- [ ] 语法高亮\n')

function onLink(payload: UTSJSONObject) : void {
  console.log('onLink')
}

function onParsed(payload: UTSJSONObject) : void {
  console.log('onParsed')
}

function onImage(payload: UTSJSONObject) : void {
  console.log('onImage')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | Markdown 源文本 |
| fontSize | `number` | `14` | 正文字号（px） |
| showCodeLang | `boolean` | `true` | 代码块是否显示语言标签 |
| selectable | `boolean` | `false` | 正文是否可以选中 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| link | `payload: UTSJSONObject` | 点击链接时触发，`payload` 含 `text` 和 `href`；组件不做跳转，需要自行处理 |
| image | `payload: UTSJSONObject` | 点击图片时触发，`payload` 含 `alt` 和 `src` |
| parsed | `payload: UTSJSONObject` | 内容解析完成后触发，`payload.blocks` 是解析出的块数 |
