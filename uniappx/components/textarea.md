---
title: Textarea 多行
demo: pages/demo/form/textarea
---

# Textarea 多行

`ms-textarea`：多行输入：标签 / autosize / 字数 / 状态 / 确认类型。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-textarea`）。
演示路由：`#/pages/demo/form/textarea`。

## 基础用法

```vue
<template>
  <ms-textarea label="…" v-model="value">
    …
  </ms-textarea>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| label | `string` | `''` | 标签文案 |
| placeholder | `string` | `''` | 占位文案 |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | 状态：default / success / warning / error |
| tips | `string` | `''` | 提示文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度；-1 不限 |
| indicator | `boolean` | `false` | 是否显示字数统计 |
| autoHeight | `boolean` | `false` | 是否随内容增高 |
| maxHeight | `number` | `0` | autoHeight 时最大高度 px；0 不限制（对标 peer autosize.maxHeight） |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | 固定高度（px）；autoHeight 时作最小高度 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 文本对齐 |
| bordered | `boolean` | `true` | 是否显示边框 |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | 键盘确认键类型 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | 输入 |
| focus | 聚焦 |
| blur | 失焦 |
| confirm | 确认 |
| linechange | linechange |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | `label` 插槽 |
| tips | `tips` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-textarea/`
- 演示: `#/pages/demo/form/textarea`
