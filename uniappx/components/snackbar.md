---
title: Snackbar 消息条
demo: pages/demo/feedback/snackbar
---

# Snackbar 消息条

`ms-snackbar`：顶部/底部消息条：浅色语义底 + 图标 + 文案，可带关闭或操作按钮，到时自动关。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-snackbar`）。
演示路由：`#/pages/demo/feedback/snackbar`。

## 基础用法

```vue
<template>
  <ms-snackbar theme="info" v-model:visible="open">
    …
  </ms-snackbar>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| content | `string` | `''` | 内容文案 |
| theme | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 主题色 |
| showIcon | `boolean` | `true` | 是否显示主题默认图标 |
| icon | `string` | `''` | 自定义图标名（icons.uts）；空串时用 theme 默认 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| actionText | `string` | `''` | 右侧操作文案；空串不显示 |
| placement | `'top' \| 'bottom'` | `'top'` | 弹出/摆放位置 |
| align | `'left' \| 'center'` | `'left'` | 文案对齐：left / center |
| block | `boolean` | `false` | 通栏：去掉 max-width，横条贴边铺满 |
| duration | `number` | `3000` | 毫秒；0 表示不自动关闭 |
| zIndex | `number` | `1200` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |
| action | 操作按钮 |
| duration-end | duration-end |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-snackbar/`
- 演示: `#/pages/demo/feedback/snackbar`
