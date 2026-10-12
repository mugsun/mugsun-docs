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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| label | `string` | `''` | 标签文案 |
| name | `string` | `''` | 名称 / 字段名 |
| value | `string` | `''` | 参与校验的当前值（由宿主把表单数据传进来） |
| required | `boolean` | `false` | 是否必填 |
| requiredMark | `boolean` | `true` | 必填时是否显示红色星号 |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | 内置校验：none / phone / email / number |
| min | `number` | `-1` | 最小值 |
| max | `number` | `-1` | 最大值 |
| message | `string` | `''` | 校验失败文案 |
| help | `string` | `''` | 帮助文案 |
| arrow | `boolean` | `false` | 右侧是否显示箭头 |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | 标签对齐 |
| labelWidth | `number` | `-1` | 标签宽度（px） |
| bordered | `boolean` | `true` | 是否显示边框 |

## 事件

| 事件 | 说明 |
| --- | --- |
| validate | 校验结束 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-form-item/`
- 演示: `#/pages/demo/form/form`
