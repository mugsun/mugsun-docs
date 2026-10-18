---
title: Sidebar 侧栏
demo: pages/demo/nav/sidebar
---

# Sidebar 侧栏

`ms-sidebar` 是侧边分类导航，通过 `items` 和内容插槽使用，当前项用 `v-model:value` 绑定。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-sidebar`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/nav/sidebar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/sidebar.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <ms-sidebar
    :items="baseItems"
    :value="baseIndex"
    :height="280"
    @change="onBaseChange"
  >
    <text>{{ baseTitle }}</text>
    <text>{{ baseBody }}</text>
  </ms-sidebar>
  <ms-sidebar
    :items="iconItems"
    :value="iconIndex"
    :height="240"
    @change="onIconChange"
  >
    <text>{{ iconTitle }}</text>
    <text>带图标侧边导航内容区</text>
  </ms-sidebar>
  <ms-sidebar
    :items="badgeItems"
    :value="badgeIndex"
    :height="240"
    @change="onBadgeChange"
  >
    <text>{{ badgeTitle }}</text>
    <text>徽标用于未读提示</text>
  </ms-sidebar>
  <ms-sidebar
    :items="disabledItems"
    :value="disabledIndex"
    :height="240"
    @change="onDisabledChange"
  >
    <text>{{ disabledTitle }}</text>
    <text>禁用项不可点选</text>
  </ms-sidebar>
</template>

<script setup lang="uts">
const badgeIndex = ref(0)

const badgeItems = [
  { label: '消息', dot: true } as UTSJSONObject,
  { label: '通知', count: 6 } as UTSJSONObject,
  { label: '其他' } as UTSJSONObject,
] as UTSJSONObject[]

const baseIndex = ref(0)

const baseItems = [
  { label: '选项一' } as UTSJSONObject,
  { label: '选项二' } as UTSJSONObject,
  { label: '选项三' } as UTSJSONObject,
  { label: '选项四' } as UTSJSONObject,
] as UTSJSONObject[]

const disabledIndex = ref(0)

const disabledItems = [
  { label: '可选' } as UTSJSONObject,
  { label: '停用', disabled: true } as UTSJSONObject,
  { label: '可选二' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onBadgeChange(index: number) : void {
  console.log('onBadgeChange')
}

function onDisabledChange(index: number) : void {
  console.log('onDisabledChange')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled |
| height | `number` | `320` | 侧栏总高，只接受数值（px），请填写 token 对应的数值 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:value | v-model:value 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sidebar/`
- 演示: `#/pages/demo/nav/sidebar`
