---
title: Button 按钮
demo: pages/demo/basic/button
---

# Button 按钮

`ms-button`：语义化按钮。`theme` + `variant` + `size` + `block` + `disabled` + `loading` + `loadingText` + `formType` + `ghost` + `icon` / `iconOnly` + `shape` + `haptic`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-button`）。
演示路由：`#/pages/demo/basic/button`。

## 基础用法

```vue
<template>
  <ms-button theme="default" variant="solid">
    …
  </ms-button>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | — |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | — |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | — |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | — |
| block | `boolean` | `false` | — |
| ghost | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| loading | `boolean` | `false` | — |
| loadingText | `string` | `'加载中…'` | 加载态文案；空串则只显示转圈 |
| icon | `string` | `''` | — |
| iconOnly | `boolean` | `false` | — |
| formType | `'' \| 'submit' \| 'reset'` | `''` | — |
| haptic | `boolean` | `true` | App/小程序点击短震动；Web 无能力自动跳过。cite: api/vibrate.md |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-button/`
- 演示：`#/pages/demo/basic/button`
