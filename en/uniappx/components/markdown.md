---
title: Markdown
demo: pages/demo/media/markdown
---

# Markdown

`ms-markdown`: Native Markdown subset renderer (no third-party deps, no webview).

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-markdown/components/ms-markdown`).
Optional plugin: install `uni_modules/ms-markdown` alongside `ms-ui`.
Demo route: `#/pages/demo/media/markdown`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/markdown.uvue`; see them running in the phone frame.

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
const listDoc = ref('- 轻量渲染\n- 跨端一致\n- 零第三方依赖\n\n1. 解析\n2. 渲染\n3. 事件')
const quoteDoc = ref('> 可选中文本便于复制\n\n```\nnpm run dev\n```\n')
const imageDoc = ref('### 配图说明\n\n![演示封面](/static/demo-cover.png)\n')
const taskDoc = ref('- [x] 完成解析器\n- [ ] 补齐图片预览\n- [ ] 语法高亮\n')
const tableDoc = ref('| 列A | 列B | 列C |\n| --- | --- | --- |\n| 1 | 甲 | 是 |\n| 2 | 乙 | 否 |\n')
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Current value |
| fontSize | `number` | `14` | Font size (px) |
| showCodeLang | `boolean` | `true` | Whether to show code language tags |
| selectable | `boolean` | `false` | Whether text is selectable |

## Events

| Event | Description |
| --- | --- |
| link | Link click |
| image | Image click |
| parsed | Parsed |

## See also

- Component: `uni_modules/ms-markdown/components/ms-markdown/`
- Demo: `#/pages/demo/media/markdown`
- Chinese docs: [/uniappx/components/markdown](/uniappx/components/markdown)
