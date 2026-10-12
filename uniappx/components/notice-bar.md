---
title: Notice Bar 通知栏
demo: pages/demo/feedback/notice-bar
---

# Notice Bar 通知栏

`ms-notice-bar`：顶部通知栏：主题、单行省略、竖向 swiper 轮播、可关闭。不含 CSS 跑马灯动画（蒸汽禁 @keyframes）。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-notice-bar`）。
演示路由：`#/pages/demo/feedback/notice-bar`。

## 基础用法

```vue
<template>
  <ms-notice-bar theme="default">
    …
  </ms-notice-bar>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 主题色 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| content | `string` | `''` | 内容文案 |
| list | `string[]` | `[]` | 数据列表 |
| closable | `boolean` | `false` | 是否可关闭 |
| icon | `string` | `'megaphone-line'` | 图标名（icons.uts） |
| showIcon | `boolean` | `true` | 是否显示左侧图标；icon 为空时也隐藏 |
| operation | `string` | `''` | 右侧操作文案 |
| suffixIcon | `string` | `''` | 右侧后缀图标（如箭头）；与 closable 互斥时优先 closable |
| interval | `number` | `3000` | 竖向轮播间隔（ms） |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| operation | operation |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-notice-bar/`
- 演示: `#/pages/demo/feedback/notice-bar`
