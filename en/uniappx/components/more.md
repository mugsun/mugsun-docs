---
title: More
demo: pages/demo/nav/more
---

# More

`ms-more` collapses content that exceeds a set height; tap to expand or collapse it.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-more`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/nav/more`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/more.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-more
    :opened="baseOpened"
    @change="onBaseChange"
  >
    <ms-paragraph :content="longText" />
  </ms-more>
  <ms-more
    :opened="tallOpened"
    collapsed-size="lg"
    @change="onTallChange"
  >
    <ms-paragraph :content="longText" />
    <ms-paragraph tone="secondary" content="Note: the large collapsed height suits long content with images." />
  </ms-more>
  <!-- States -->
  <ms-more
    :opened="false"
    disabled
    expand-text="Cannot expand yet"
  >
    <ms-paragraph :content="longText" />
  </ms-more>
  <!-- Advanced -->
  <ms-more
    :opened="smOpened"
    collapsed-size="sm"
    @change="onSmChange"
  >
    <ms-paragraph :content="longText" />
  </ms-more>
  <ms-more
    :opened="customOpened"
    :show-icon="false"
    expand-text="Read more"
    collapse-text="Show less"
    @change="onCustomChange"
  >
    <ms-paragraph :content="longText" />
    <template #action>
      <ms-button size="sm" theme="primary" variant="text">
        {{ customOpened ? 'Show less' : 'Read more' }}
      </ms-button>
    </template>
  </ms-more>
  <ms-more :opened="true" :show-action="false">
    <ms-paragraph :content="longText" />
  </ms-more>
</template>

<script setup lang="uts">
const baseOpened = ref(false)

const customOpened = ref(false)

const longText =

const smOpened = ref(false)

const tallOpened = ref(false)

function onBaseChange(opened: boolean) : void {
  console.log('onBaseChange')
}

function onTallChange(opened: boolean) : void {
  console.log('onTallChange')
}

function onSmChange(opened: boolean) : void {
  console.log('onSmChange')
}

function onCustomChange(opened: boolean) : void {
  console.log('onCustomChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | Whether expanded |
| collapsedSize | `'sm' \| 'md' \| 'lg'` | `'md'` | Collapsed visible height tier: sm / md / lg |
| expandText | `string` | `'展开更多'` | Expand label |
| collapseText | `string` | `'收起'` | Collapse label |
| disabled | `boolean` | `false` | Whether disabled |
| showAction | `boolean` | `true` | Whether to show expand/collapse actions |
| showIcon | `boolean` | `true` | Whether to show expand/collapse arrow |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| action | `action` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-more/`
- Demo: `#/pages/demo/nav/more`
- Chinese docs: [/uniappx/components/more](/uniappx/components/more)
