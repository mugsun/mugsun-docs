---
title: Toast 轻提示
demo: pages/demo/feedback/toast
---

# Toast 轻提示

`ms-toast` 是轻提示，支持文字、图标和加载三种形式，可显示在顶部、中间或底部，可选显示遮罩。

显示状态用 `v-model:visible` 绑定，到达 `duration` 后自动关闭。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-toast
    :visible="showPlain"
    message="操作成功"
    @update:visible="onPlainVisible"
  />
  <ms-toast
    :visible="showMultiLine"
    message="这是一条比较长的提示文案，会折行显示，最多两三行"
    @update:visible="onMultiVisible"
  />
  <ms-toast
    :visible="showRowIcon"
    message="横向图标"
    icon="star-line"
    @update:visible="onRowVisible"
  />
</template>

<script setup lang="uts">
const showMultiLine = ref(false)

const showPlain = ref(false)

const showRowIcon = ref(false)

function onPlainVisible(value: boolean): void {
  showPlain.value = value
}

function onMultiVisible(value: boolean): void {
  showMultiLine.value = value
}

function onRowVisible(value: boolean): void {
  showRowIcon.value = value
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| message | `string` | `''` | 提示文字 |
| theme | `'default' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'default'` | 类型：default 纯文字 / success / warning / error / loading 加载中 |
| icon | `string` | `''` | 自定义图标名，类型自带图标时可以不填 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 图标和文字的排列方向：horizontal 横向 / vertical 纵向 |
| placement | `'top' \| 'middle' \| 'bottom'` | `'middle'` | 显示位置：top / middle / bottom |
| duration | `number` | `2000` | 自动关闭的时间（ms），`0` 表示不自动关闭 |
| showOverlay | `boolean` | `false` | 是否显示遮罩，显示时下方的内容无法点击 |
| zIndex | `number` | `1100` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 自动关闭时触发，用于 `v-model:visible` |
| close | — | 自动关闭时触发 |
