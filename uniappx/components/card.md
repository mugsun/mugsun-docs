---
title: Card 卡片
demo: pages/demo/display/card
---

# Card 卡片

`ms-card`：结构化内容卡：头图 + 标题/副标题 + 正文 + 可选 statusIcon + footer 插槽。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-card`）。
演示路由：`#/pages/demo/display/card`。

## 基础用法

```vue
<template>
  <ms-card title="…">
    …
  </ms-card>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 标题 |
| subtitle | `string` | `''` | 副标题 |
| content | `string` | `''` | 内容文案 |
| image | `string` | `''` | 图片地址 |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | 封面图高度档：sm / md / lg |
| statusIcon | `string` | `''` | 右上状态图标名 |
| radius | `'md' \| 'lg'` | `'lg'` | 圆角（px） |
| bordered | `boolean` | `false` | 是否显示边框 |
| shadow | `boolean` | `false` | 是否投影 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| status | 状态变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| footer | `footer` 插槽 |
| image | `image` 插槽 |
| subtitle | `subtitle` 插槽 |
| title | `title` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-card/`
- 演示: `#/pages/demo/display/card`
