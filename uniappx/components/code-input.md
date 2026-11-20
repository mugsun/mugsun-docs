---
title: Code Input 验证码
demo: pages/demo/form/code-input
---

# Code Input 验证码

`ms-code-input` 是验证码输入框，点击任意格子唤起键盘，填满后触发 `complete` 并收起键盘。

格子外观、占位符样式和密码显示都可以配置。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-code-input v-model="vOutline" />
  <ms-code-input v-model="vFill" skin="fill" />
  <!-- 组件状态 -->
  <ms-code-input v-model="vLine" place-shape="line" />
  <ms-code-input v-model="vPassword" password />
  <ms-code-input model-value="12" disabled />
  <!-- 组件长度 -->
  <ms-code-input v-model="vFour" @complete="onComplete" />
  <ms-code-input v-model="vSix" :length="6" skin="fill" @complete="onComplete" />
  <!-- 组件深度 -->
  <ms-code-input v-model="vDot" place-shape="dot" />
  <ms-code-input v-model="vAuto" auto-focus />
  <ms-code-input ref="ctrlCode" v-model="vCtrl" :auto-focus="false" />
</template>

<script setup lang="uts">
const vAuto = ref('')

const vCtrl = ref('')

const vDot = ref('')

const vFill = ref('34')

const vFour = ref('')

const vLine = ref('5')

const vOutline = ref('12')

const vPassword = ref('678')

const vSix = ref('12345')

function onComplete(value: string) : void {
  console.log('onComplete')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| length | `number` | `4` | 验证码位数 |
| skin | `'outline' \| 'fill'` | `'outline'` | 外观：outline / fill |
| placeShape | `'none' \| 'line' \| 'dot'` | `'dot'` | 未填位占位：none / line / dot |
| password | `boolean` | `false` | 是否密码输入 |
| disabled | `boolean` | `false` | 是否禁用 |
| autoFocus | `boolean` | `false` | 是否自动聚焦 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容变化时触发，用于 `v-model` |
| change | `value: string` | 输入内容变化时触发 |
| complete | `value: string` | 填满全部位数时触发 |
| click | `value: string` | 点击输入框时触发，`value` 是当前已输入的内容；禁用时不触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `focus()` | 聚焦并唤起键盘，禁用时无效 |
| `blur()` | 取消聚焦，收起键盘 |
| `clear()` | 清空已输入的内容，禁用时无效 |
