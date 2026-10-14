---
title: Card 卡片
demo: pages/demo/display/card
---

# Card 卡片

`ms-card` 是结构化内容卡片，包含头图、标题和副标题、正文、可选的 statusIcon 以及 footer 插槽。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-card`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/card`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/card.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 标题 |
| subtitle | `string` | `''` | 副标题 |
| content | `string` | `''` | 内容文案 |
| image | `string` | `''` | 图片地址 |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | 封面图高度档：sm / md / lg |
| statusIcon | `string` | `''` | 右上状态图标名 |
| radius | `'md' \| 'lg'` | `'lg'` | 圆角（px） |
| bordered | `boolean` | `false` | 是否显示边框 |
| shadow | `boolean` | `false` | 是否投影 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| status | 状态变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| footer | `footer` 插槽 |
| image | `image` 插槽 |
| subtitle | `subtitle` 插槽 |
| title | `title` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-card/`
- 演示: `#/pages/demo/display/card`
