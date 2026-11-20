---
title: Empty 空状态
demo: pages/demo/basic/empty
---

# Empty 空状态

`ms-empty` 是空状态组件，用图标或图片加一段文字说明当前没有内容，还可以带一个操作按钮。

`status` 还支持加载中、出错和没有更多三种状态。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | 展示态：空 / 加载 / 错误 / 没有更多 |
| title | `string` | `''` | 主标题（空/错误态可选） |
| description | `string` | `''` | 描述文案 |
| icon | `string` | `'inbox-line'` | 图标名（icons.uts） |
| image | `string` | `''` | 图片地址 |
| actionText | `string` | `''` | 操作按钮文字 |
| errorText | `string` | `'加载出错了'` | 错误文案 |
| moreText | `string` | `'没有更多了'` | `status` 为 `more` 时的文案 |
| loadingText | `string` | `'加载中…'` | 加载中文案 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| action | — | 点击操作按钮时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| image | 自定义图片区域，默认显示图标或 `image` 指定的图片 |
| description | 自定义文字区域，默认显示标题和描述 |
| action | 自定义操作区域，默认显示操作按钮 |
