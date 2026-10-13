---
title: Drawer 抽屉
demo: pages/demo/feedback/drawer
---

# Drawer 抽屉

`ms-drawer`：侧边抽屉：标题 + 可滚菜单列表 + 底部插槽，从左或右弹出。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-drawer`）。
演示路由：`#/pages/demo/feedback/drawer`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/drawer.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-drawer
    :visible="showBase"
    :items="baseItems"
    @update:visible="onBaseVisible"
    @item-click="onPick"
  />
  <ms-drawer
    :visible="showTitled"
    :items="baseItems"
    title="菜单"
    @update:visible="onTitledVisible"
    @item-click="onPick"
  />
  <ms-drawer
    :visible="showIcon"
    :items="iconItems"
    title="快捷入口"
    @update:visible="onIconVisible"
    @item-click="onPick"
  />
</template>

<script setup lang="uts">
const showBase = ref(false)
const showTitled = ref(false)
const showIcon = ref(false)
const baseItems = ref([
const iconItems = ref([
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| placement | `'left' \| 'right'` | `'right'` | 弹出/摆放位置 |
| title | `string` | `''` | 标题 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 title / icon / disabled |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| closeOnSelect | `boolean` | `true` | 点菜单项后是否自动关闭 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| item-click | 点击菜单项 |
| overlay-click | 点击遮罩 |
| close | 关闭 |
| open | 打开 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-drawer/`
- 演示: `#/pages/demo/feedback/drawer`
