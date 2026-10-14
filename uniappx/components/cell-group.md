---
title: Cell Group 单元格组
demo: pages/demo/basic/cell
---

# Cell Group 单元格组

`ms-cell-group` 是单元格组容器，可设置 `theme`（default 或 card）和 `title`，默认插槽中放置 ms-cell。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-cell-group`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/basic/cell`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/cell.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

```vue
<template>
  <ms-cell-group theme="card">
    <ms-cell title="单行标题" icon="customer-service-line" arrow />
    <ms-cell title="单行标题" icon="global-line" arrow />
    <ms-cell title="单行标题" icon="lock-line" arrow :bordered="false" />
  </ms-cell-group>
  <ms-cell-group>
    <ms-cell title="常见能力" icon="apps-line" description="高质量组件库" arrow />
    <ms-cell title="价格设置" icon="price-tag-3-line" note="+￥32" arrow />
    <ms-cell title="消息通知" icon="customer-service-line" note="测试" arrow />
    <ms-cell title="标签页面" icon="gift-line" note="测试" arrow :bordered="false" />
  </ms-cell-group>
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'card'` | `'default'` | 主题色 |
| title | `string` | `''` | 标题 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-cell-group/`
- 演示: `#/pages/demo/basic/cell`
