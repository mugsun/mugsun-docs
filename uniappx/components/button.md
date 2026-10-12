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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | 主题色：default / primary / danger / success / warning / light |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | 样式：solid / outline / dashed / text |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸：xs / sm / md / lg |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | 外形：rectangle / square / round / circle |
| block | `boolean` | `false` | 是否通栏宽度 |
| ghost | `boolean` | `false` | 幽灵按钮（透明底描边） |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| loadingText | `string` | `'加载中…'` | 加载态文案；空串则只显示转圈 |
| icon | `string` | `''` | 左侧图标名；与文案并存 |
| iconOnly | `boolean` | `false` | 仅图标（正方形触控区） |
| formType | `'' \| 'submit' \| 'reset'` | `''` | 原生表单类型：submit / reset；空为普通按钮 |
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

- 组件目录: `uni_modules/ms-ui/components/ms-button/`
- 演示: `#/pages/demo/basic/button`
