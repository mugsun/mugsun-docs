---
title: Empty
demo: pages/demo/basic/empty
---

# Empty

`ms-empty` — Empty for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-empty` (repository not yet public).
Demo route: `#/pages/demo/basic/empty`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/empty.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | Display status: empty / loading / error / no more |
| title | `string` | `''` | Main title (optional for empty/error states) |
| description | `string` | `''` | Description text |
| icon | `string` | `'inbox-line'` | Icon name (icons.uts) |
| image | `string` | `''` | Image URL |
| actionText | `string` | `''` | Action text |
| errorText | `string` | `'加载出错了'` | Error text |
| moreText | `string` | `'没有更多了'` | Label when variant is more |
| loadingText | `string` | `'加载中…'` | Loading text |

## Events

| Event | Description |
| --- | --- |
| action | Action button |

## Slots

| Slot | Description |
| --- | --- |
| action | `action` slot |
| description | `description` slot |
| image | `image` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-empty/`
- Demo: `#/pages/demo/basic/empty`
- Chinese docs: [/uniappx/components/empty](/uniappx/components/empty)
