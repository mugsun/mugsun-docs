---
title: Scroll X Item 横滚项
demo: pages/demo/display/scroll-x
---

# Scroll X Item 横滚项

`ms-scroll-x-item` 组件。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-scroll-x-item`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/scroll-x`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/scroll-x.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 基础用法 -->
  <ms-scroll-x @scroll="onScroll">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <!-- 滚动指示 -->
  <ms-scroll-x>
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <ms-scroll-x :indicator="false">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <!-- 间距布局 -->
  <ms-scroll-x gap="sm" :indicator="false">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <ms-scroll-x gap="lg" inset :indicator="false">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
</template>

<script setup lang="uts">
const baseItems = ['卡片一', '卡片二', '卡片三', '卡片四', '卡片五', '卡片六'] as string[]

function onScroll() : void {
  console.log('onScroll')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

无公开 Props（或仅插槽/事件驱动）。

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

- 组件目录: `uni_modules/ms-ui/components/ms-scroll-x-item/`
- 演示: `#/pages/demo/display/scroll-x`
