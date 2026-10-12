---
title: Tabs 选项卡
demo: pages/demo/nav/tabs
---

# Tabs 选项卡

`ms-tabs`：选项卡：line / tag / card；均分或横向滚动；徽标；内容区。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-tabs`）。
演示路由：`#/pages/demo/nav/tabs`。

## 基础用法

```vue
<template>
  <ms-tabs theme="line" size="md">
    …
  </ms-tabs>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled / content |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | — |
| size | `'md' \| 'lg'` | `'md'` | — |
| spaceEvenly | `boolean` | `true` | 头部是否均分；false 时按内容撑开并可横向滚动 |
| showLine | `boolean` | `true` | line 主题是否显示底部激活条 |
| showContent | `boolean` | `false` | 是否渲染内容区（items[].content 或默认插槽） |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:value | v-model:value 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-tabs/`
- 演示：`#/pages/demo/nav/tabs`
