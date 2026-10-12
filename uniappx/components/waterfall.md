---
title: Waterfall 瀑布流
demo: pages/demo/display/waterfall
---

# Waterfall 瀑布流

`ms-waterfall`：瀑布流：声明高度分桶；可选封面图与空态。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-waterfall`）。
演示路由：`#/pages/demo/display/waterfall`。

## 基础用法

```vue
<template>
  <ms-waterfall>
    …
  </ms-waterfall>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | — |
| column | `number` | `2` | — |
| balance | `boolean` | `true` | — |
| itemHeight | `number` | `120` | — |
| titleKey | `string` | `'title'` | — |
| descKey | `string` | `'desc'` | — |
| heightKey | `string` | `'height'` | — |
| imageKey | `string` | `'image'` | — |
| coverHeightKey | `string` | `'coverHeight'` | — |
| keyField | `string` | `'id'` | — |
| emptyText | `string` | `'暂无数据'` | — |
| coverHeight | `number` | `88` | 缺省封面高（有 image 时） |

## 事件

| 事件 | 说明 |
| --- | --- |
| item-click | 点击菜单项 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-waterfall/`
- 演示：`#/pages/demo/display/waterfall`
