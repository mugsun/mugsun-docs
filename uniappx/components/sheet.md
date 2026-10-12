---
title: Sheet 容器
demo: pages/demo/basic/sheet
---

# Sheet 容器

`ms-sheet`：卡片/容器面。`variant` / `radius` / `padding` / `margin` / `bordered` / `shadow` / `loading` / `url` / `pressable`（对齐 x-sheet isLink）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-sheet`）。
演示路由：`#/pages/demo/basic/sheet`。

## 基础用法

```vue
<template>
  <ms-sheet variant="default">
    …
  </ms-sheet>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | 变体样式 |
| radius | `'md' \| 'lg'` | `'lg'` | 圆角（px） |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | 内边距（px） |
| margin | `'none' \| 'page'` | `'none'` | margin |
| bordered | `boolean` | `false` | 是否带边框 |
| shadow | `boolean` | `false` | 是否开启 shadow |
| loading | `boolean` | `false` | 是否加载中 |
| url | `string` | `''` | 地址 |
| pressable | `boolean` | `false` | 可点按压反馈；有 url 时默认视为可点 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sheet/`
- 演示: `#/pages/demo/basic/sheet`
