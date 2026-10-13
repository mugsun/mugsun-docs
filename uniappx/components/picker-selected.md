---
title: Picker Selected 搜索选
demo: pages/demo/form/picker-selected
---

# Picker Selected 搜索选

`ms-picker-selected`：弹层式搜索选择。本地过滤或宿主异步搜；支持多选/单选。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项列表 |
| value | `string[]` | `[]` | 当前值 |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `'请选择'` | 标题 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| placeholder | `string` | `'搜索'` | 占位文案 |
| emptyText | `string` | `'暂无数据'` | 空态文案 |
| valueKey | `string` | `'id'` | 选项值字段名 |
| labelKey | `string` | `'name'` | 选项文案字段名 |
| filterKey | `string` | `''` | 搜索匹配字段名 |
| localSearch | `boolean` | `true` | 是否在本地 options 内筛选 |
| multiple | `boolean` | `true` | 是否多选 |
| required | `boolean` | `false` | 是否必填 |
| disabled | `boolean` | `false` | 是否禁用 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-picker-selected/`
- 演示: `#/pages/demo/form/picker-selected`
