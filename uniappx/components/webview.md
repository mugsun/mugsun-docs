---
title: Webview 网页
demo: pages/demo/media/webview
---

# Webview 网页

`ms-webview`：官方 `<web-view>` 的受控封装：定高容器 + 导航工具条（后退/前进/刷新）+ 一行状态文案。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-webview/components/ms-webview`）。
可选插件：需单独安装 `uni_modules/ms-webview`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/webview`。

## 基础用法

```vue
<template>
  <ms-webview src="…">
    …
  </ms-webview>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 网页地址；为空显示空态 |
| height | `number` | `260` | 容器高度 px（蒸汽只吃 number/pixel，禁百分比） |
| showToolbar | `boolean` | `true` | 显示导航工具条 |
| showStatus | `boolean` | `true` | 显示状态行 |
| loadingText | `string` | `'加载中…'` | 加载中文案 |

## 事件

| 事件 | 说明 |
| --- | --- |
| load | 加载完成 |
| error | 错误 |
| message | 收到消息 |
| navigate | 导航操作 |

## 相关

- 组件目录: `uni_modules/ms-webview/components/ms-webview/`
- 演示: `#/pages/demo/media/webview`
