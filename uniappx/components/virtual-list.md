---
title: Virtual List 虚拟列表
demo: pages/demo/display/virtual-list
---

# Virtual List 虚拟列表

`ms-virtual-list`：定高虚拟列表：只渲染可视窗口 + 前后缓冲行；可选触底加载底栏与空态/窗口作用域插槽。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-virtual-list`）。
演示路由：`#/pages/demo/display/virtual-list`。

## 基础用法

```vue
<template>
  <ms-virtual-list>
    …
  </ms-virtual-list>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 条目列表 |
| itemHeight | `number` | `56` | 单项高度（px） |
| visibleCount | `number` | `5` | 可视区大约条数 |
| buffer | `number` | `3` | 可视区外缓冲条数 |
| virtual | `boolean` | `true` | 是否开启虚拟列表 |
| titleKey | `string` | `'title'` | 标题字段名 |
| descKey | `string` | `'desc'` | 描述字段名 |
| keyField | `string` | `'id'` | 主键字段名 |
| emptyText | `string` | `'暂无数据'` | 空态文案 |
| loading | `boolean` | `false` | 触底加载中；为 true 时展示底栏并抑制重复 scrolltolower |
| finished | `boolean` | `false` | 已无更多；底栏展示 finishedText |
| loadingText | `string` | `'加载中…'` | 加载中文案 |
| finishedText | `string` | `'没有更多了'` | 没有更多文案 |
| lowerThreshold | `number` | `50` | 距底多少 px 触发 scrolltolower（对齐 scroll-view lower-threshold） |
| showLoadMore | `boolean` | `false` | 是否渲染触底状态底栏 |

## 事件

| 事件 | 说明 |
| --- | --- |
| item-click | 点击菜单项 |
| range-change | range-change |
| scrolltolower | 触底 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| bottom | `bottom` 插槽 |
| empty | `empty` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-virtual-list/`
- 演示: `#/pages/demo/display/virtual-list`
