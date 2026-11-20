---
title: Card
demo: pages/demo/display/card
---

# Card

`ms-card` is a content card with a fixed structure: cover image, title, subtitle and body from top to bottom, plus a `footer` slot for actions.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Title |
| subtitle | `string` | `''` | Subtitle |
| content | `string` | `''` | Body text |
| image | `string` | `''` | Cover image URL |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | Cover height tier: sm / md / lg |
| statusIcon | `string` | `''` | Name of the status icon in the top-right corner; empty hides it |
| radius | `'md' \| 'lg'` | `'lg'` | Corner radius size |
| bordered | `boolean` | `false` | Whether to show border |
| shadow | `boolean` | `false` | Whether shadowed |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the card is tapped |
| status | — | Fires when the status icon in the top-right corner is tapped |

## Slots

| Slot | Description |
| --- | --- |
| image | Custom cover area; shows the `image` picture by default |
| title | Custom title; shows `title` by default |
| subtitle | Custom subtitle; shows `subtitle` by default |
| default | Custom body; shows `content` by default |
| footer | Bottom area of the card, usually for action buttons |
