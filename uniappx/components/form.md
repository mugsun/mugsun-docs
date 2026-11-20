---
title: Form 表单
demo: pages/demo/form/form
---

# Form 表单

`ms-form` 是表单容器，统一设置其中 [`ms-form-item`](./form-item) 的标签对齐方式、标签宽度和禁用状态。

校验不需要调用组件方法，把 `validateTick` 加一就校验全部表单项，把 `resetTick` 加一就清空错误。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-form label-align="right" :label-width="72">
    <ms-form-item label="用户名" name="name" :value="hName">
      <ms-input v-model="hName" placeholder="请输入用户名" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="密码" name="password" :value="hPassword" :bordered="false">
      <ms-input
        v-model="hPassword"
        type="password"
        placeholder="请输入密码"
        :bordered="false"
      />
    </ms-form-item>
  </ms-form>
  <ms-form label-align="top">
    <ms-form-item label="昵称" name="nick" :value="vNick" :bordered="false">
      <ms-input v-model="vNick" placeholder="请输入昵称" />
    </ms-form-item>
  </ms-form>
  <!-- 组件状态 -->
  <ms-form label-align="left" :label-width="72" colon>
    <ms-form-item label="必填" name="req" :value="sReq" required help="必填项带红色星号">
      <ms-input v-model="sReq" placeholder="请输入内容" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="说明" name="help" :value="sHelp" help="下方为辅助说明文案">
      <ms-input v-model="sHelp" placeholder="可不填" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="箭头" name="arrow" :value="sArrow" arrow :bordered="false">
      <ms-input v-model="sArrow" placeholder="点选类字段" readonly :bordered="false" />
    </ms-form-item>
  </ms-form>
</template>

<script setup lang="uts">
const hName = ref('mugsun')

const hPassword = ref('')

const sArrow = ref('')

const sHelp = ref('')

const sReq = ref('')

const vNick = ref('')
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| labelAlign | `'left' \| 'right' \| 'top'` | `'right'` | 标签对齐 |
| labelWidth | `number` | `81` | 标签宽度（px） |
| colon | `boolean` | `false` | 标签后是否显示冒号 |
| showErrorMessage | `boolean` | `true` | 是否显示校验错误提示 |
| disabled | `boolean` | `false` | 是否禁用整个表单 |
| validateTick | `number` | `0` | 每加一触发一次全部表单项的校验 |
| resetTick | `number` | `0` | 每加一清空一次全部错误提示 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| validate | `valid: boolean` | 每次校验结束后触发，`valid` 表示是否全部通过 |
| submit | `valid: boolean` | 校验全部通过时触发 |
| error | `message: string` | 校验未通过时触发，`message` 是第一条错误，由字段名、冒号和错误文案组成 |
| reset | `ok: boolean` | `resetTick` 变化、错误清空后触发，值为 `true` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 放置 `ms-form-item` |
