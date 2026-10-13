---
title: Markdown
demo: pages/demo/media/markdown
---

# Markdown

`ms-markdown`：Markdown 子集原生渲染（零第三方依赖，不用 webview）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-markdown/components/ms-markdown`（商业版，源码不公开）。
可选插件：需单独安装 `uni_modules/ms-markdown`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/markdown`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/markdown.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 当前值 |
| fontSize | `number` | `14` | 字号（px） |
| showCodeLang | `boolean` | `true` | 是否显示代码语言标签 |
| selectable | `boolean` | `false` | 是否可选中文本 |

## 事件

| 事件 | 说明 |
| --- | --- |
| link | 点击链接 |
| image | 点击图片 |
| parsed | 解析完成 |

## 相关

- 组件目录: `uni_modules/ms-markdown/components/ms-markdown/`
- 演示: `#/pages/demo/media/markdown`
