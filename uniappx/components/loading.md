---
title: Loading 加载
demo: pages/demo/basic/loading
---

# Loading 加载

`ms-loading`：加载：原生 `<loading>` + 文案；横/竖布局；tone；默认插槽优先于 text。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-loading`）。
演示路由：`#/pages/demo/basic/loading`。

## 基础用法

```vue
<template>
  <ms-loading size="sm" text="…">
    …
  </ms-loading>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | 展示文案 |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | 布局 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | tone |
| indicator | `boolean` | `true` | 是否显示指示器 |
| paused | `boolean` | `false` | 是否开启 paused |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-loading/`
- 演示: `#/pages/demo/basic/loading`
