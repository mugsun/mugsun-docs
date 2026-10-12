---
title: Drawer 抽屉
demo: pages/demo/feedback/drawer
---

# Drawer 抽屉

`ms-drawer`：侧边抽屉：标题 + 可滚菜单列表 + 底部插槽，从左或右弹出。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-drawer`）。
演示路由：`#/pages/demo/feedback/drawer`。

## 基础用法

```vue
<template>
  <ms-drawer title="…" v-model:visible="open">
    …
  </ms-drawer>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| placement | `'left' \| 'right'` | `'right'` | 弹出/摆放位置 |
| title | `string` | `''` | 标题 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 title / icon / disabled |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| closeOnSelect | `boolean` | `true` | 点菜单项后是否自动关闭 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| item-click | 点击菜单项 |
| overlay-click | 点击遮罩 |
| close | 关闭 |
| open | 打开 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-drawer/`
- 演示: `#/pages/demo/feedback/drawer`
