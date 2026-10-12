---
title: Image Group 图集
demo: pages/demo/display/image-group
---

# Image Group 图集

`ms-image-group`：评论/详情图集网格：多图排版、可选标签、超量遮罩、点击预览。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-image-group`）。
演示路由：`#/pages/demo/display/image-group`。

## 基础用法

```vue
<template>
  <ms-image-group>
    …
  </ms-image-group>
</template>
```

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
