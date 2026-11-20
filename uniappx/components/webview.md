---
title: Webview 网页
demo: pages/demo/media/webview
---

# Webview 网页

`ms-webview` 封装了官方的 `<web-view>`，在固定高度的容器里打开网页，带后退、前进和刷新按钮，以及一行加载状态。

只能打开 `allowHosts` 白名单里的地址。白名单默认为空，使用前必须先配置。

这是可选插件，需要单独安装 `uni_modules/ms-webview`，并依赖 `ms-ui`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-webview
    :src="src"
    :allow-hosts="['example.com', 'example.org']"
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 网页地址，只支持 `http` 和 `https`；为空时显示空状态 |
| height | `number` | `260` | 高度（px） |
| showToolbar | `boolean` | `true` | 是否显示后退、前进和刷新按钮 |
| showStatus | `boolean` | `true` | 是否显示加载状态 |
| loadingText | `string` | `'加载中…'` | 加载时的文字 |
| allowHosts | `string[]` | `[]` | 允许打开的域名：`example.com` 只匹配这个域名，`.mugsun.com` 匹配根域名和全部子域名；默认为空，这时任何地址都打不开 |
| allowAnyHost | `boolean` | `false` | 是否跳过白名单检查；仍然只支持 `http` 和 `https`，微信小程序里还受业务域名限制 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| load | `payload: UTSJSONObject` | 网页加载完成时触发，`payload.url` 是当前地址 |
| error | `payload: UTSJSONObject` | 加载失败时触发，`payload.errMsg` 是错误信息；地址被白名单拦截时也会触发，这时带 `url` 和 `reason` |
| message | `payload: UTSJSONObject` | 网页向应用发消息时触发，`payload.count` 是消息条数；Web 端不触发 |
| navigate | `payload: UTSJSONObject` | 后退、前进或刷新时触发，`payload.action` 是 back / forward / reload |
| blocked | `payload: UTSJSONObject` | 地址被白名单拦截时触发，`payload` 含 `url` 和 `reason` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `back()` | 后退 |
| `forward()` | 前进 |
| `reload()` | 重新加载当前网页 |

## 外链白名单

`src` 通过检查后才会交给内部的 `<web-view>`。没通过时不加载网页，状态行和容器里都会提示地址不在白名单。

这时会同时触发 `blocked` 和 `error`，两个事件的参数都是 `{ url, reason: 'allowHosts' }`。

检查规则如下：

- 只允许 `http://` 和 `https://`，`javascript:`、`file:` 等协议一律拒绝，`allowAnyHost` 也不放行。
- 地址里有控制字符（包括 tab 和换行）时拒绝，主机部分带反斜杠 `\` 或用户信息（`@`）时也拒绝。
- 主机名按小写比较，忽略端口。
- `.mugsun.com` 匹配 `mugsun.com` 和 `a.mugsun.com`，不匹配 `evilmugsun.com`。
- `src` 为空时显示「未设置网页地址」，不算拦截。

```vue
<ms-webview src="https://a.mugsun.com/" :allow-hosts="['.mugsun.com']" @blocked="onBlocked" />
```

## 微信小程序的域名限制

白名单只是组件自己的检查，微信小程序还有平台的限制。

建议在工程的 `manifest.json` 里开启域名校验，演示工程已经开启：

```json
"mp-weixin": {
  "setting": {
    "urlCheck": true
  }
}
```

真机预览和提交审核前，要在微信公众平台为小程序配置业务域名，`web-view` 只能打开配置过的域名。

个人主体的小程序不能用 `web-view` 打开外链。
