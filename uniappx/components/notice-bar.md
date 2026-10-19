---
title: Notice Bar 通知栏
demo: pages/demo/feedback/notice-bar
---

# Notice Bar 通知栏

`ms-notice-bar` 是顶部通知栏，支持主题色、单行省略、纵向 swiper 轮播和关闭按钮。uni-app x 在 App 平台（包括蒸汽模式（Vapor））不支持 `@keyframes`，因此组件不提供 CSS 跑马灯动画。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-notice-bar`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/feedback/notice-bar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/notice-bar.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 主题 -->
  <ms-notice-bar theme="default" content="默认公告" />
  <ms-notice-bar theme="primary" content="主色公告" />
  <ms-notice-bar theme="success" content="成功公告" />
  <!-- 长文本 -->
  <ms-notice-bar
    theme="primary"
    content="这是一条很长的公告文案，超出宽度时应省略显示而不是撑破布局"
  />
  <!-- 竖向 -->
  <ms-notice-bar direction="vertical" theme="primary" :list="verticalList" />
  <!-- 可关闭 -->
  <ms-notice-bar theme="warning" content="可关闭公告" closable @close="onNoticeClose" />
</template>

<script setup lang="uts">
const verticalList = ['轮播公告一', '轮播公告二', '轮播公告三'] as string[]

function onNoticeClose() : void {
  console.log('onNoticeClose')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 主题色 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| content | `string` | `''` | 内容文案 |
| list | `string[]` | `[]` | 数据列表 |
| closable | `boolean` | `false` | 是否可关闭 |
| icon | `string` | `'megaphone-line'` | 图标名（icons.uts） |
| showIcon | `boolean` | `true` | 是否显示左侧图标；icon 为空时也隐藏 |
| operation | `string` | `''` | 右侧操作文案 |
| suffixIcon | `string` | `''` | 右侧后缀图标（如箭头）；与 closable 互斥时优先 closable |
| interval | `number` | `3000` | 竖向轮播间隔（ms） |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| operation | operation |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-notice-bar/`
- 演示: `#/pages/demo/feedback/notice-bar`
