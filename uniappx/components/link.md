---
title: Link 链接
demo: pages/demo/basic/link
---

# Link 链接

`ms-link`：文字链接：主题色、下划线、前后缀图标、尺寸、禁用；`content` 文案或默认插槽；可选应用内 `href` + `openType`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-link`）。
演示路由：`#/pages/demo/basic/link`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/link.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 主题 -->
  <ms-link theme="default">默认</ms-link>
  <ms-link theme="primary">主色</ms-link>
  <ms-link theme="danger">危险</ms-link>
  <!-- 下划线 -->
  <ms-link theme="primary">无下划线</ms-link>
  <ms-link theme="primary" :underline="true">下划线</ms-link>
  <!-- 图标 -->
  <ms-link theme="primary" icon="links-line">前缀</ms-link>
  <ms-link theme="primary" suffix-icon="arrow-right-s-line">后缀</ms-link>
  <!-- 尺寸 -->
  <ms-link size="sm" theme="primary">小号</ms-link>
  <ms-link size="md" theme="primary">中号</ms-link>
  <ms-link size="lg" theme="primary">大号</ms-link>
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
