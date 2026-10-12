---
title: Link 链接
demo: pages/demo/basic/link
---

# Link 链接

`ms-link`：文字链接：主题色、下划线、前后缀图标、尺寸、禁用；`content` 文案或默认插槽；可选应用内 `href` + `openType`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-link`）。
演示路由：`#/pages/demo/basic/link`。

## 基础用法

```vue
<template>
  <ms-link theme="default" size="sm">
    …
  </ms-link>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | 主题色 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| underline | `boolean` | `false` | 是否显示下划线 |
| disabled | `boolean` | `false` | 是否禁用 |
| href | `string` | `''` | 链接地址 |
| openType | `'navigate' \| 'redirect' \| 'switchTab' \| 'reLaunch'` | `'navigate'` | 跳转方式：navigate / redirect / switchTab / reLaunch |
| icon | `string` | `''` | 图标名（icons.uts） |
| suffixIcon | `string` | `''` | 后缀图标名 |
| content | `string` | `''` | 文案；无默认插槽内容时使用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-link/`
- 演示: `#/pages/demo/basic/link`
