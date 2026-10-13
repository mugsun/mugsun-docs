---
title: Grid Item 宫格项
demo: pages/demo/nav/grid
---

# Grid Item 宫格项

`ms-grid-item` 组件。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-grid-item`（源码仓暂未公开）。
演示路由：`#/pages/demo/nav/grid`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/grid.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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
| icon | `string` | `'apps-line'` | 图标名（icons.uts） |
| text | `string` | `''` | 展示文案 |
| description | `string` | `''` | 副文案（图标下方第二行） |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 相关

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

- 组件目录: `uni_modules/ms-ui/components/ms-grid-item/`
- 演示: `#/pages/demo/nav/grid`
