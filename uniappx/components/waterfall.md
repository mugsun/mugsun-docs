---
title: Waterfall 瀑布流
demo: pages/demo/display/waterfall
---

# Waterfall 瀑布流

`ms-waterfall`：瀑布流：声明高度分桶；可选封面图与空态。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-waterfall`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/waterfall`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/waterfall.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-waterfall
    :items="baseItems"
    :column="2"
    @item-click="onItemClick"
  />
  <ms-waterfall :items="baseItems" :column="3" @item-click="onItemClick" />
  <!-- 组件样式 -->
  <ms-waterfall :items="mixedItems" :column="2" @item-click="onItemClick" />
  <ms-waterfall
    :items="mixedItems"
    :column="2"
    :balance="false"
    @item-click="onItemClick"
  />
  <!-- 组件深度 -->
  <ms-waterfall :items="coverItems" :column="2" @item-click="onItemClick" />
  <ms-waterfall :items="emptyItems" empty-text="暂无瀑布流内容" />
  <ms-waterfall
    :items="mappedItems"
    :column="2"
    key-field="uid"
    title-key="name"
    desc-key="subtitle"
    height-key="h"
    image-key="cover"
    cover-height-key="ch"
    :item-height="100"
    @item-click="onItemClick"
  />
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 条目列表 |
| column | `number` | `2` | 列数 |
| balance | `boolean` | `true` | 是否尽量均分列高 |
| itemHeight | `number` | `120` | 单项高度（px） |
| titleKey | `string` | `'title'` | 标题字段名 |
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
