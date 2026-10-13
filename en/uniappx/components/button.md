---
title: Button
demo: pages/demo/basic/button
---

# Button

`ms-button` — Button for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-button` (repository not yet public).
Demo route: `#/pages/demo/basic/button`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/button.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 形态 -->
  <ms-button block theme="primary">填充</ms-button>
  <ms-button block variant="outline" theme="primary">描边</ms-button>
  <ms-button block variant="dashed" theme="primary">虚框</ms-button>
  <!-- 主题 -->
  <ms-button block theme="default" @click="onThemeClick('default')">默认</ms-button>
  <ms-button block theme="primary" @click="onThemeClick('primary')">主色</ms-button>
  <ms-button block theme="danger" @click="onThemeClick('danger')">危险</ms-button>
  <!-- 尺寸 -->
  <ms-button theme="primary" size="lg">大号</ms-button>
  <ms-button theme="primary" size="md">中号</ms-button>
  <ms-button theme="primary" size="sm">小号</ms-button>
  <!-- 状态 -->
  <ms-button block disabled theme="primary">禁用填充</ms-button>
  <ms-button block disabled variant="dashed" theme="primary">禁用虚框</ms-button>
  <ms-button block disabled theme="light">禁用浅色</ms-button>
</template>

<script setup lang="uts">
function onThemeClick(name: string) : void {
  console.log('onThemeClick')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | Theme: default / primary / danger / success / warning / light |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | Variant: solid / outline / dashed / text |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size: xs / sm / md / lg |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | Shape: rectangle / square / round / circle |
| block | `boolean` | `false` | Whether full width |
| ghost | `boolean` | `false` | Ghost button (transparent fill, outlined) |
| disabled | `boolean` | `false` | Whether disabled |
| loading | `boolean` | `false` | Whether loading |
| loadingText | `string` | `'加载中…'` | Loading text; empty string shows spinner only |
| icon | `string` | `''` | Left icon name; can coexist with text |
| iconOnly | `boolean` | `false` | Icon only (square hit area) |
| formType | `'' \| 'submit' \| 'reset'` | `''` | Native form type: submit / reset; empty = normal button |
| haptic | `boolean` | `true` | Short haptic on App/MP click; skipped automatically on Web |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-button/`
- Demo: `#/pages/demo/basic/button`
- Chinese docs: [/uniappx/components/button](/uniappx/components/button)
