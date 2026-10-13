---
title: Image Group 图集
demo: pages/demo/display/image-group
---

# Image Group 图集

`ms-image-group`：评论/详情图集网格：多图排版、可选标签、超量遮罩、点击预览。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-image-group`）。
演示路由：`#/pages/demo/display/image-group`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/image-group.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 布局 -->
  <ms-image-group
    :list="listBasic"
    @click="onClick"
  />
  <ms-image-group :list="listTwo" :columns="2" />
  <!-- 标签 -->
  <ms-image-group :list="listLabeled" label-mode="inset" />
  <ms-image-group :list="listLabeled" label-mode="outer" />
  <!-- 数量限制 -->
  <ms-image-group :list="listMany" :max-count="3" />
  <!-- 组件深度 -->
  <ms-image-group :list="listBasic" :preview="false" @click="onClick" />
  <ms-image-group :list="listTwo" :columns="2" mode="aspectFit" disabled />
  <ms-image-group :list="listMany" :columns="2" :max-count="2" />
</template>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| columns | `number` | `3` | 列配置 |
| mode | `string` | `'aspectFill'` | 模式 |
| labelMode | `string` | `'inset'` | 标签模式 |
| maxCount | `number` | `-1` | 最大数量 |
| preview | `boolean` | `true` | 是否可预览 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-image-group/`
- 演示: `#/pages/demo/display/image-group`
