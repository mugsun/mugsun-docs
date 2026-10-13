---
title: Row 栅格行
demo: pages/demo/nav/row
---

# Row 栅格行

`ms-row`：栅格行：flex 横排；`justify`/`align`/`wrap`；`gutter` 经 provide 注入给 `ms-col`，行侧负 margin 齐边。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-row`（源码仓暂未公开）。
演示路由：`#/pages/demo/nav/row`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/row.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 基础 -->
  <ms-row>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
    <ms-col :span="8">
      <view>
        <text>8</text>
      </view>
    </ms-col>
  </ms-row>
  <ms-row>
    <ms-col :span="4">
      <view>
        <text>4</text>
      </view>
    </ms-col>
    <ms-col :span="16">
      <view>
        <text>16</text>
      </view>
    </ms-col>
    <ms-col :span="4">
      <view>
        <text>4</text>
      </view>
    </ms-col>
  </ms-row>
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| gutter | `0 \| 8 \| 16 \| 24` | `0` | 栅格间距（px） |
| justify | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around'` | `'start'` | 主轴对齐 |
| align | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | 对齐方式 |
| wrap | `boolean` | `true` | 是否换行 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-row/`
- 演示: `#/pages/demo/nav/row`
