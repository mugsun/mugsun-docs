---
title: Grid 宫格
demo: pages/demo/nav/grid
---

# Grid 宫格

`ms-grid` 是宫格容器，子项使用 `ms-grid-item`。容器支持 `column`、`border` 和 `theme`；子项支持 `icon`、`text`、`description` 和 `disabled`。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-grid`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/nav/grid`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/grid.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 列数 -->
  <ms-grid :column="3">
    <ms-grid-item icon="home-3-line" text="首页" />
    <ms-grid-item icon="search-line" text="搜索" />
    <ms-grid-item icon="settings-3-line" text="设置" />
  </ms-grid>
  <ms-grid :column="4">
    <ms-grid-item icon="home-3-line" text="首页" />
    <ms-grid-item icon="search-line" text="搜索" />
    <ms-grid-item icon="notification-line" text="消息" />
    <ms-grid-item icon="settings-3-line" text="设置" />
  </ms-grid>
  <ms-grid :column="5">
    <ms-grid-item icon="home-3-line" text="一" />
    <ms-grid-item icon="search-line" text="二" />
    <ms-grid-item icon="apps-line" text="三" />
    <ms-grid-item icon="image-line" text="四" />
    <ms-grid-item icon="settings-3-line" text="五" />
  </ms-grid>
  <!-- 边框 -->
  <ms-grid :column="3" border>
    <ms-grid-item icon="home-3-line" text="首页" />
    <ms-grid-item icon="search-line" text="搜索" />
    <ms-grid-item icon="settings-3-line" text="设置" />
  </ms-grid>
  <!-- 卡片风格 -->
  <ms-grid :column="4" theme="card">
    <ms-grid-item icon="home-3-line" text="首页" />
    <ms-grid-item icon="search-line" text="搜索" />
    <ms-grid-item icon="notification-line" text="消息" />
    <ms-grid-item icon="settings-3-line" text="设置" />
  </ms-grid>
  <!-- 组件深度 -->
  <ms-grid :column="3" border theme="card">
    <ms-grid-item icon="home-3-line" text="首页" />
    <ms-grid-item icon="search-line" text="搜索" />
    <ms-grid-item icon="notification-line" text="消息" />
    <ms-grid-item icon="settings-3-line" text="设置" />
    <ms-grid-item icon="image-line" text="相册" />
    <ms-grid-item icon="apps-line" text="更多" />
  </ms-grid>
  <ms-grid :column="3">
    <ms-grid-item icon="home-3-line" text="首页" description="常用入口" />
    <ms-grid-item icon="search-line" text="搜索" description="全局查找" />
    <ms-grid-item icon="settings-3-line" text="设置" description="偏好" />
  </ms-grid>
  <ms-grid :column="3">
    <ms-grid-item icon="home-3-line" text="可用" />
    <ms-grid-item icon="lock-line" text="禁用" disabled />
    <ms-grid-item icon="apps-line" text="可用" />
  </ms-grid>
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| column | `3 \| 4 \| 5` | `4` | 列数 |
| border | `boolean` | `false` | 是否显示边框 |
| theme | `'default' \| 'card'` | `'default'` | 主题色 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-grid/`
- 演示: `#/pages/demo/nav/grid`
