---
title: Action Sheet 动作面板
demo: pages/demo/feedback/action-sheet
---

# Action Sheet 动作面板

`ms-action-sheet`：底部动作面板：`items` 传菜单项，选中抛下标并自动关闭。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-action-sheet`）。
演示路由：`#/pages/demo/feedback/action-sheet`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/action-sheet.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-action-sheet
    :visible="showRecipeShare"
    :items="shareItems"
    description="分享到"
    @update:visible="onRecipeShareVisible"
    @select="onRecipeShareSelect"
  />
  <ms-action-sheet
    :visible="showList"
    :items="plainItems"
    @update:visible="onListVisible"
    @select="onSelect"
  />
  <ms-action-sheet
    :visible="showIcon"
    :items="iconItems"
    @update:visible="onIconVisible"
    @select="onSelect"
  />
</template>

<script setup lang="uts">
const showList = ref(false)
const showIcon = ref(false)
const showRecipeShare = ref(false)
const shareItems = ref([
const plainItems = ref([
const iconItems = ref([
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / description / icon / tone('default'\|'primary'\|'danger') / disabled |
| theme | `'list' \| 'grid'` | `'list'` | 主题色 |
| align | `'center' \| 'left'` | `'center'` | 对齐方式 |
| description | `string` | `''` | 描述文案 |
| showCancel | `boolean` | `true` | 是否显示取消按钮 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| select | select |
| cancel | 取消 |
| close | 关闭 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-action-sheet/`
- 演示: `#/pages/demo/feedback/action-sheet`
