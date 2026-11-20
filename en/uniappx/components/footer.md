---
title: Footer
demo: pages/demo/nav/footer
---

# Footer

`ms-footer` is a page footer for copyright, links and branding. The default slot accepts custom content.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `''` | Copyright text |
| links | `UTSJSONObject[]` | `[]` | Links; each item has a `name` |
| logoTitle | `string` | `''` | Title next to the logo |
| logoIcon | `string` | `''` | Logo icon name |
| logoWithInfo | `boolean` | `false` | In logo mode, whether to still show links and copyright |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| link | `index: number` | Fires when a link is tapped; `index` is the link's index. The component does not navigate, so handle it yourself |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom footer content that replaces the default branding, links and copyright |
