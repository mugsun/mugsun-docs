---
title: Avatar 头像
demo: pages/demo/display/avatar
---

# Avatar 头像

`ms-avatar` 用于显示单个头像，内容可以是图片、文字或图标。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-avatar`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/display/avatar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/avatar.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-avatar :src="demoSrc" />
  <ms-avatar text="Mug" />
  <ms-avatar />
  <!-- 形状 -->
  <ms-avatar :src="demoSrc" shape="circle" />
  <ms-avatar :src="demoSrc" shape="round" />
  <!-- 组件尺寸 -->
  <ms-avatar text="S" size="sm" />
  <ms-avatar text="M" size="md" />
  <ms-avatar text="L" size="lg" />
  <!-- 组件深度 -->
  <ms-avatar icon="customer-service-line" size="lg" />
  <ms-avatar text="圆" shape="round" size="lg" />
  <ms-avatar src="/static/not-exist.png" text="退" @error="onAvatarError" />
</template>

<script setup lang="uts">
const demoSrc = '/static/logo.png'

function onAvatarError() : void {
  console.log('onAvatarError')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 头像图片地址 |
| text | `string` | `''` | 无图时展示的文字 |
| icon | `string` | `''` | 无图无文时的图标名 |
| shape | `'circle' \| 'round'` | `'circle'` | 外形：circle / round / square |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸档位 |
| mode | `string` | `'aspectFill'` | 图片 mode（如 aspectFill） |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| error | 错误 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-avatar/`
- 演示: `#/pages/demo/display/avatar`
