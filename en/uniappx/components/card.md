---
title: Card
demo: pages/demo/display/card
---

# Card

`ms-card` — Card for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-card` (commercial edition; source not public).
Demo route: `#/pages/demo/display/card`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/card.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Basic usage -->
  <ms-card
    image="/static/demo-cover.png"
    image-height="sm"
    title="Image card title"
    subtitle="Subtitle text"
    content="The cover image, title, subtitle and body follow a fixed hierarchy; long body text wraps by line height."
    bordered
  />
  <ms-card
    title="Text-only card title"
    subtitle="Without a cover image, the title is the first line"
    content="No space is reserved without a cover image; the card height follows its content."
    bordered
  />
  <!-- Content and footer -->
  <ms-card title="Content slot title" subtitle="The body can hold any content" bordered>
    <view>
      <view>
        <ms-tag theme="primary">Tag 1</ms-tag>
      </view>
      <view>
        <ms-tag theme="success">Tag 2</ms-tag>
      </view>
    </view>
  </ms-card>
  <ms-card title="Footer actions card" subtitle="Action buttons in the footer" bordered>
    <template #footer>
      <view>
        <view>
          <ms-button size="sm" variant="outline" theme="default" @click="onFooter('Cancel')">Cancel</ms-button>
        </view>
        <ms-button size="sm" theme="primary" @click="onFooter('OK')">OK</ms-button>
      </view>
    </template>
  </ms-card>
  <!-- Appearance -->
  <ms-card title="Outlined card" subtitle="Thin border, suits light backgrounds" bordered />
  <ms-card title="Shadow card" subtitle="A light shadow adds elevation" shadow />
  <!-- Status icon -->
  <ms-card
    title="With status icon"
    subtitle="Tapping the top-right icon does not trigger the card click"
    status-icon="more-line"
    bordered
    @status="onStatus"
  />
  <ms-card title="No status icon" subtitle="No space is reserved in the top-right without an icon" bordered />
</template>

<script setup lang="uts">
function onFooter(action: string) : void {
  console.log('onFooter')
}

function onStatus() : void {
  console.log('onStatus')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Title |
| subtitle | `string` | `''` | Subtitle |
| content | `string` | `''` | Content text |
| image | `string` | `''` | Image URL |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | Cover height tier: sm / md / lg |
| statusIcon | `string` | `''` | Top-right status icon name |
| radius | `'md' \| 'lg'` | `'lg'` | Border radius (px) |
| bordered | `boolean` | `false` | Whether to show border |
| shadow | `boolean` | `false` | Whether shadowed |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| status | Status changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| footer | `footer` slot |
| image | `image` slot |
| subtitle | `subtitle` slot |
| title | `title` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-card/`
- Demo: `#/pages/demo/display/card`
- Chinese docs: [/uniappx/components/card](/uniappx/components/card)
