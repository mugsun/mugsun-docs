---
title: Keyboard 键盘
demo: pages/demo/form/keyboard
---

# Keyboard 键盘

`ms-keyboard`：自定义键盘：`type` 为 `number` / `password` / `idcard` / `car`，底部 `ms-popup` 弹出。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-keyboard`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/keyboard`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/keyboard.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| visible | `boolean` | `false` | 是否显示 |
| type | `string` | `'number'` | number / password / idcard / car |
| title | `string` | `'安全键盘'` | 标题 |
| maxLen | `number` | `0` | 最大输入长度；0 则按 mode 用内置上限 |
| max | `number` | `0` | 最大值 |
| digit | `boolean` | `true` | 是否数字 / 小数位相关 |
| hold | `boolean` | `false` | 是否支持长按 |
| confirmText | `string` | `'确认'` | 确认按钮文案 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| update:visible | v-model:visible 更新 |
| change | 值变化 |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-keyboard/`
- 演示: `#/pages/demo/form/keyboard`
