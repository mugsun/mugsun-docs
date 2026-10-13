---
title: Text 文本
demo: pages/demo/basic/text
---

# Text 文本

`ms-text`：语义化文字。`variant` / `size` / `bold` / `align` / `lines` / `selectable`。行高 1.7（对齐 x-text）。高亮/正则为二期。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-text`（商业版，源码不公开）。
演示路由：`#/pages/demo/basic/text`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/text.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 正文与语义色 -->
  <ms-text>这是一段默认正文，用于页面正文展示。</ms-text>
  <ms-text variant="secondary">次要</ms-text>
  <ms-text variant="primary">主色</ms-text>
  <!-- 字号与样式 -->
  <ms-text size="sm">小号 · 辅助说明与标签</ms-text>
  <ms-text size="md">中号 · 默认正文与表单</ms-text>
  <ms-text size="lg">大号 · 小标题与强调</ms-text>
  <!-- 交互 -->
  <ms-text :lines="2">
    这是一段很长的文字，用来测试最大行数与省略号。第二行继续。第三行应该被截断并显示省略号效果。
  </ms-text>
  <ms-text selectable>可选中文字，长按或拖选</ms-text>
  <ms-text variant="primary" @click="onTextClick">点我（看 toast）</ms-text>
  <!-- 组件深度 -->
  <ms-text variant="danger" bold>危险操作不可恢复，请谨慎确认</ms-text>
  <ms-text variant="warning" align="right" size="sm">余额不足，请先充值</ms-text>
  <ms-text :lines="1" selectable variant="secondary">
    这是一段很长的可复制文案，超出一行时省略，仍可长按选中复制整段内容。
  </ms-text>
</template>

<script setup lang="uts">
function onTextClick() : void {
  console.log('onTextClick')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | 样式变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| bold | `boolean` | `false` | 是否加粗 |
| lines | `number` | `0` | 行数 |
| selectable | `boolean` | `false` | 是否可选中文本 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 对齐方式 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-text/`
- 演示: `#/pages/demo/basic/text`
