---
title: More
demo: pages/demo/nav/more
---

# More

`ms-more` — More for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-more` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/more`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/more.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
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
    <ms-paragraph tone="secondary" content="附加说明：大号收起高度适合带配图的长内容。" />
  </ms-more>
  <!-- 组件状态 -->
  <ms-more
    :opened="false"
    disabled
    expand-text="暂不可展开"
  >
    <ms-paragraph :content="longText" />
  </ms-more>
  <!-- 组件深度 -->
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
    expand-text="查看全文"
    collapse-text="收起全文"
    @change="onCustomChange"
  >
    <ms-paragraph :content="longText" />
    <template #action>
      <ms-button size="sm" theme="primary" variant="text">
        {{ customOpened ? '收起全文' : '查看全文' }}
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
