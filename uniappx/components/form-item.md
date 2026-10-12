---
title: Form Item 表单项
demo: pages/demo/form/form
---

# Form Item 表单项

`ms-form-item`：表单项：标签 + 内容插槽 + 辅助说明 / 错误文案，可带必填星号与右箭头。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-form-item`）。
演示路由：`#/pages/demo/form/form`。

## 基础用法

```vue
<template>
  <ms-form-item label="…" name="…">
    …
  </ms-form-item>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| label | `string` | `''` | — |
| name | `string` | `''` | — |
| value | `string` | `''` | 参与校验的当前值（由宿主把表单数据传进来） |
| required | `boolean` | `false` | — |
| requiredMark | `boolean` | `true` | — |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | — |
| min | `number` | `-1` | — |
| max | `number` | `-1` | — |
| message | `string` | `''` | — |
| help | `string` | `''` | — |
| arrow | `boolean` | `false` | — |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | — |
| labelWidth | `number` | `-1` | — |
| bordered | `boolean` | `true` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| validate | 校验结束 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-form-item/`
- 演示：`#/pages/demo/form/form`
