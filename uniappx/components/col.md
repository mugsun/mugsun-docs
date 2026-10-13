---
title: Col 栅格列
demo: pages/demo/nav/col
---

# Col 栅格列

`ms-col`：栅格列：`span`/`offset` → BEM 宽与 margin；`gutter` 来自行 inject。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-col`（源码仓暂未公开）。
演示路由：`#/pages/demo/nav/col`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/col.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 占比 -->
  <ms-col :span="8">
    <view>
      <text>八栏</text>
    </view>
  </ms-col>
  <ms-col :span="16">
    <view>
      <text>十六栏</text>
    </view>
  </ms-col>
  <ms-col :span="24">
    <view>
      <text>全宽</text>
    </view>
  </ms-col>
  <!-- 偏移 -->
  <ms-col :span="8" :offset="4">
    <view>
      <text>偏移四</text>
    </view>
  </ms-col>
  <ms-col :span="12" :offset="12">
    <view>
      <text>偏移十二</text>
    </view>
  </ms-col>
  <!-- 间距 -->
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
  <ms-col :span="8">
    <view>
      <text>带间距列</text>
    </view>
  </ms-col>
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| span | `number` | `24` | 栅格跨度 |
| offset | `number` | `0` | 偏移 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-col/`
- 演示: `#/pages/demo/nav/col`
