---
title: Grid
demo: pages/demo/nav/grid
---

# Grid

`ms-grid` — Grid for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-grid` (repository not yet public).
Demo route: `#/pages/demo/nav/grid`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/grid.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| column | `3 \| 4 \| 5` | `4` | Column count |
| border | `boolean` | `false` | Whether to show border |
| theme | `'default' \| 'card'` | `'default'` | Theme color |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-grid/`
- Demo: `#/pages/demo/nav/grid`
- Chinese docs: [/uniappx/components/grid](/uniappx/components/grid)
