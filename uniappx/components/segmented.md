---
title: Segmented 分段
demo: pages/demo/nav/segmented
---

# Segmented 分段

`ms-segmented`：分段控制器：`options` 驱动；block / size；`v-model:value`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-segmented`（源码仓暂未公开）。
演示路由：`#/pages/demo/nav/segmented`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/segmented.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-segmented
    :options="baseOptions"
    :value="baseIndex"
    @change="onBaseChange"
  />
  <ms-segmented
    :options="blockOptions"
    :value="blockIndex"
    block
    @change="onBlockChange"
  />
  <ms-segmented
    :options="iconOptions"
    :value="iconIndex"
    block
    @change="onIconChange"
  />
  <!-- 组件状态 -->
  <ms-segmented
    :options="baseOptions"
    :value="0"
    disabled
  />
  <ms-segmented
    :options="statusOptions"
    :value="statusIndex"
    @change="onStatusChange"
  />
</template>

<script setup lang="uts">
const baseIndex = ref(0)

const baseOptions = [
  { label: '日' } as UTSJSONObject,
  { label: '周' } as UTSJSONObject,
  { label: '月' } as UTSJSONObject,
] as UTSJSONObject[]

const blockIndex = ref(0)

const blockOptions = [
  { label: '全部订单' } as UTSJSONObject,
  { label: '待付款' } as UTSJSONObject,
  { label: '待收货' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconOptions = [
  { label: '消息', icon: 'inbox-line' } as UTSJSONObject,
  { label: '应用', icon: 'apps-line' } as UTSJSONObject,
] as UTSJSONObject[]

const statusIndex = ref(0)

const statusOptions = [
  { label: '可选一' } as UTSJSONObject,
  { label: '可选二' } as UTSJSONObject,
  { label: '禁用', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onBlockChange(index: number) : void {
  console.log('onBlockChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onStatusChange(index: number) : void {
  console.log('onStatusChange')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| options | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / disabled |
| block | `boolean` | `false` | 撑满父宽并均分每项 |
| disabled | `boolean` | `false` | 整体禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度阶梯 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-segmented/`
- 演示: `#/pages/demo/nav/segmented`
