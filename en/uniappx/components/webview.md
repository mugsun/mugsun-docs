---
title: Webview
demo: pages/demo/media/webview
---

# Webview

`ms-webview` wraps the official `<web-view>`. It opens a page in a fixed-height container, with back, forward and reload buttons and a one-line loading status.

It only opens addresses on the `allowHosts` allowlist. The list is empty by default, so configure it before use.

This is an optional plugin. Install `uni_modules/ms-webview` separately; it depends on `ms-ui`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-webview
    :src="src"
    :allow-hosts="['example.com', 'example.org']"
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Page address, `http` and `https` only; shows an empty state when blank |
| height | `number` | `260` | Height (px) |
| showToolbar | `boolean` | `true` | Whether to show the back, forward and reload buttons |
| showStatus | `boolean` | `true` | Whether to show the loading status |
| loadingText | `string` | `'加载中…'` | Text shown while loading; the default is Chinese for "Loading…" |
| allowHosts | `string[]` | `[]` | Hosts allowed to open: `example.com` matches that host only, `.mugsun.com` matches the root domain and all subdomains. Empty by default, which blocks every address |
| allowAnyHost | `boolean` | `false` | Whether to skip the allowlist check; still `http` and `https` only, and WeChat Mini Programs still enforce their business domains |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| load | `payload: UTSJSONObject` | Fires when the page has loaded; `payload.url` is the current address |
| error | `payload: UTSJSONObject` | Fires when loading fails; `payload.errMsg` is the error message. Also fires when the address is blocked by the allowlist, then with `url` and `reason` |
| message | `payload: UTSJSONObject` | Fires when the page posts messages to the app; `payload.count` is the number of messages. Not fired on Web |
| navigate | `payload: UTSJSONObject` | Fires on back, forward or reload; `payload.action` is back / forward / reload |
| blocked | `payload: UTSJSONObject` | Fires when the address is blocked by the allowlist; `payload` has `url` and `reason` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `back()` | Goes back |
| `forward()` | Goes forward |
| `reload()` | Reloads the current page |

## External host allowlist

`src` reaches the inner `<web-view>` only after it passes the check. Otherwise the page is not loaded, and both the status line and the container say the address is not on the allowlist.

Both `blocked` and `error` fire in that case, each with `{ url, reason: 'allowHosts' }`.

The check works as follows:

- Only `http://` and `https://` are allowed. Schemes such as `javascript:` and `file:` are always rejected, even with `allowAnyHost`.
- Addresses with control characters (tabs and line breaks included) are rejected, and so are those whose host part contains a backslash `\` or userinfo (`@`).
- Host names are compared in lower case and the port is ignored.
- `.mugsun.com` matches `mugsun.com` and `a.mugsun.com`, but not `evilmugsun.com`.
- An empty `src` shows an empty state saying no address is set. This does not count as a block.

```vue
<ms-webview src="https://a.mugsun.com/" :allow-hosts="['.mugsun.com']" @blocked="onBlocked" />
```

## Domain limits in WeChat Mini Programs

The allowlist is only the component's own check. WeChat Mini Programs add platform limits on top.

Turn on domain checking in the project's `manifest.json`, as the demo project does:

```json
"mp-weixin": {
  "setting": {
    "urlCheck": true
  }
}
```

Before previewing on a real device or submitting for review, configure the business domains of the Mini Program on the WeChat Official Accounts Platform. `web-view` can only open configured domains.

Mini Programs registered to individuals cannot open external links with `web-view`.
