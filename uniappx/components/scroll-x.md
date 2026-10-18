---
title: Scroll X 横向滚动
demo: pages/demo/display/scroll-x
---

# Scroll X 横向滚动

`ms-scroll-x` 是横向滚动容器（`scroll-view direction="horizontal"`），底部带滚动进度指示条。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-scroll-x`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/display/scroll-x`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/scroll-x.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | 是否显示指示器 |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | 间距（px） |
| inset | `boolean` | `false` | 是否内嵌样式 |
| showScrollbar | `boolean` | `false` | 是否显示滚动条 |
| scrollWithAnimation | `boolean` | `false` | 滚动是否带动画 |

## 事件

| 事件 | 说明 |
| --- | --- |
| scroll | 滚动 |
| scrolltoupper | scrolltoupper |
| scrolltolower | 触底 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-scroll-x/`
- 演示: `#/pages/demo/display/scroll-x`
