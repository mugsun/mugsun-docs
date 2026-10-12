---
title: Pagination 翻页
demo: pages/demo/nav/pagination
---

# Pagination 翻页

`ms-pagination`：页码：完整窗口 / 简易上一页下一页；`showPrevNext` / `showJumper`；`v-model:value`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-pagination`）。
演示路由：`#/pages/demo/nav/pagination`。

## 基础用法

```vue
<template>
  <ms-pagination :disabled="true">
    …
  </ms-pagination>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `1` | — |
| total | `number` | `0` | — |
| pageSize | `number` | `10` | — |
| maxButtons | `number` | `3` | — |
| minButtons | `number` | `5` | — |
| simple | `boolean` | `false` | — |
| showTotal | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |
| showPrevNext | `boolean` | `false` | 完整模式两侧上一页/下一页 |
| showJumper | `boolean` | `false` | 跳转到指定页 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-pagination/`
- 演示：`#/pages/demo/nav/pagination`
