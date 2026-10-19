---
title: Footer
demo: pages/demo/nav/footer
---

# Footer

`ms-footer` is a page footer for copyright, links and branding. The default slot accepts custom content.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-footer`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/nav/footer`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/footer.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
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
  <!-- Advanced -->
  <ms-footer
    logo-title="Mugsun"
    logo-icon="/static/logo.png"
    logo-with-info
    text="Copyright © 2026 Mugsun"
    :links="multiLinks"
    @link="onLink"
  />
  <ms-footer>
    <text>Custom content · footer slot</text>
  </ms-footer>
  <ms-footer :links="multiLinks" @link="onLink" />
</template>

<script setup lang="uts">
const multiLinks = [
  { name: 'Terms of Service' } as UTSJSONObject,
  { name: 'Privacy Policy' } as UTSJSONObject,
] as UTSJSONObject[]

const singleLinks = [{ name: 'Terms of Service' } as UTSJSONObject] as UTSJSONObject[]

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
