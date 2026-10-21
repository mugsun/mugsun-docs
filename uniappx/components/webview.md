---
title: Webview 网页
demo: pages/demo/media/webview
---

# Webview 网页

`ms-webview` 是对官方 `<web-view>` 的受控封装，提供固定高度的容器、后退、前进和刷新导航栏，以及一行状态文字。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-webview/components/ms-webview`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
可选插件：需单独安装 `uni_modules/ms-webview`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/webview`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/webview.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 资源地址 |
| height | `number` | `260` | 高度（px） |
| showToolbar | `boolean` | `true` | 是否显示工具条 |
| showStatus | `boolean` | `true` | 是否显示状态 |
| loadingText | `string` | `'加载中…'` | 加载中文案 |
| allowHosts | `string[]` | `[]` | 外链主机白名单：精确匹配（`example.com`）或前导点后缀（`.mugsun.com`，含根域与子域）。默认为空，此时拒绝所有非空外链 |
| allowAnyHost | `boolean` | `false` | 跳过组件级白名单（仍拒绝非 http/https 等违规地址，且仍受微信业务域名 / `urlCheck` 约束） |

## 事件

| 事件 | 说明 |
| --- | --- |
| load | 加载完成 |
| error | 错误 |
| message | 收到消息 |
| navigate | 导航操作 |
| blocked | 地址被白名单拦截，payload：`url`、`reason='allowHosts'` |

## 外链白名单

`src` 只有通过校验才会交给内部 `<web-view>`；未通过时不加载，状态行显示「地址未在白名单」，容器内显示「地址未在白名单，已拦截」，并同时触发 `blocked` 与 `error`（payload 均为 `{ url, reason: 'allowHosts' }`）。

校验规则：

- 只放行 `http://` / `https://`；`javascript:`、`file:`、`data:` 等一律拒绝（`allowAnyHost` 也不放行）。
- 含控制字符（含 tab、换行）、authority 含反斜杠 `\` 或 userinfo（`@`）的地址直接拒绝。
- 主机名小写比对，忽略端口；`.mugsun.com` 匹配 `mugsun.com` 与 `a.mugsun.com`，不匹配 `evilmugsun.com`。
- `src` 为空时显示空态「未设置网页地址」，不算拦截。

```vue
<ms-webview src="https://a.mugsun.com/" :allow-hosts="['.mugsun.com']" @blocked="onBlocked" />
```

## 微信小程序：urlCheck 与业务域名

组件白名单只是第一层，微信小程序另有平台约束：

1. 工程 `manifest.json` 建议开启域名校验（演示工程已设为 `true`）：

```json
"mp-weixin": {
  "setting": {
    "urlCheck": true
  }
}
```

2. 真机预览与提审前，须在微信公众平台为小程序配置业务域名，`web-view` 只能打开已配置的域名；个人主体小程序不能用 `web-view` 打开外链。

## 相关

- 组件目录: `uni_modules/ms-webview/components/ms-webview/`
- 演示: `#/pages/demo/media/webview`
