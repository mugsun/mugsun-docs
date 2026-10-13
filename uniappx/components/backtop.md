---
title: Backtop 回顶
demo: pages/demo/nav/backtop
---

# Backtop 回顶

`ms-backtop`：回顶按钮：`scrollTop` ≥ `visibilityHeight` 才显示。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-backtop`（商业版，源码不公开）。
演示路由：`#/pages/demo/nav/backtop`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/backtop.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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
