---
title: Alert 警告条
demo: pages/demo/feedback/alert
---

# Alert 警告条

`ms-alert`：页内警告条：主题 + 浅色/填充 + 可关闭。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-alert`）。
演示路由：`#/pages/demo/feedback/alert`。

## 基础用法

```vue
<template>
  <ms-alert theme="primary" variant="light">
    …
  </ms-alert>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | — |
| variant | `'light' \| 'solid'` | `'light'` | — |
| closable | `boolean` | `true` | — |
| icon | `string` | `''` | — |
| showIcon | `boolean` | `true` | 不显示左侧图标 |
| title | `string` | `''` | 标题（可选，与默认插槽正文并存） |
| visible | `boolean` | `true` | 是否显示；配合 update:visible，关闭后可由宿主重开 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| update:visible | v-model:visible 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-alert/`
- 演示：`#/pages/demo/feedback/alert`
