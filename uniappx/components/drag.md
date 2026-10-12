---
title: Drag 拖拽
demo: pages/demo/media/drag
---

# Drag 拖拽

`ms-drag`：拖拽排序容器：列表或宫格长按换序。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-drag`）。
演示路由：`#/pages/demo/media/drag`。

## 基础用法

```vue
<template>
  <ms-drag>
    …
  </ms-drag>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| col | `number` | `1` | 占用列数 |
| scrollDiff | `number` | `25` | 拖近边缘时每次滚动像素 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| start | 开始 |
| end | end |
| move | move |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-drag/`
- 演示: `#/pages/demo/media/drag`
