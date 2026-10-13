---
title: Notice Bar
demo: pages/demo/feedback/notice-bar
---

# Notice Bar

`ms-notice-bar` — Notice Bar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-notice-bar` (repository not yet public).
Demo route: `#/pages/demo/feedback/notice-bar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/notice-bar.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 主题 -->
  <ms-notice-bar theme="default" content="默认公告" />
  <ms-notice-bar theme="primary" content="主色公告" />
  <ms-notice-bar theme="success" content="成功公告" />
  <!-- 长文本 -->
  <ms-notice-bar
    theme="primary"
    content="这是一条很长的公告文案，超出宽度时应省略显示而不是撑破布局"
  />
  <!-- 竖向 -->
  <ms-notice-bar direction="vertical" theme="primary" :list="verticalList" />
  <!-- 可关闭 -->
  <ms-notice-bar theme="warning" content="可关闭公告" closable @close="onNoticeClose" />
</template>

<script setup lang="uts">
const verticalList = ['轮播公告一', '轮播公告二', '轮播公告三'] as string[]

function onNoticeClose() : void {
  console.log('onNoticeClose')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Theme color |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| content | `string` | `''` | Content text |
| list | `string[]` | `[]` | Data list |
| closable | `boolean` | `false` | Whether closable |
| icon | `string` | `'megaphone-line'` | Icon name (icons.uts) |
| showIcon | `boolean` | `true` | Whether to show the left icon; also hidden when icon is empty |
| operation | `string` | `''` | Right action label |
| suffixIcon | `string` | `''` | Right suffix icon; closable wins if both set |
| interval | `number` | `3000` | Vertical autoplay interval (ms) |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| operation | operation |

## See also

- Component: `uni_modules/ms-ui/components/ms-notice-bar/`
- Demo: `#/pages/demo/feedback/notice-bar`
- Chinese docs: [/uniappx/components/notice-bar](/uniappx/components/notice-bar)
