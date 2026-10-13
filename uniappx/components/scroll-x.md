---
title: Scroll X 横滚
demo: pages/demo/display/scroll-x
---

# Scroll X 横滚

`ms-scroll-x`：横向滚动容器（`scroll-view direction="horizontal"`）+ 底部进度指示条。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-scroll-x`）。
演示路由：`#/pages/demo/display/scroll-x`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/scroll-x.uvue`，可在右侧手机框中查看运行效果。

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
