---
title: Form Item 表单项
demo: pages/demo/form/form
---

# Form Item 表单项

`ms-form-item` 是表单项，放在 [`ms-form`](./form) 里使用，由标签、输入控件、帮助文字和错误提示组成。

把当前值传给 `value` 就能参与校验，支持必填、内置格式规则和字符长度限制。

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
| label | `string` | `''` | 标签文案 |
| name | `string` | `''` | 字段名 |
| value | `string` | `''` | 参与校验的当前值（由父页面传入表单数据） |
| required | `boolean` | `false` | 是否必填 |
| requiredMark | `boolean` | `true` | 必填时是否显示红色星号 |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | 内置校验：none / phone / email / number |
| min | `number` | `-1` | 最少字符数，`-1` 表示不限制 |
| max | `number` | `-1` | 最多字符数，`-1` 表示不限制 |
| message | `string` | `''` | 校验失败时显示的文案，留空使用默认文案 |
| help | `string` | `''` | 帮助文案 |
| arrow | `boolean` | `false` | 右侧是否显示箭头 |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | 标签对齐，留空时跟随 `ms-form` |
| labelWidth | `number` | `-1` | 标签宽度（px），`-1` 时跟随 `ms-form` |
| bordered | `boolean` | `true` | 是否显示边框 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| validate | `message: string` | 该项校验结束后触发，`message` 是错误文案，空字符串表示通过 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 输入控件 |
