---
title: Input 输入
demo: pages/demo/form/input
---

# Input 输入

`ms-input`：单行输入。`v-model` + `label` / `placeholder` / `prefixIcon` / `clearable` / `type="password"` / `status` / `tips` / `align` / `disabled`。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-input`）。
演示路由：`#/pages/demo/form/input`。

## 基础用法

```vue
<template>
  <ms-input label="…" v-model="value">
    …
  </ms-input>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| label | `string` | `''` | 标签文案 |
| placeholder | `string` | `''` | 占位文案 |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | 输入类型：text / number / idcard / digit / password 等 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 输入区对齐：left / center / right |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | 状态：default / success / warning / error |
| tips | `string` | `''` | 底部提示文案 |
| prefixIcon | `string` | `''` | 前缀图标名 |
| suffixIcon | `string` | `''` | 后缀图标名 |
| clearable | `boolean` | `false` | 是否可清空 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度；-1 不限 |
| showCount | `boolean` | `false` | 显示字数统计（需 maxlength ≥ 0） |
| bordered | `boolean` | `true` | 是否显示底边框 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | 输入 |
| focus | 聚焦 |
| blur | 失焦 |
| clear | 清空 |
| confirm | 确认 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | `label` 插槽 |
| prefix | `prefix` 插槽 |
| suffix | `suffix` 插槽 |
| tips | `tips` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-input/`
- 演示: `#/pages/demo/form/input`
