---
title: Collapse 折叠
demo: pages/demo/display/collapse
---

# Collapse 折叠

`ms-collapse`：折叠面板：`items` 驱动；`accordion` / `theme` / `expandIcon` / `defaultExpandAll`；受控 `value`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-collapse`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/collapse`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/collapse.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-collapse
    :items="baseItems"
    :value="baseValue"
    @change="onBaseChange"
  />
  <ms-collapse
    :items="actionItems"
    @change="onActionChange"
  />
  <ms-collapse
    :items="accordionItems"
    :value="accordionValue"
    accordion
    @change="onAccordionChange"
  />
  <ms-collapse
    :items="disabledItems"
    @change="onDisabledChange"
  />
  <!-- 样式 -->
  <ms-collapse
    :items="cardItems"
    :value="cardValue"
    theme="card"
    @change="onCardChange"
  />
  <ms-collapse :items="baseItems" :expand-icon="false" />
  <ms-collapse :items="accordionItems" :default-expand-all="true" />
  <ms-collapse
    v-model:value="modelValue"
    :items="baseItems"
    @change="onModelChange"
  />
</template>

<script setup lang="uts">
const modelValue = ref([0] as number[])
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / content / note / icon / disabled |
| value | `number[]` | `[]` | 展开的项下标集合（受控） |
| accordion | `boolean` | `false` | 手风琴：每次只展开一个 |
| theme | `string` | `'default'` | 风格：default 通栏 / card 卡片 |
| expandIcon | `boolean` | `true` | 是否显示展开箭头 |
| disabled | `boolean` | `false` | 整体禁用（项上 disabled 优先） |
| defaultExpandAll | `boolean` | `false` | 首次是否全部展开（未传 value 时生效） |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-collapse/`
- 演示: `#/pages/demo/display/collapse`
