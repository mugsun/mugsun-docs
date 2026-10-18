---
title: Tag 标签
demo: pages/demo/basic/tag
---

# Tag 标签

`ms-tag` 是分类或状态标签，支持 `theme`、`variant`、`size`、`shape`、`closable`、`disabled`、`icon`、`checkable` 和 `maxWidth`。按下时通过透明度变化反馈，不使用缩放。在标签中嵌套 ms-icon 时，需要设置 `pressable=false`。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-tag`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/basic/tag`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/tag.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 形态 -->
  <ms-tag variant="light" theme="primary">浅色</ms-tag>
  <ms-tag variant="solid" theme="primary">填充</ms-tag>
  <ms-tag variant="outline" theme="primary">描边</ms-tag>
  <!-- 主题 -->
  <ms-tag variant="light" theme="default">默认</ms-tag>
  <ms-tag variant="light" theme="primary">主色</ms-tag>
  <ms-tag variant="light" theme="danger">危险</ms-tag>
  <!-- 尺寸 -->
  <ms-tag size="sm" theme="primary">小号</ms-tag>
  <ms-tag size="md" theme="primary">中号</ms-tag>
  <ms-tag size="lg" theme="primary">大号</ms-tag>
  <!-- 形状 -->
  <ms-tag shape="square" theme="primary">方形</ms-tag>
  <ms-tag shape="round" theme="primary">圆角</ms-tag>
  <ms-tag shape="mark" variant="outline" theme="primary">标记</ms-tag>
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | 主题色 |
| variant | `'solid' \| 'light' \| 'outline' \| 'light-outline'` | `'light'` | 样式变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| shape | `'square' \| 'round' \| 'mark'` | `'square'` | 外形 |
| closable | `boolean` | `false` | 是否可关闭 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `string` | `''` | 图标名（icons.uts） |
| checkable | `boolean` | `false` | 可选中（筛选标签） |
| checked | `boolean` | `false` | 是否选中 |
| maxWidth | `number` | `0` | 文案最大宽度（px）；0 不限制，超出省略 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| update:checked | v-model:checked 更新 |
| change | 值变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tag/`
- 演示: `#/pages/demo/basic/tag`
