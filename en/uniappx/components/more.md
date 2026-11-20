---
title: More
demo: pages/demo/nav/more
---

# More

`ms-more` collapses long content to a fixed height; tap the action area below it to expand or collapse.

The expanded state is controlled by `opened`. The component does not toggle it by itself, so update it in the `change` event.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | Whether the content is expanded |
| collapsedSize | `'sm' \| 'md' \| 'lg'` | `'md'` | Visible height when collapsed: sm / md / lg |
| expandText | `string` | `'展开更多'` | Expand label; the default is Chinese for "Show more" |
| collapseText | `string` | `'收起'` | Collapse label; the default is Chinese for "Collapse" |
| disabled | `boolean` | `false` | Whether disabled |
| showAction | `boolean` | `true` | Whether to show expand/collapse actions |
| showIcon | `boolean` | `true` | Whether to show expand/collapse arrow |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `opened: boolean` | Fires when the action area is tapped; `opened` is the state after the toggle. Not fired while disabled |
| click | `opened: boolean` | Fires when the action area is tapped; `opened` is the state before the tap. Also fired while disabled |

## Slots

| Slot | Description |
| --- | --- |
| default | The content to collapse |
| action | Custom action area; the scoped value `opened` tells whether it is expanded |
