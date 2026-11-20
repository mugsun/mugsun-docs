---
title: Card 卡片
demo: pages/demo/display/card
---

# Card 卡片

`ms-card` 是带固定结构的内容卡片，从上到下是封面图、标题、副标题和正文，底部可以用 `footer` 插槽放操作按钮。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 标题 |
| subtitle | `string` | `''` | 副标题 |
| content | `string` | `''` | 正文文字 |
| image | `string` | `''` | 封面图地址 |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | 封面图高度档：sm / md / lg |
| statusIcon | `string` | `''` | 右上角状态图标的名称，留空不显示 |
| radius | `'md' \| 'lg'` | `'lg'` | 圆角大小 |
| bordered | `boolean` | `false` | 是否显示边框 |
| shadow | `boolean` | `false` | 是否投影 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击卡片时触发 |
| status | — | 点击右上角状态图标时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| image | 自定义封面区域，默认显示 `image` 指定的图片 |
| title | 自定义标题，默认显示 `title` |
| subtitle | 自定义副标题，默认显示 `subtitle` |
| default | 自定义正文，默认显示 `content` |
| footer | 卡片底部区域，一般放操作按钮 |
