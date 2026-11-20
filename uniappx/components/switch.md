---
title: Switch 开关
demo: pages/demo/form/switch
---

# Switch 开关

`ms-switch` 是开关，用 `v-model` 绑定状态，可以为开和关分别设置文字或图标，有三种尺寸。

`loading` 为 `true` 时显示加载状态，这时不能切换。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-switch v-model="vBase" />
  <ms-switch v-model="vLabel" :label="['开', '关']" />
  <ms-switch v-model="vIcon" active-icon="check-line" void-icon="close-line" />
  <!-- 组件状态 -->
  <ms-switch :model-value="true" loading />
  <ms-switch :model-value="false" disabled />
  <!-- 组件尺寸 -->
  <ms-switch v-model="vSize" size="sm" />
  <ms-switch v-model="vSize" size="md" />
  <ms-switch v-model="vSize" size="lg" />
  <!-- 组件深度 -->
  <ms-switch v-model="vDepthLabel" size="lg" :label="['开', '关']" />
  <ms-switch
    :model-value="true"
    loading
    active-icon="check-line"
    void-icon="close-line"
  />
  <ms-switch :model-value="true" disabled :label="['开', '关']" />
</template>

<script setup lang="uts">
const vBase = ref(false)

const vDepthLabel = ref(true)

const vIcon = ref(true)

const vLabel = ref(true)

const vSize = ref(true)
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 绑定值（v-model） |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否显示加载状态，加载时不能切换 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸：sm / md / lg |
| label | `string[]` | `[]` | 关和开两种状态的文字，格式为 `[关, 开]`，留空不显示 |
| activeIcon | `string` | `''` | 开启时的图标名 |
| voidIcon | `string` | `''` | 关闭时的图标名 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: boolean` | 状态切换时触发，用于 `v-model` |
| change | `value: boolean` | 状态切换时触发，`value` 是新的状态 |
