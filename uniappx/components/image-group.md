---
title: Image Group 图集
demo: pages/demo/display/image-group
---

# Image Group 图集

`ms-image-group`：评论/详情图集网格：多图排版、可选标签、超量遮罩、点击预览。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-image-group`）。
演示路由：`#/pages/demo/display/image-group`。

## 基础用法

```vue
<template>
  <ms-image-group :disabled="true">
    …
  </ms-image-group>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| columns | `number` | `3` | — |
| mode | `string` | `'aspectFill'` | — |
| labelMode | `string` | `'inset'` | — |
| maxCount | `number` | `-1` | — |
| preview | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-image-group/`
- 演示：`#/pages/demo/display/image-group`
