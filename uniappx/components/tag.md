---
title: Tag 标签
demo: pages/demo/basic/tag
---

# Tag 标签

`ms-tag`：类目/状态标签。`theme` / `variant` / `size` / `shape` / `closable` / `disabled` / `icon` / `checkable` / `maxWidth`。按压用 opacity（禁 scale）。嵌套 ms-icon 须 `pressable=false`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-tag`）。
演示路由：`#/pages/demo/basic/tag`。

## 基础用法

```vue
<template>
  <ms-tag theme="default" variant="solid">
    …
  </ms-tag>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | 主题色 |
| variant | `'solid' \| 'light' \| 'outline' \| 'light-outline'` | `'light'` | 样式变体 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| shape | `'square' \| 'round' \| 'mark'` | `'square'` | 外形 |
| closable | `boolean` | `false` | 是否可关闭 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `string` | `''` | 图标名（icons.uts） |
| checkable | `boolean` | `false` | 可选中（筛选标签） |
| checked | `boolean` | `false` | 是否选中 |
| maxWidth | `number` | `0` | 文案最大宽度（px）；0 不限制，超出省略 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| update:checked | v-model:checked 更新 |
| change | 值变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tag/`
- 演示: `#/pages/demo/basic/tag`
