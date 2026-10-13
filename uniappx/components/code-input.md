---
title: Code Input 验证码
demo: pages/demo/form/code-input
---

# Code Input 验证码

`ms-code-input`：验证码格：透明 `input` 盖住整排格子拉键盘；`skin` / `placeShape` / `password` / `autoFocus`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-code-input`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/code-input`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/code-input.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| length | `number` | `4` | 位数 |
| skin | `'outline' \| 'fill'` | `'outline'` | 外观：outline / fill |
| placeShape | `'none' \| 'line' \| 'dot'` | `'dot'` | 未填位占位：none / line / dot |
| password | `boolean` | `false` | 是否密码输入 |
| disabled | `boolean` | `false` | 是否禁用 |
| autoFocus | `boolean` | `false` | 是否自动聚焦 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| complete | complete |
| click | 点击 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-code-input/`
- 演示: `#/pages/demo/form/code-input`
