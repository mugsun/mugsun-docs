---
title: More 更多
demo: pages/demo/nav/more
---

# More 更多

`ms-more`：内容超高收起，点击展开/收起。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-more`）。
演示路由：`#/pages/demo/nav/more`。

## 基础用法

```vue
<template>
  <ms-more :disabled="true">
    …
  </ms-more>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | — |
| collapsedSize | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| expandText | `string` | `'展开更多'` | — |
| collapseText | `string` | `'收起'` | — |
| disabled | `boolean` | `false` | — |
| showAction | `boolean` | `true` | — |
| showIcon | `boolean` | `true` | 是否显示展开/收起箭头图标 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| action | `action` 插槽 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-more/`
- 演示：`#/pages/demo/nav/more`
