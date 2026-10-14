---
title: Dropdown 下拉
demo: pages/demo/nav/dropdown
---

# Dropdown 下拉

`ms-dropdown` 是下拉筛选菜单，由 `menus`（菜单栏）和扁平的 `options`（通过 `menu` 下标关联到菜单）生成，不需要注册子组件。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-dropdown`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/nav/dropdown`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/dropdown.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

```vue
<template>
  <ms-dropdown
    :menus="singleMenus"
    :options="singleOptions"
    :height="300"
    @change="onSingleChange"
  />
  <ms-dropdown
    :menus="multiMenus"
    :options="multiOptions"
    :height="320"
    @change="onMultiChange"
    @reset="onMultiReset"
  />
  <ms-dropdown
    :menus="disabledMenus"
    :options="disabledOptions"
    :height="260"
    @change="onDisabledChange"
  />
  <ms-dropdown
    :menus="columnMenus"
    :options="columnOptions"
    :height="320"
    @change="onColumnChange"
  />
</template>

<script setup lang="uts">
const columnMenus = [
  { label: '三列多选', multiple: true, columns: 3 } as UTSJSONObject,
  { label: '双列单选', columns: 2 } as UTSJSONObject,
] as UTSJSONObject[]

const columnOptions = [
  { menu: 0, label: '一', value: 'c1', checked: true } as UTSJSONObject,
  { menu: 0, label: '二', value: 'c2' } as UTSJSONObject,
  { menu: 0, label: '三', value: 'c3' } as UTSJSONObject,
  { menu: 0, label: '四', value: 'c4' } as UTSJSONObject,
  { menu: 0, label: '五', value: 'c5' } as UTSJSONObject,
  { menu: 0, label: '六', value: 'c6' } as UTSJSONObject,
  { menu: 1, label: '左列', value: 'l1', checked: true } as UTSJSONObject,
  { menu: 1, label: '右列', value: 'r1' } as UTSJSONObject,
] as UTSJSONObject[]

const disabledMenus = [
  { label: '可选菜单' } as UTSJSONObject,
  { label: '停用菜单', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const disabledOptions = [
  { menu: 0, label: '可选项', value: 'ok', checked: true } as UTSJSONObject,
  { menu: 0, label: '禁用选项', value: 'no', disabled: true } as UTSJSONObject,
  { menu: 1, label: '不会展开', value: 'x' } as UTSJSONObject,
] as UTSJSONObject[]

const multiMenus = [
  { label: '单列多选', multiple: true } as UTSJSONObject,
  { label: '双列多选', multiple: true, columns: 2 } as UTSJSONObject,
] as UTSJSONObject[]

const multiOptions = [
  { menu: 0, label: '选项一', value: 'm1', checked: true } as UTSJSONObject,
  { menu: 0, label: '选项二', value: 'm2' } as UTSJSONObject,
  { menu: 0, label: '选项三', value: 'm3' } as UTSJSONObject,
  { menu: 1, label: '双列一', value: 'd1', checked: true } as UTSJSONObject,
  { menu: 1, label: '双列二', value: 'd2' } as UTSJSONObject,
  { menu: 1, label: '双列三', value: 'd3' } as UTSJSONObject,
  { menu: 1, label: '双列四', value: 'd4' } as UTSJSONObject,
] as UTSJSONObject[]

const singleMenus = [
  { label: '全部产品' } as UTSJSONObject,
  { label: '默认排序' } as UTSJSONObject,
] as UTSJSONObject[]

const singleOptions = [
  { menu: 0, label: '全部产品', value: 'all', checked: true } as UTSJSONObject,
  { menu: 0, label: '最新产品', value: 'new' } as UTSJSONObject,
  { menu: 0, label: '最火产品', value: 'hot' } as UTSJSONObject,
  { menu: 1, label: '默认排序', value: 'default', checked: true } as UTSJSONObject,
  { menu: 1, label: '价格从高到低', value: 'price' } as UTSJSONObject,
] as UTSJSONObject[]

function onSingleChange(index: number, values: string[]) : void {
  console.log('onSingleChange')
}

function onMultiChange(index: number, values: string[]) : void {
  console.log('onMultiChange')
}

function onMultiReset(index: number) : void {
  console.log('onMultiReset')
}

function onDisabledChange(index: number, values: string[]) : void {
  console.log('onDisabledChange')
}

function onColumnChange(index: number, values: string[]) : void {
  console.log('onColumnChange')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| menus | `UTSJSONObject[]` | `[]` | 菜单栏：label / multiple / columns(1-3) / disabled |
| options | `UTSJSONObject[]` | `[]` | 扁平选项：menu(下标) / label / value / disabled / checked |
| height | `number` | `320` | 组件占位总高（不支持百分比高度；遮罩覆盖该区域） |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnClickOverlay | `boolean` | `true` | 点遮罩是否关闭 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| open | 打开 |
| close | 关闭 |
| confirm | 确认 |
| reset | 重置 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-dropdown/`
- 演示: `#/pages/demo/nav/dropdown`
