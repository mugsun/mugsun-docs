---
title: Result 结果
demo: pages/demo/display/result
---

# Result 结果

`ms-result`：结果页反馈。图标/图片 + 标题 + 描述 + 可选操作区。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-result`）。
演示路由：`#/pages/demo/display/result`。

## 基础用法

```vue
<template>
  <ms-result theme="default" title="…">
    …
  </ms-result>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 主题色 |
| title | `string` | `''` | 标题 |
| description | `string` | `''` | 描述文案 |
| icon | `string` | `''` | 覆盖主题默认图标；'none' 表示不显示图标 |
| image | `string` | `''` | 图片地址，有值时优先于图标 |
| showActions | `boolean` | `false` | 是否渲染操作区（默认插槽） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| description | `description` 插槽 |
| title | `title` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-result/`
- 演示: `#/pages/demo/display/result`
