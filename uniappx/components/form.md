---
title: Form 表单
demo: pages/demo/form/form
---

# Form 表单

`ms-form`：表单容器：下发 `labelAlign`（`left/right/top`）、`labelWidth`、`colon`、`showErrorMessage`、`disabled` 给 `ms-form-item`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-form`）。
演示路由：`#/pages/demo/form/form`。

## 基础用法

```vue
<template>
  <ms-form :disabled="true">
    …
  </ms-form>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| labelAlign | `'left' \| 'right' \| 'top'` | `'right'` | — |
| labelWidth | `number` | `81` | — |
| colon | `boolean` | `false` | — |
| showErrorMessage | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |
| validateTick | `number` | `0` | +1 触发一次全量校验（避免页面持有组件 ref 调方法） |
| resetTick | `number` | `0` | +1 清空全部错误 |

## 事件

| 事件 | 说明 |
| --- | --- |
| validate | 校验结束 |
| submit | 提交 |
| error | 错误 |
| reset | 重置 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-form/`
- 演示：`#/pages/demo/form/form`
