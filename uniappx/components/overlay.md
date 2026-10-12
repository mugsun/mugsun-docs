---
title: Overlay 遮罩
demo: pages/demo/basic/overlay
---

# Overlay 遮罩

`ms-overlay`：全屏半透明遮罩，弹层地基。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-overlay`）。
演示路由：`#/pages/demo/basic/overlay`。

## 基础用法

```vue
<template>
  <ms-overlay v-model:visible="open">
    …
  </ms-overlay>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| closable | `boolean` | `true` | — |
| zIndex | `number` | `1000` | — |
| dim | `'light' \| 'normal' \| 'heavy'` | `'normal'` | 遮罩浓度：浅 / 常规 / 深（语义档，非任意颜色字符串） |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| open | 打开 |
| update:visible | v-model:visible 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-overlay/`
- 演示：`#/pages/demo/basic/overlay`
