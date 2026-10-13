---
title: Image Viewer 预览
demo: pages/demo/display/image-viewer
---

# Image Viewer 预览

`ms-image-viewer`：全屏大图预览：swiper 翻页 + 可选页码/关闭/删除。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-image-viewer`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/image-viewer`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/image-viewer.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-image-viewer
    ref="viewerRef"
    :visible="viewerVisible"
    :images="viewerImages"
    :initial-index="viewerInitial"
    :show-index="viewerShowIndex"
    :close-btn="viewerCloseBtn"
    :delete-btn="viewerDeleteBtn"
    @update:visible="onVisible"
    @close="onClose"
    @change="onChange"
    @delete="onDelete"
  />
</template>

<script setup lang="uts">
const viewerCloseBtn = ref(false)

const viewerDeleteBtn = ref(false)

const viewerImages = ref<string[]>(DEMO_IMAGES.slice(0))

const viewerInitial = ref(0)

const viewerShowIndex = ref(true)

const viewerVisible = ref(false)

function onVisible(v: boolean): void {
  viewerVisible.value = v
}

function onClose() : void {
  console.log('onClose')
}

function onChange(index: number) : void {
  console.log('onChange')
}

function onDelete(index: number) : void {
  console.log('onDelete')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| images | `string[]` | `[]` | 图片地址列表 |
| initialIndex | `number` | `0` | 初始索引 |
| showIndex | `boolean` | `false` | 是否显示当前序号 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| deleteBtn | `boolean` | `false` | 是否显示删除按钮 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |
| change | 值变化 |
| delete | delete |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-image-viewer/`
- 演示: `#/pages/demo/display/image-viewer`
