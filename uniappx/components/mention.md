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
  <ms-mention v-model="value">
    …
  </ms-mention>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| options | `string[]` | `[]` | 选项列表 |
| trigger | `string` | `'@'` | 触发时机 |
| filterable | `boolean` | `true` | 是否可筛选 |
| placeholder | `string` | `'输入 @ 提及成员'` | 占位文案 |
| emptyText | `string` | `'无匹配成员'` | 空态文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| confirmType | `string` | `'send'` | 键盘确认类型 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-mention/`
- 演示: `#/pages/demo/form/mention`
