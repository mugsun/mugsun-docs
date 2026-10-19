---
title: Sheet 容器
demo: pages/demo/basic/sheet
---

# Sheet 容器

`ms-sheet` 是卡片或容器面板，支持 `variant`、`radius`、`padding`、`margin`、`bordered`、`shadow`、`loading`、`url` 和 `pressable`（对应 x-sheet 的 isLink）。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-sheet`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/basic/sheet`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/sheet.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <ms-sheet radius="lg" padding="none">
    <text>默认容器</text>
    <text>统一白底面，承载列表与表单</text>
    <ms-sheet>
      <ms-text>统一白底容器，承载列表与表单内容。</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>圆角</text>
    <text>大圆角 + 浅底面</text>
    <ms-sheet radius="lg" variant="muted">
      <ms-text>圆角卡片面</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>描边</text>
    <text>边框强调块边界</text>
    <ms-sheet bordered radius="lg">
      <ms-text>带边框的容器块</ms-text>
    </ms-sheet>
  </ms-sheet>
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | 样式变体 |
| radius | `'md' \| 'lg'` | `'lg'` | 圆角（px） |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | 内边距（px） |
| margin | `'none' \| 'page'` | `'none'` | 外边距：none / page |
| bordered | `boolean` | `false` | 是否显示边框 |
| shadow | `boolean` | `false` | 是否投影 |
| loading | `boolean` | `false` | 是否加载中 |
| url | `string` | `''` | 跳转地址 |
| pressable | `boolean` | `false` | 可点按压反馈；有 url 时默认视为可点 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sheet/`
- 演示: `#/pages/demo/basic/sheet`
