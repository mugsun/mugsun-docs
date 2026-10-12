---
title: Markdown
demo: pages/demo/media/markdown
---

# Markdown

`ms-markdown`：Markdown 子集原生渲染（零第三方依赖，不用 webview）。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-markdown/components/ms-markdown`）。
可选插件：需单独安装 `uni_modules/ms-markdown`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/markdown`。

## 基础用法

```vue
<template>
  <ms-markdown value="…">
    …
  </ms-markdown>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 当前值 |
| fontSize | `number` | `14` | 字号（px） |
| showCodeLang | `boolean` | `true` | 是否显示代码语言标签 |
| selectable | `boolean` | `false` | 是否可选中文本 |

## 事件

| 事件 | 说明 |
| --- | --- |
| link | 点击链接 |
| image | 点击图片 |
| parsed | 解析完成 |

## 相关

- 组件目录: `uni_modules/ms-markdown/components/ms-markdown/`
- 演示: `#/pages/demo/media/markdown`
