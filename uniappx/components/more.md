---
title: More 更多
demo: pages/demo/nav/more
---

# More 更多

`ms-more`：内容超高收起，点击展开/收起。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-more`（商业版，源码不公开）。
演示路由：`#/pages/demo/nav/more`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/more.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | 是否已展开 |
| collapsedSize | `'sm' \| 'md' \| 'lg'` | `'md'` | 收起态可见高度档：sm / md / lg |
| expandText | `string` | `'展开更多'` | 展开文案 |
| collapseText | `string` | `'收起'` | 收起文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| showAction | `boolean` | `true` | 是否显示展开/收起操作区 |
| showIcon | `boolean` | `true` | 是否显示展开/收起箭头图标 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| action | `action` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-more/`
- 演示: `#/pages/demo/nav/more`
