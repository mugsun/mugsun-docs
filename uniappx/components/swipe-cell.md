---
title: Swipe Cell 左滑
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell 左滑

`ms-swipe-cell`：动作面板绝对定位在左右两侧，内容层用 `left` 偏移露出 —— 不用 transform。右滑开左侧（`#left` + `openedLeft`），左滑开右侧（`#actions` + `opened`）。小程序端用 `translate3d` 位移易踩坑（见工程 LESSONS-LEARNED L14），本仓统一走 `left`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-swipe-cell`（商业版，源码不公开）。
演示路由：`#/pages/demo/feedback/swipe-cell`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/swipe-cell.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-swipe-cell :bordered="false" v-model:opened="singleOpened" @open="onOpen" @close="onClose">
    <template #actions>
      <view @click="onAction('删除')">
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>单行内容 · 左滑显示删除</text>
    </view>
  </ms-swipe-cell>
  <ms-swipe-cell :bordered="false">
    <template #actions>
      <view @click="onAction('收藏')">
        <text>收藏</text>
      </view>
      <view @click="onAction('删除')">
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>双操作行</text>
      <text>辅助信息</text>
    </view>
  </ms-swipe-cell>
  <!-- 组件状态 -->
  <ms-swipe-cell :bordered="false" :disabled="true">
    <template #actions>
      <view>
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>禁用滑动的行</text>
    </view>
  </ms-swipe-cell>
  <!-- 内容规格 -->
  <ms-swipe-cell v-for="row in rows" :key="row" :bordered="row < rows.length">
    <template #actions>
      <view @click="onAction('删除')">
        <text>删除</text>
      </view>
    </template>
    <view>
      <text>大列表内容 {{ row }}</text>
    </view>
  </ms-swipe-cell>
</template>

<script setup lang="uts">
const rows = [1, 2, 3]

const singleOpened = ref(false)

function onOpen() : void {
  console.log('onOpen')
}

function onClose() : void {
  console.log('onClose')
}

function onAction(text: string) : void {
  console.log('onAction')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | 受控：右侧面板是否展开 |
| openedLeft | `boolean` | `false` | 受控：左侧面板是否展开 |
| disabled | `boolean` | `false` | 禁用手势 |
| threshold | `number` | `20` | 位移阈值，超过才吸附到位 |
| bordered | `boolean` | `true` | 底部分隔线 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:opened | update:opened |
| update:openedLeft | update:openedLeft |
| open | 打开 |
| close | 关闭 |
| click | 点击 |
| dragstart | dragstart |
| dragend | dragend |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| actions | `actions` 插槽 |
| left | `left` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-swipe-cell/`
- 演示: `#/pages/demo/feedback/swipe-cell`
