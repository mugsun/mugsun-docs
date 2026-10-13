---
title: Cell Group
demo: pages/demo/basic/cell
---

# Cell Group

`ms-cell-group` — Cell Group for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-cell-group` (repository not yet public).
Demo route: `#/pages/demo/basic/cell`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/cell.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <ms-cell-group theme="card">
    <ms-cell title="单行标题" icon="customer-service-line" arrow />
    <ms-cell title="单行标题" icon="global-line" arrow />
    <ms-cell title="单行标题" icon="lock-line" arrow :bordered="false" />
  </ms-cell-group>
  <ms-cell-group>
    <ms-cell title="常见能力" icon="apps-line" description="高质量组件库" arrow />
    <ms-cell title="价格设置" icon="price-tag-3-line" note="+￥32" arrow />
    <ms-cell title="消息通知" icon="customer-service-line" note="测试" arrow />
    <ms-cell title="标签页面" icon="gift-line" note="测试" arrow :bordered="false" />
  </ms-cell-group>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'card'` | `'default'` | Theme color |
| title | `string` | `''` | Title |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-cell-group/`
- Demo: `#/pages/demo/basic/cell`
- Chinese docs: [/uniappx/components/cell-group](/uniappx/components/cell-group)
