---
title: More 更多
demo: pages/demo/nav/more
---

# More 更多

`ms-more` 把较长的内容收起到固定高度，点击下方的操作区展开或收起。

展开状态由 `opened` 控制，组件不会自己切换，需要在 `change` 事件里更新它。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | 是否展开 |
| collapsedSize | `'sm' \| 'md' \| 'lg'` | `'md'` | 收起时的可见高度：sm / md / lg |
| expandText | `string` | `'展开更多'` | 展开文案 |
| collapseText | `string` | `'收起'` | 收起文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| showAction | `boolean` | `true` | 是否显示展开/收起操作区 |
| showIcon | `boolean` | `true` | 是否显示展开/收起箭头图标 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `opened: boolean` | 点击操作区时触发，`opened` 是切换后的状态；禁用时不触发 |
| click | `opened: boolean` | 点击操作区时触发，`opened` 是点击前的状态；禁用时也会触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 要收起的内容 |
| action | 自定义操作区，作用域参数 `opened` 表示是否展开 |
