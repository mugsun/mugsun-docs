---
title: Editor 编辑
demo: pages/demo/media/editor
---

# Editor 编辑

`ms-editor` 是 Markdown 源码编辑器，由插入标记的工具栏、`textarea` 源码区和 `ms-markdown` 实时预览组成。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-editor/components/ms-editor`。ms-ui 为商业版，源码不公开。
可选插件：需单独安装 `uni_modules/ms-editor`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/editor`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/editor.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-editor v-model="draft" @command="onCommand" @change="onChange" />
  <ms-editor :model-value="draft" read-only :height="120" />
  <!-- 组件样式 -->
  <ms-editor v-model="notes" :show-preview="false" :height="120" />
  <ms-editor v-model="notes" :toolbar="slimToolbar" :height="120" />
  <!-- 组件深度 -->
  <ms-editor
    ref="richEditor"
    v-model="rich"
    :toolbar="richToolbar"
    show-count
    :maxlength="800"
    :height="160"
    placeholder="在此输入 Markdown…"
    @command="onCommand"
    @clear="onClear"
  />
</template>

<script setup lang="uts">
const draft = ref(
  '## 发布说明\n\n本次新增 **图表** 与 *Markdown* 渲染。\n\n- 支持折线与柱状\n- 支持饼图与环形\n',
)

const notes = ref('- 待办一\n- 待办二\n')

const rich = ref('### 深度编辑\n\n可插入图片、任务与表格。\n')

const richToolbar = ref(
  ['bold', 'h3', 'task', 'image', 'table', 'hr', 'clear'] as string[],
)

const slimToolbar = ref(['bold', 'list', 'link'] as string[])

function onCommand(payload: UTSJSONObject) : void {
  console.log('onCommand')
}

function onChange(payload: UTSJSONObject) : void {
  console.log('onChange')
}

function onClear() : void {
  console.log('onClear')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| height | `number` | `220` | 高度（px） |
| placeholder | `string` | `'输入 Markdown…'` | 占位文案 |
| readOnly | `boolean` | `false` | 是否只读 |
| showPreview | `boolean` | `true` | 是否显示预览 |
| toolbar | `string[]` | `['bold', 'italic', 'strike', 'code', 'h2', 'quote', 'list', 'link']` | 工具条配置 |
| maxlength | `number` | `20000` | 源码最大长度；-1 不限制（仍受平台 textarea 上限约束） |
| showCount | `boolean` | `false` | 是否显示字数统计 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| command | 工具条命令 |
| change | 值变化 |
| clear | 清空 |

## 相关

- 组件目录: `uni_modules/ms-editor/components/ms-editor/`
- 演示: `#/pages/demo/media/editor`
