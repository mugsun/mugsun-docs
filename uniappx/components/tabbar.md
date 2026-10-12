---
title: Tabbar 底栏
demo: pages/demo/nav/tabbar
---

# Tabbar 底栏

`ms-tabbar`：底部导航：纯文字 / 图标 / 徽标；`v-model:value`；fixed + placeholder。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-tabbar`）。
演示路由：`#/pages/demo/nav/tabbar`。

## 基础用法

```vue
<template>
  <ms-tabbar theme="normal">
    …
  </ms-tabbar>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled |
| theme | `'normal' \| 'tag'` | `'normal'` | — |
| shape | `'normal' \| 'round'` | `'normal'` | — |
| bordered | `boolean` | `true` | 顶部外边框 |
| split | `boolean` | `false` | 项间分割线 |
| fixed | `boolean` | `true` | — |
| placeholder | `boolean` | `false` | fixed 时在文档流占位，避免压住页面底部内容 |
| safeAreaInsetBottom | `boolean` | `true` | — |
| zIndex | `number` | `400` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-tabbar/`
- 演示：`#/pages/demo/nav/tabbar`
