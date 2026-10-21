---
title: Webview
demo: pages/demo/media/webview
---

# Webview

`ms-webview` is a controlled wrapper around the official `<web-view>`, with a fixed-height container, a navigation bar for back, forward and reload, and a one-line status text.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-webview/components/ms-webview`. ms-ui is MIT-licensed; its source repository is not yet public.
Optional plugin: install `uni_modules/ms-webview` alongside `ms-ui`.
Demo route: `#/pages/demo/media/webview`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/webview.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-webview
    :src="src"
    :height="200"
    @load="onLoad"
    @error="onError"
    @navigate="onNavigate"
  />
  <ms-webview :src="src" :height="160" :show-toolbar="false" />
  <!-- Styles -->
  <ms-webview :src="src" :height="120" :show-status="false" />
  <ms-webview src="" :height="100" />
  <!-- Advanced -->
  <ms-webview
    :src="src"
    :height="120"
    loading-text="Opening page…"
    :show-toolbar="false"
  />
  <ms-webview
    :src="src"
    :height="140"
    :show-toolbar="true"
    :show-status="true"
    loading-text="Fetching…"
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
| allowHosts | `string[]` | `[]` | Allowed external hosts: an exact match (`example.com`) or a leading-dot suffix (`.mugsun.com`, which covers the root domain and its subdomains). It is empty by default, and an empty list rejects every non-empty external URL |
| allowAnyHost | `boolean` | `false` | Skips the component allowlist. Non-http/https URLs are still rejected, and the WeChat business domain and `urlCheck` rules still apply |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |
| message | Message received |
| navigate | Navigate action |
| blocked | The URL was rejected by the allowlist; payload: `url`, `reason='allowHosts'` |

## External host allowlist

`src` is passed to the inner `<web-view>` only after it passes the check. When it fails, nothing is loaded, the status line shows that the address is not on the allowlist, the container shows that it was blocked, and both `blocked` and `error` fire with the payload `{ url, reason: 'allowHosts' }`.

The check works as follows:

- Only `http://` and `https://` are allowed. `javascript:`, `file:`, `data:` and other schemes are always rejected, even with `allowAnyHost`.
- URLs that contain control characters (including tabs and line breaks), or whose authority contains a backslash `\` or userinfo (`@`), are rejected.
- Host names are compared in lower case and the port is ignored. `.mugsun.com` matches `mugsun.com` and `a.mugsun.com`, but not `evilmugsun.com`.
- When `src` is empty, the component shows an empty state saying no URL is set. This does not count as a block.

```vue
<ms-webview src="https://a.mugsun.com/" :allow-hosts="['.mugsun.com']" @blocked="onBlocked" />
```

## WeChat Mini Program: urlCheck and business domains

The component allowlist is only the first layer. WeChat Mini Programs add their own platform rules:

1. Turn on domain checking in the project's `manifest.json`. The demo project already sets it to `true`:

```json
"mp-weixin": {
  "setting": {
    "urlCheck": true
  }
}
```

2. Before testing on a real device or submitting for review, configure the business domains for the Mini Program on the WeChat Official Accounts Platform. `web-view` can only open configured domains, and Mini Programs registered to individuals cannot open external links with `web-view`.

## See also

- Component: `uni_modules/ms-webview/components/ms-webview/`
- Demo: `#/pages/demo/media/webview`
- Chinese docs: [/uniappx/components/webview](/uniappx/components/webview)
