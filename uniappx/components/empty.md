---
title: Empty 空状态
demo: pages/demo/basic/empty
---

# Empty 空状态

`ms-empty` 是空状态组件，可显示 icon、image 和 action，`status` 支持 loading、error 和 more，并提供 action 插槽。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-empty`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/basic/empty`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/empty.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 图标 -->
  <ms-empty icon="information-line" description="图标空态" />
  <!-- 图片 -->
  <ms-empty image="/static/empty-illustration.svg" description="图片空态" />
  <!-- 操作 -->
  <ms-empty icon="inbox-line" description="描述文字" action-text="操作按钮" @action="onAction" />
  <!-- 场景切换 -->
  <ms-empty
    :status="sceneStatus"
    title="当前没有数据"
    description="可以下拉或点按钮重试"
    error-text="出错啦~"
    more-text="没有更多数据啦"
    action-text="点击重试"
    @action="onRetry"
  />
</template>

<script setup lang="uts">
type EmptyStatus = 'empty' | 'loading' | 'error' | 'more'

const sceneStatus = ref('loading' as EmptyStatus)

function onAction() : void {
  console.log('onAction')
}

function onRetry() : void {
  console.log('onRetry')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | 展示态：空 / 加载 / 错误 / 没有更多 |
| title | `string` | `''` | 主标题（空/错误态可选） |
| description | `string` | `''` | 描述文案 |
| icon | `string` | `'inbox-line'` | 图标名（icons.uts） |
| image | `string` | `''` | 图片地址 |
| actionText | `string` | `''` | 操作文案 |
| errorText | `string` | `'加载出错了'` | 错误文案 |
| moreText | `string` | `'没有更多了'` | variant 为 more 时的文案 |
| loadingText | `string` | `'加载中…'` | 加载中文案 |

## 事件

| 事件 | 说明 |
| --- | --- |
| action | 操作按钮 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| action | `action` 插槽 |
| description | `description` 插槽 |
| image | `image` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-empty/`
- 演示: `#/pages/demo/basic/empty`
