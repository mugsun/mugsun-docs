---
title: Popover 气泡
demo: pages/demo/feedback/popover
---

# Popover 气泡

`ms-popover` 是气泡提示。触发元素放在默认插槽中，气泡内容通过 `content` 属性或 `content` 插槽设置。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-popover
    :visible="showArrow"
    content="弹出气泡内容"
    placement="top"
    @update:visible="onArrowVisible"
  >
    <ms-button size="sm" variant="outline" theme="primary" @click="tapArrow">
      带箭头
    </ms-button>
  </ms-popover>
  <ms-popover
    :visible="showNoArrow"
    content="弹出气泡内容"
    placement="top"
    :show-arrow="false"
    @update:visible="onNoArrowVisible"
  >
    <ms-button size="sm" variant="outline" theme="primary" @click="tapNoArrow">
      不带箭头
    </ms-button>
  </ms-popover>
  <ms-popover
    :visible="showCustom"
    placement="top"
    @update:visible="onCustomVisible"
  >
    <template #content>
      <view>
        <text>选项 1</text>
        <text>选项 2</text>
        <text>选项 3</text>
      </view>
    </template>
    <ms-button size="sm" variant="outline" theme="primary" @click="tapCustom">
      自定义内容
    </ms-button>
  </ms-popover>
</template>

<script setup lang="uts">
const showArrow = ref(false)

const showCustom = ref(false)

const showNoArrow = ref(false)

function onArrowVisible(value: boolean): void {
  showArrow.value = value
}

function tapArrow() : void {
  console.log('tapArrow')
}

function onNoArrowVisible(value: boolean): void {
  showNoArrow.value = value
}

function tapNoArrow() : void {
  console.log('tapNoArrow')
}

function onCustomVisible(value: boolean): void {
  showCustom.value = value
}

function tapCustom() : void {
  console.log('tapCustom')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| content | `string` | `''` | 气泡里的文字；更复杂的内容用 `content` 插槽 |
| placement | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` | 气泡相对触发元素的位置 |
| theme | `'dark' \| 'light' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'dark'` | 配色 |
| showArrow | `boolean` | `true` | 是否显示箭头 |
| closeOnClickOutside | `boolean` | `true` | 点击气泡以外的区域是否关闭 |
| zIndex | `number` | `900` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| visible-change | `value: boolean` | 显示状态变化时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 触发元素，点击后显示或隐藏气泡 |
| content | 自定义气泡内容，默认显示 `content` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 显示气泡，需配合 `v-model:visible` |
| `close()` | 隐藏气泡，需配合 `v-model:visible` |
