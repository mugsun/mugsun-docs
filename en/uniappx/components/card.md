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
  <!-- 基础用法 -->
  <ms-card
    image="/static/demo-cover.png"
    image-height="sm"
    title="图文卡片标题"
    subtitle="副标题说明文字"
    content="头图、标题、副标题与正文按固定层次排布，正文超出时按行高换行。"
    bordered
  />
  <ms-card
    title="纯文字卡片标题"
    subtitle="没有头图时首行即标题"
    content="没有头图时不占位，卡片高度跟随内容。"
    bordered
  />
  <!-- 内容与底部 -->
  <ms-card title="内容插槽标题" subtitle="正文区可放任意内容" bordered>
    <view>
      <view>
        <ms-tag theme="primary">标签一</ms-tag>
      </view>
      <view>
        <ms-tag theme="success">标签二</ms-tag>
      </view>
    </view>
  </ms-card>
  <ms-card title="底部操作卡片" subtitle="底部放置操作按钮" bordered>
    <template #footer>
      <view>
        <view>
          <ms-button size="sm" variant="outline" theme="default" @click="onFooter('取消')">取消</ms-button>
        </view>
        <ms-button size="sm" theme="primary" @click="onFooter('确定')">确定</ms-button>
      </view>
    </template>
  </ms-card>
  <!-- 外观 -->
  <ms-card title="描边卡片" subtitle="细线描边，适合浅底页面" bordered />
  <ms-card title="投影卡片" subtitle="轻投影抬升层次" shadow />
  <!-- 状态图标 -->
  <ms-card
    title="带状态图标"
    subtitle="点击右上角图标不触发卡片点击"
    status-icon="more-line"
    bordered
    @status="onStatus"
  />
  <ms-card title="无状态图标" subtitle="不设图标时右上角不占位" bordered />
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
