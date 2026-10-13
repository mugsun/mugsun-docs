---
title: Checkbox Group 多选组
demo: pages/demo/form/checkbox
---

# Checkbox Group 多选组

`ms-checkbox-group`：多选分组：`v-model` 为 `string[]`，支持整组禁用、`max` 上限与横排换行。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-checkbox-group`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/checkbox`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/checkbox.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件分组 -->
  <ms-checkbox-group v-model="groupValue" :max="2" @change="onGroupChange">
    <ms-checkbox value="a" label="选项 A" block />
    <ms-checkbox value="b" label="选项 B" block />
    <ms-checkbox value="c" label="选项 C" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="rowValue" horizontal>
    <view>
      <ms-checkbox value="x" label="横排一" />
    </view>
    <view>
      <ms-checkbox value="y" label="横排二" />
    </view>
  </ms-checkbox-group>
  <!-- 组件深度 -->
  <ms-checkbox-group v-model="disabledGroup" disabled>
    <ms-checkbox value="1" label="禁用组甲" block />
    <ms-checkbox value="2" label="禁用组乙" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="childValue" @change="onChildChange">
    <ms-checkbox value="a" label="子项 A" block />
    <ms-checkbox value="b" label="子项 B" block />
  </ms-checkbox-group>
</template>

<script setup lang="uts">
const childValue = ref(['a'] as string[])

const disabledGroup = ref(['1'] as string[])

const groupValue = ref(['a'] as string[])

const rowValue = ref(['x'] as string[])

function onGroupChange(values: string[]) : void {
  console.log('onGroupChange')
}

function onChildChange(values: string[]) : void {
  console.log('onChildChange')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | 绑定值（v-model） |
| disabled | `boolean` | `false` | 是否禁用 |
| max | `number` | `-1` | 最大值 |
| horizontal | `boolean` | `false` | 是否横向 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-checkbox-group/`
- 演示: `#/pages/demo/form/checkbox`
