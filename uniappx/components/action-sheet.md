---
title: Action Sheet 动作面板
demo: pages/demo/feedback/action-sheet
---

# Action Sheet 动作面板

`ms-action-sheet`：底部动作面板：`items` 传菜单项，选中抛下标并自动关闭。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-action-sheet`）。
演示路由：`#/pages/demo/feedback/action-sheet`。

## 基础用法

```vue
<template>
  <ms-action-sheet theme="list" v-model:visible="open">
    …
  </ms-action-sheet>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / description / icon / tone('default'\|'primary'\|'danger') / disabled |
| theme | `'list' \| 'grid'` | `'list'` | — |
| align | `'center' \| 'left'` | `'center'` | — |
| description | `string` | `''` | — |
| showCancel | `boolean` | `true` | — |
| cancelText | `string` | `'取消'` | — |
| closeOnOverlayClick | `boolean` | `true` | — |
| zIndex | `number` | `1000` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| select | select |
| cancel | 取消 |
| close | 关闭 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-action-sheet/`
- 演示：`#/pages/demo/feedback/action-sheet`
