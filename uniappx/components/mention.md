---
title: Mention 提及
demo: pages/demo/form/mention
---

# Mention 提及

`ms-mention`：输入触发符（默认 `@`）弹候选面板，选中插入 `@名字 `；退格一次整词删掉一个提及。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-mention`）。
演示路由：`#/pages/demo/form/mention`。

## 基础用法

```vue
<template>
  <ms-mention v-model="value" :disabled="true">
    …
  </ms-mention>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| options | `string[]` | `[]` | — |
| trigger | `string` | `'@'` | — |
| filterable | `boolean` | `true` | — |
| placeholder | `string` | `'输入 @ 提及成员'` | — |
| emptyText | `string` | `'无匹配成员'` | — |
| disabled | `boolean` | `false` | — |
| confirmType | `string` | `'send'` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| mention | mention |
| select | select |
| removemention | removemention |
| confirm | 确认 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-mention/`
- 演示：`#/pages/demo/form/mention`
