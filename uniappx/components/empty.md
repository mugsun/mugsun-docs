---
title: Empty 空状态
demo: pages/demo/basic/empty
---

# Empty 空状态

`ms-empty`：空态：icon / image / action；status loading|error|more；action 插槽。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-empty`）。
演示路由：`#/pages/demo/basic/empty`。

## 基础用法

```vue
<template>
  <ms-empty title="…">
    …
  </ms-empty>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | 展示态：空 / 加载 / 错误 / 没有更多 |
| title | `string` | `''` | 主标题（空/错误态可选） |
| description | `string` | `''` | — |
| icon | `string` | `'inbox-line'` | — |
| image | `string` | `''` | — |
| actionText | `string` | `''` | — |
| errorText | `string` | `'加载出错了'` | — |
| moreText | `string` | `'没有更多了'` | — |
| loadingText | `string` | `'加载中…'` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| action | 操作按钮 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| action | `action` 插槽 |
| description | `description` 插槽 |
| image | `image` 插槽 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-empty/`
- 演示：`#/pages/demo/basic/empty`
