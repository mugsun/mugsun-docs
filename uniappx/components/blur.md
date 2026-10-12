---
title: Blur 磨砂
demo: pages/demo/media/blur
---

# Blur 磨砂

`ms-blur`：磨砂遮罩层：半透明底 + 明暗两档，用于浮层、工具条、图片说明条这类**功能性遮罩**（不做装饰性玻璃拟态）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-blur/components/ms-blur`）。
可选插件：需单独安装 `uni_modules/ms-blur`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/blur`。

## 基础用法

```vue
<template>
  <ms-blur>
    …
  </ms-blur>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| blur | `number` | `12` | 模糊半径（px） |
| tint | `string` | `'light'` | 底色档位 |
| opacity | `number` | `0.85` | 不透明度 |
| radius | `number` | `0` | 圆角（px） |
| padding | `number` | `12` | 内边距（px） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-blur/components/ms-blur/`
- 演示: `#/pages/demo/media/blur`
