---
title: Transition 过渡
demo: pages/demo/basic/transition
---

# Transition 过渡

`ms-transition`：进出场过渡容器，由 `visible` 驱动。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-transition`（商业版，源码不公开）。
演示路由：`#/pages/demo/basic/transition`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/transition.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-transition :visible="fadeVisible">
    <view>
      <text>淡入淡出内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="slideVisible" name="slide-right" :duration="300">
    <view>
      <text>右侧滑入内容</text>
    </view>
  </ms-transition>
  <!-- 组件样式 -->
  <ms-transition :visible="true" :appear="true" name="zoom">
    <view>
      <text>打开即缩放进场</text>
    </view>
  </ms-transition>
  <ms-transition
    :visible="destroyVisible"
    :destroy-on-hide="true"
    name="slide-up"
    @after-leave="onDestroyed"
  >
    <view>
      <text>隐藏后不留内容</text>
    </view>
  </ms-transition>
  <!-- 组件深度 -->
  <ms-transition :visible="leftVisible" name="slide-left" :duration="300">
    <view>
      <text>左侧滑入内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="downVisible" name="slide-down" :duration="300">
    <view>
      <text>下沉内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="zoomVisible" name="zoom" :duration="300">
    <view>
      <text>缩放过渡内容</text>
    </view>
  </ms-transition>
</template>

<script setup lang="uts">
const destroyVisible = ref(true)

const downVisible = ref(true)

const fadeVisible = ref(true)

const leftVisible = ref(true)

const slideVisible = ref(true)

const zoomVisible = ref(true)

function onDestroyed() : void {
  console.log('onDestroyed')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| name | `\| 'fade'` | `'fade'` | 名称 / 字段名 |
| duration | `number` | `300` | 时长（ms） |
| appear | `boolean` | `false` | 是否入场动画 |
| destroyOnHide | `boolean` | `false` | 隐藏时是否销毁 |

## 事件

| 事件 | 说明 |
| --- | --- |
| before-enter | before-enter |
| after-enter | after-enter |
| before-leave | before-leave |
| after-leave | after-leave |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-transition/`
- 演示: `#/pages/demo/basic/transition`
