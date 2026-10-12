---
title: Picker Selected 搜索选
demo: pages/demo/form/picker-selected
---

# Picker Selected 搜索选

`ms-picker-selected`：弹层式搜索选择。本地过滤或宿主异步搜；支持多选/单选。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-picker-selected`）。
演示路由：`#/pages/demo/form/picker-selected`。

## 基础用法

```vue
<template>
  <ms-picker-selected title="…" v-model:visible="open">
    …
  </ms-picker-selected>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | — |
| value | `string[]` | `[]` | — |
| visible | `boolean` | `false` | — |
| title | `string` | `'请选择'` | — |
| cancelText | `string` | `'取消'` | — |
| confirmText | `string` | `'确定'` | — |
| placeholder | `string` | `'搜索'` | — |
| emptyText | `string` | `'暂无数据'` | — |
| valueKey | `string` | `'id'` | — |
| labelKey | `string` | `'name'` | — |
| filterKey | `string` | `''` | — |
| localSearch | `boolean` | `true` | — |
| multiple | `boolean` | `true` | — |
| required | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| update:value | v-model:value 更新 |
| search | search |
| change | 值变化 |
| confirm | 确认 |
| cancel | 取消 |
| open | 打开 |
| close | 关闭 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-picker-selected/`
- 演示：`#/pages/demo/form/picker-selected`
