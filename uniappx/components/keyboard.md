---
title: Keyboard 键盘
demo: pages/demo/form/keyboard
---

# Keyboard 键盘

`ms-keyboard` 是从底部弹出的自定义键盘，有数字、密码、身份证和车牌四种键盘，用 `type` 切换。

输入内容用 `v-model` 绑定，显示状态用 `v-model:visible` 绑定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-keyboard
    v-model="numberValue"
    v-model:visible="numberVisible"
    type="number"
    :max="100"
    :max-len="6"
    @confirm="onNumberConfirm"
  />
  <ms-keyboard
    v-model="intValue"
    v-model:visible="intVisible"
    type="number"
    :digit="false"
    :max-len="8"
    @confirm="onIntConfirm"
  />
  <ms-keyboard
    v-model="passwordValue"
    v-model:visible="passwordVisible"
    type="password"
    :max-len="12"
    @confirm="onPasswordConfirm"
  />
</template>

<script setup lang="uts">
const intValue = ref('')

const intVisible = ref(false)

const numberValue = ref('')

const numberVisible = ref(false)

const passwordValue = ref('')

const passwordVisible = ref(false)

function onNumberConfirm(value: string) : void {
  console.log('onNumberConfirm')
}

function onIntConfirm(value: string) : void {
  console.log('onIntConfirm')
}

function onPasswordConfirm(value: string) : void {
  console.log('onPasswordConfirm')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| visible | `boolean` | `false` | 是否显示 |
| type | `string` | `'number'` | 键盘类型：number 数字 / password 密码 / idcard 身份证 / car 车牌 |
| title | `string` | `'安全键盘'` | 标题 |
| maxLen | `number` | `0` | 最大输入长度；`0` 时身份证为 18 位，车牌为 8 位，其他类型不限制 |
| max | `number` | `0` | 数字键盘允许输入的最大值，`0` 表示不限制 |
| digit | `boolean` | `true` | 数字键盘是否带小数点和 `00` 键 |
| hold | `boolean` | `false` | 点击确认后是否保持键盘打开 |
| confirmText | `string` | `'确认'` | 确认按钮文案 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容变化时触发，用于 `v-model` |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| change | `value: string` | 输入内容变化时触发 |
| confirm | `value: string, pass?: boolean` | 点击确认时触发；`type` 为 `idcard` 时多一个参数 `pass`，表示身份证号是否通过校验 |
| cancel | `value: string` | 点击关闭按钮时触发，`value` 是当前输入内容 |
| close | — | 键盘关闭时触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 打开键盘，需配合 `v-model:visible` |
| `close()` | 关闭键盘，需配合 `v-model:visible` |
| `clear()` | 清空输入内容 |
