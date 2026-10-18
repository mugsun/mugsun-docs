---
title: Footer 页脚
demo: pages/demo/nav/footer
---

# Footer 页脚

`ms-footer` 是页脚，可显示版权、链接和品牌信息，也可以通过默认插槽自定义内容。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-footer`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/nav/footer`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/footer.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-footer text="Copyright © 2026 Mugsun. All Rights Reserved" />
  <ms-footer
    text="Copyright © 2026 Mugsun"
    :links="singleLinks"
    @link="onLink"
  />
  <ms-footer
    text="Copyright © 2026 Mugsun"
    :links="multiLinks"
    @link="onLink"
  />
  <!-- 组件深度 -->
  <ms-footer
    logo-title="Mugsun"
    logo-icon="/static/logo.png"
    logo-with-info
    text="Copyright © 2026 Mugsun"
    :links="multiLinks"
    @link="onLink"
  />
  <ms-footer>
    <text>自定义内容 · 页脚插槽</text>
  </ms-footer>
  <ms-footer :links="multiLinks" @link="onLink" />
</template>

<script setup lang="uts">
const multiLinks = [
  { name: '用户协议' } as UTSJSONObject,
  { name: '隐私政策' } as UTSJSONObject,
] as UTSJSONObject[]

const singleLinks = [{ name: '用户协议' } as UTSJSONObject] as UTSJSONObject[]

function onLink(index: number) : void {
  console.log('onLink')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `''` | 展示文案 |
| links | `UTSJSONObject[]` | `[]` | 底部链接列表（name 等） |
| logoTitle | `string` | `''` | Logo 旁标题 |
| logoIcon | `string` | `''` | Logo 图标名 |
| logoWithInfo | `boolean` | `false` | logo 模式下是否仍显示链接与版权 |

## 事件

| 事件 | 说明 |
| --- | --- |
| link | 点击链接 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-footer/`
- 演示: `#/pages/demo/nav/footer`
