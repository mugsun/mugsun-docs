---
title: Webview
demo: pages/demo/media/webview
---

# Webview

`ms-webview`: Controlled wrapper around official `<web-view>`: fixed-height container + nav toolbar (back/forward/reload) + status line.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-webview/components/ms-webview` (commercial edition; source not public).
Optional plugin: install `uni_modules/ms-webview` alongside `ms-ui`.
Demo route: `#/pages/demo/media/webview`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/webview.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-webview
    :src="src"
    :height="200"
    @load="onLoad"
    @error="onError"
    @navigate="onNavigate"
  />
  <ms-webview :src="src" :height="160" :show-toolbar="false" />
  <!-- 组件样式 -->
  <ms-webview :src="src" :height="120" :show-status="false" />
  <ms-webview src="" :height="100" />
  <!-- 组件深度 -->
  <ms-webview
    :src="src"
    :height="120"
    loading-text="页面打开中…"
    :show-toolbar="false"
  />
  <ms-webview
    :src="src"
    :height="140"
    :show-toolbar="true"
    :show-status="true"
    loading-text="拉取中…"
  />
  <ms-webview ref="reloadRef" :src="src" :height="120" :show-toolbar="false" />
</template>

<script setup lang="uts">
const src = ref('https://example.com/')

function onLoad(payload: UTSJSONObject) : void {
  console.log('onLoad')
}

function onError(payload: UTSJSONObject) : void {
  console.log('onError')
}

function onNavigate(payload: UTSJSONObject) : void {
  console.log('onNavigate')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| height | `number` | `260` | Height (px) |
| showToolbar | `boolean` | `true` | Whether to show toolbar |
| showStatus | `boolean` | `true` | Whether to show status |
| loadingText | `string` | `'加载中…'` | Loading text |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |
| message | Message received |
| navigate | Navigate action |

## See also

- Component: `uni_modules/ms-webview/components/ms-webview/`
- Demo: `#/pages/demo/media/webview`
- Chinese docs: [/uniappx/components/webview](/uniappx/components/webview)
