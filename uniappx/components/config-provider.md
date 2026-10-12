---
title: Config Provider 主题提供
demo: pages/demo/basic/config-provider
---

# Config Provider 主题提供

`ms-config-provider`：局部主题容器：把 `themeVars` 写成子树内联 CSS 变量，可整段切暗色。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-config-provider`）。
演示路由：`#/pages/demo/basic/config-provider`。

## 基础用法

```vue
<template>
  <ms-config-provider theme="…">
    …
  </ms-config-provider>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | `null` |
| theme | `string` | `'light'` | `light` / `dark` |
| block | `boolean` | `true` | 是否撑满宽度 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-config-provider/`
- 演示: `#/pages/demo/basic/config-provider`
