---
title: Radio Group 单选组
demo: pages/demo/form/radio
---

# Radio Group 单选组

`ms-radio-group`：单选分组：`v-model` 为 `string`，互斥选中，支持整组禁用与横排换行。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-radio-group`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/radio`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/radio.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件分组 -->
  <ms-radio-group v-model="groupValue">
    <ms-radio value="a" label="选项 A" block />
    <ms-radio value="b" label="选项 B" block />
    <ms-radio value="c" label="选项 C" block />
  </ms-radio-group>
  <ms-radio-group v-model="rowValue" horizontal>
    <view>
      <ms-radio value="x" label="横排一" />
    </view>
    <view>
      <ms-radio value="y" label="横排二" />
    </view>
  </ms-radio-group>
  <!-- 组件深度 -->
  <ms-radio-group v-model="disabledGroup" disabled>
    <ms-radio value="1" label="禁用组甲" block />
    <ms-radio value="2" label="禁用组乙" block />
  </ms-radio-group>
  <ms-radio-group v-model="uncheckGroup" allow-uncheck>
    <ms-radio value="a" label="组内 A" block />
    <ms-radio value="b" label="组内 B" block />
  </ms-radio-group>
</template>

<script setup lang="uts">
const disabledGroup = ref('1')

const groupValue = ref('a')

const rowValue = ref('x')

const uncheckGroup = ref('a')
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| disabled | `boolean` | `false` | 是否禁用 |
| horizontal | `boolean` | `false` | 是否横向 |
| allowUncheck | `boolean` | `false` | 是否允许取消选中 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-radio-group/`
- 演示: `#/pages/demo/form/radio`
