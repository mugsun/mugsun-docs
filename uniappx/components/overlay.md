---
title: Overlay 遮罩
demo: pages/demo/basic/overlay
---

# Overlay 遮罩

`ms-overlay` 是全屏半透明遮罩，是各类弹出层的基础组件。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-overlay
    :visible="showBase"
    @update:visible="onBaseVisible"
    @click="onBaseMaskClick"
  />
  <ms-overlay :visible="showContent" @update:visible="onContentVisible">
    <ms-sheet margin="page" radius="lg" shadow>
      <ms-text>遮罩上的内容块</ms-text>
      <view>
        <ms-button size="sm" theme="primary" @click="closeContent">关闭</ms-button>
      </view>
    </ms-sheet>
  </ms-overlay>
  <ms-overlay :visible="showLock" :closable="false" @update:visible="onLockVisible">
    <ms-sheet margin="page" radius="lg">
      <ms-text>点遮罩不会关闭</ms-text>
      <view>
        <ms-button size="sm" theme="primary" @click="closeLock">知道了</ms-button>
      </view>
    </ms-sheet>
  </ms-overlay>
</template>

<script setup lang="uts">
const showBase = ref(false)

const showContent = ref(false)

const showLock = ref(false)

function onBaseVisible(value: boolean): void {
  showBase.value = value
}

function onBaseMaskClick() : void {
  console.log('onBaseMaskClick')
}

function onContentVisible(value: boolean): void {
  showContent.value = value
}

function closeContent(): void {
  showContent.value = false
}

function onLockVisible(value: boolean): void {
  showLock.value = value
}

function closeLock(): void {
  showLock.value = false
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| closable | `boolean` | `true` | 点击遮罩是否关闭 |
| zIndex | `number` | `1000` | 层级 z-index |
| dim | `'light' \| 'normal' \| 'heavy'` | `'normal'` | 遮罩深浅：light 浅 / normal 常规 / heavy 深 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击遮罩时触发 |
| close | — | 遮罩关闭时触发 |
| open | — | 淡入动画结束后触发 |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 遮罩上居中显示的内容 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 打开遮罩，需配合 `v-model:visible` |
| `close()` | 关闭遮罩，需配合 `v-model:visible` |
