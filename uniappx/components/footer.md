---
title: Footer 页脚
demo: pages/demo/nav/footer
---

# Footer 页脚

`ms-footer` 是页脚，可显示版权、链接和品牌信息，也可以通过默认插槽自定义内容。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `''` | 版权文字 |
| links | `UTSJSONObject[]` | `[]` | 链接列表，每项含 `name` |
| logoTitle | `string` | `''` | Logo 旁标题 |
| logoIcon | `string` | `''` | Logo 图标名 |
| logoWithInfo | `boolean` | `false` | logo 模式下是否仍显示链接与版权 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| link | `index: number` | 点击链接时触发，`index` 是链接的下标；组件不做跳转，需要自行处理 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义页脚内容，替换默认的品牌、链接和版权信息 |
