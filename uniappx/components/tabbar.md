---
title: Tabbar 底栏
demo: pages/demo/nav/tabbar
---

# Tabbar 底栏

`ms-tabbar`：底部导航：纯文字 / 图标 / 徽标；`v-model:value`；fixed + placeholder。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-tabbar`（商业版，源码不公开）。
演示路由：`#/pages/demo/nav/tabbar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/tabbar.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <ms-tabbar
    :items="textItems"
    :value="textIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTextChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="iconTextIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconTextChange"
  />
  <ms-tabbar
    :items="iconItems"
    :value="iconIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="tagIndex"
    theme="tag"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTagChange"
  />
  <ms-tabbar
    :items="disabledItems"
    :value="disabledIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onDisabledChange"
  />
  <ms-tabbar
    :items="textItems"
    :value="splitIndex"
    split
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onSplitChange"
  />
</template>

<script setup lang="uts">
const disabledIndex = ref(0)

const disabledItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '停用', icon: 'megaphone-line', disabled: true } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { icon: 'home-3-line' } as UTSJSONObject,
  { icon: 'search-line' } as UTSJSONObject,
  { icon: 'megaphone-line' } as UTSJSONObject,
  { icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconTextIndex = ref(0)

const iconTextItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '消息', icon: 'megaphone-line' } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const splitIndex = ref(0)

const tagIndex = ref(1)

const textIndex = ref(0)

const textItems = [
  { label: '首页' } as UTSJSONObject,
  { label: '应用' } as UTSJSONObject,
  { label: '聊天' } as UTSJSONObject,
  { label: '我的' } as UTSJSONObject,
] as UTSJSONObject[]

function onTextChange(index: number) : void {
  console.log('onTextChange')
}

function onIconTextChange(index: number) : void {
  console.log('onIconTextChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onTagChange(index: number) : void {
  console.log('onTagChange')
}

function onDisabledChange(index: number) : void {
  console.log('onDisabledChange')
}

function onSplitChange(index: number) : void {
  console.log('onSplitChange')
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
| theme | `'normal' \| 'tag'` | `'normal'` | 主题色 |
| shape | `'normal' \| 'round'` | `'normal'` | 外形 |
| bordered | `boolean` | `true` | 顶部外边框 |
| split | `boolean` | `false` | 项间分割线 |
| fixed | `boolean` | `true` | 是否固定定位 |
| placeholder | `boolean` | `false` | fixed 时在文档流占位，避免压住页面底部内容 |
| safeAreaInsetBottom | `boolean` | `true` | 是否预留底部安全区 |
| zIndex | `number` | `400` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tabbar/`
- 演示: `#/pages/demo/nav/tabbar`
