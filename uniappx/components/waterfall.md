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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 选项/条目列表 |
| column | `number` | `2` | 列数 |
| balance | `boolean` | `true` | 是否两端对齐/均分 |
| itemHeight | `number` | `120` | 单项高度（px） |
| titleKey | `string` | `'title'` | titleKey 文案/取值 |
| descKey | `string` | `'desc'` | 描述字段名 |
| heightKey | `string` | `'height'` | 高度字段名 |
| imageKey | `string` | `'image'` | 图片字段名 |
| coverHeightKey | `string` | `'coverHeight'` | 封面高度字段名 |
| keyField | `string` | `'id'` | 主键字段名 |
| emptyText | `string` | `'暂无数据'` | 空态文案 |
| coverHeight | `number` | `88` | 缺省封面高（有 image 时） |

## 事件

| 事件 | 说明 |
| --- | --- |
| item-click | 点击菜单项 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-waterfall/`
- 演示: `#/pages/demo/display/waterfall`
