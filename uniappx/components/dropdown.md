---
title: Dropdown 下拉
demo: pages/demo/nav/dropdown
---

# Dropdown 下拉

`ms-dropdown`：下拉筛选菜单。`menus`（菜单栏）+ 扁平 `options`（用 `menu` 下标关联）驱动，单组件无子组件注册。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-dropdown`）。
演示路由：`#/pages/demo/nav/dropdown`。

## 基础用法

```vue
<template>
  <ms-dropdown>
    …
  </ms-dropdown>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| menus | `UTSJSONObject[]` | `[]` | 菜单栏：label / multiple / columns(1-3) / disabled |
| options | `UTSJSONObject[]` | `[]` | 扁平选项：menu(下标) / label / value / disabled / checked |
| height | `number` | `320` | 组件占位总高（蒸汽禁百分比高度，遮罩铺满该区域） |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnClickOverlay | `boolean` | `true` | 点遮罩是否关闭 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| open | 打开 |
| close | 关闭 |
| confirm | 确认 |
| reset | 重置 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-dropdown/`
- 演示: `#/pages/demo/nav/dropdown`
