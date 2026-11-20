---
title: Modal Page 整页模态
demo: pages/demo/feedback/modal-page
---

# Modal Page 整页模态

`ms-modal-page` 是覆盖整个屏幕的模态页面，带标题栏和关闭按钮，内容区可以滚动，底部可以放操作按钮。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-modal-page v-model:visible="basicVisible" title="整页详情" @open="onOpen" @close="onClose">
    <text>这是基础整页模态内容。可滚动长文区域。</text>
    <text>第二段说明：盖住宿主页，不走原生独立窗口。</text>
  </ms-modal-page>
  <ms-modal-page v-model:visible="footerVisible" title="带底栏">
    <text>内容区下方有确认操作。</text>
    <template #footer>
      <ms-button block theme="primary" @click="footerVisible = false">完成</ms-button>
    </template>
  </ms-modal-page>
  <ms-modal-page v-model:visible="customVisible" title="订单确认 · 自定义">
    <text>自定义标题示例。</text>
  </ms-modal-page>
</template>

<script setup lang="uts">
const basicVisible = ref(false)

const customVisible = ref(false)

const footerVisible = ref(false)

function onOpen() : void {
  console.log('onOpen')
}

function onClose() : void {
  console.log('onClose')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| closeOnOverlayClick | `boolean` | `false` | 点击遮罩是否关闭 |
| zIndex | `number` | `1100` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| close | — | 关闭时触发 |
| open | — | 打开时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 页面内容，超出时可以滚动 |
| footer | 底部操作区 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 打开，需配合 `v-model:visible` |
| `close()` | 关闭，需配合 `v-model:visible` |
