---
title: Backtop 返回顶部
demo: pages/demo/nav/backtop
---

# Backtop 返回顶部

`ms-backtop` 是返回顶部按钮，仅在 `scrollTop` 大于或等于 `visibilityHeight` 时显示。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-backtop`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/nav/backtop`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/backtop.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 主题样式 -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
    text="顶部"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="half-round"
    text="返回"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round-dark"
  />
  <!-- 内容 -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
  />
  <!-- 局部滚动 -->
  <ms-backtop
    :scroll-top="localScrollY"
    :visibility-height="40"
    local
    theme="round-dark"
    @to-top="onLocalToTop"
  />
</template>

<script setup lang="uts">
const localScrollY = ref(0)

function onLocalToTop() : void {
  console.log('onLocalToTop')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 页面滚动距离（px） |
| visibilityHeight | `number` | `200` | 滚动超过该距离才显示（px） |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | 主题色 |
| text | `string` | `''` | 展示文案 |
| icon | `string` | `'skip-up-fill'` | 图标名（icons.uts） |
| fixed | `boolean` | `true` | 是否固定定位 |
| local | `boolean` | `false` | 是否相对父级定位（非 fixed） |

## 事件

| 事件 | 说明 |
| --- | --- |
| to-top | to-top |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-backtop/`
- 演示: `#/pages/demo/nav/backtop`
