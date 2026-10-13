---
title: Footer
demo: pages/demo/nav/footer
---

# Footer

`ms-footer` — Footer for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-footer` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/footer`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/footer.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `''` | Display text |
| links | `UTSJSONObject[]` | `[]` | Footer link list (name, etc.) |
| logoTitle | `string` | `''` | Title next to the logo |
| logoIcon | `string` | `''` | Logo icon name |
| logoWithInfo | `boolean` | `false` | In logo mode, whether to still show links and copyright |

## Events

| Event | Description |
| --- | --- |
| link | Link click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-footer/`
- Demo: `#/pages/demo/nav/footer`
- Chinese docs: [/uniappx/components/footer](/uniappx/components/footer)
