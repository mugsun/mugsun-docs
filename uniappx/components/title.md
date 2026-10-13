---
title: Title 标题
demo: pages/demo/nav/title
---

# Title 标题

`ms-title`：标题块。等级 `h1`–`h6`，可选行数省略。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-title`（商业版，源码不公开）。
演示路由：`#/pages/demo/nav/title`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/title.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-title content="一级标题" level="h1" @click="onTitleClick" />
  <ms-title content="二级标题" level="h2" />
  <ms-title content="三级标题" level="h3" />
  <!-- 组件状态 -->
  <ms-title
    level="h4"
    :lines="1"
    content="这是一段很长的标题文案用来演示单行省略截断效果请不要折行"
  />
  <!-- 组件深度 -->
  <ms-title content="四级标题" level="h4" />
  <ms-title content="五级标题" level="h5" />
  <ms-title content="六级标题" level="h6" />
</template>

<script setup lang="uts">
function onTitleClick() : void {
  console.log('onTitleClick')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `''` | 内容文案 |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | 级数 |
| lines | `number` | `0` | 行数 |
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

- 组件目录: `uni_modules/ms-ui/components/ms-title/`
- 演示: `#/pages/demo/nav/title`
