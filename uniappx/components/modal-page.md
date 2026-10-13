---
title: Modal Page 整页模态
demo: pages/demo/feedback/modal-page
---

# Modal Page 整页模态

`ms-modal-page`：整页模态层：`position: fixed` 全屏覆盖（不依赖 x-design 原生 `xModalPage`）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-modal-page`（源码仓暂未公开）。
演示路由：`#/pages/demo/feedback/modal-page`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/modal-page.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| showClose | `boolean` | `true` | 是否显示关闭 |
| closeOnOverlayClick | `boolean` | `false` | 点击遮罩是否关闭 |
| zIndex | `number` | `1100` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |
| open | 打开 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| footer | `footer` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-modal-page/`
- 演示: `#/pages/demo/feedback/modal-page`
