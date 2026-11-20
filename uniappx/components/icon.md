---
title: Icon 图标
demo: pages/demo/basic/icon
---

# Icon 图标

`ms-icon` 是图标组件，内置 Remix 图标的一个子集，用 `name` 指定图标。

`spin` 让图标持续旋转，适合表示加载中；`rotate` 设置固定的旋转角度。两者同时设置时以 `spin` 为准。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 常用 -->
  <ms-icon name="search-line" tone="primary" />
  <ms-icon name="add-line" tone="primary" />
  <ms-icon name="home-3-line" tone="primary" />
  <!-- 尺寸 -->
  <ms-icon name="settings-3-line" size="sm" tone="secondary" />
  <ms-icon name="settings-3-line" size="md" tone="secondary" />
  <ms-icon name="settings-3-line" size="lg" tone="secondary" />
  <!-- 方向 -->
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="90" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="180" />
  <!-- 旋转 -->
  <ms-icon name="loader-line" size="lg" tone="primary" :spin="true" />
  <ms-icon name="refresh-line" size="lg" tone="secondary" :spin="true" :spin-duration="3000" />
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| name | `string` | `''` | 图标名 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| tone | `'inherit' \| 'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning' \| 'inverse' \| 'on-primary' \| 'on-danger' \| 'on-success' \| 'on-warning' \| 'on-surface'` | `'inherit'` | 颜色，默认继承父级文字颜色 |
| spin | `boolean` | `false` | 是否持续旋转，常用于加载中 |
| spinDuration | `number` | `1500` | 旋转一圈的时长（ms） |
| rotate | `number` | `0` | 固定旋转角度；与 `spin` 同时设置时 `spin` 优先 |
| pressable | `boolean` | `true` | 是否带按压效果；放在按钮里时应设为 `false` |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击图标时触发 |

## 图标字体子集

组件包内的字体只包含码表 `components/ms-icon/icons.uts` 里的图标。

图标名不在码表里时显示空白；`name` 传图片地址时按图片显示。

新增图标的步骤如下：

1. 取 `remixicon@4.7.0` 的全量 ttf（Apache-2.0）。4.5.x 版本的字形与码表不一致，不能使用。
2. 在 `components/ms-icon/icons.uts` 里加上新图标。码表是唯一的真源。
3. 用 `pyftsubset` 生成 woff2 和 ttf 子集，放到 `static/fonts`，两种都要生成。
4. 按组件包内 `uni_modules/ms-ui/styles/FONT-SUBSET.md` 里的脚本重建小程序字体。
5. 在 App 端打开 ms-icon 演示页，抽查常用图标是否显示正常。

Android 和鸿蒙使用 ttf，iOS 和 Web 使用 woff2。

小程序字体文件是 `remixicon-mp-face.scss`，不要手改。小程序字体只能内嵌子集，超过 64KB 时脚本会拒绝生成。
