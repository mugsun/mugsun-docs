---
title: Sign Board 签名
demo: pages/demo/form/sign-board
---

# Sign Board 签名

`ms-sign-board` 是手写签名板，用手指在画布上书写，Web 端也可以用鼠标。

签名图片通过 `getImage()` 方法取得。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-sign-board ref="boardRef" :pen-type="penType" @end="onStrokeEnd" />
  <!-- 组件样式 -->
  <ms-sign-board ref="pencilRef" pen-type="pencil" :stroke-width="6" />
  <!-- 组件深度 -->
  <ms-sign-board pen-type="pen" :stroke-width="14" />
  <ms-sign-board disabled :stroke-width="8" />
  <ms-sign-board pen-type="pencil" :stroke-width="3" />
</template>

<script setup lang="uts">
const penType = ref('default')

function onStrokeEnd() : void {
  console.log('onStrokeEnd')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| penType | `string` | `'default'` | 笔迹样式：default / pen / pencil |
| strokeWidth | `number` | `8` | 笔迹的基准宽度（px） |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| start | — | 开始书写一笔时触发 |
| end | — | 一笔写完时触发 |
| clear | — | 清空画布时触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `clear()` | 清空画布 |
| `getLineCount(): number` | 返回已写的笔画数 |
| `isEmpty(): boolean` | 画布是否为空 |
| `getImage(): UTSJSONObject` | 返回签名图片，含 `src`（PNG 的 data URL）、`width` 和 `height` |
