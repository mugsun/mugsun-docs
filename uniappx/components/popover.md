---
title: Popover 气泡
demo: pages/demo/feedback/popover
---

# Popover 气泡

`ms-popover` 是气泡提示。触发元素放在默认插槽中，气泡内容通过 `content` 属性或 `content` 插槽设置。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-popover`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/feedback/popover`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/popover.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| content | `string` | `''` | 纯文本内容；复杂内容用 content 插槽 |
| placement | `\| 'top'` | `'top'` | 弹出/摆放位置 |
| theme | `'dark' \| 'light' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'dark'` | 主题色 |
| showArrow | `boolean` | `true` | 是否显示箭头 |
| closeOnClickOutside | `boolean` | `true` | 点气泡外（透明遮罩）是否关闭 |
| zIndex | `number` | `900` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| visible-change | visible-change |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| content | `content` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-popover/`
- 演示: `#/pages/demo/feedback/popover`
