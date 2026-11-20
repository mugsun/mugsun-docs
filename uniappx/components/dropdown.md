---
title: Dropdown 下拉
demo: pages/demo/nav/dropdown
---

# Dropdown 下拉

`ms-dropdown` 是下拉筛选菜单。`menus` 定义菜单栏，`options` 是全部选项，每个选项用 `menu` 指明属于第几个菜单。

单选菜单点选后立即关闭并更新栏上的标题，多选菜单在底部点确定后提交。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| menus | `UTSJSONObject[]` | `[]` | 菜单栏：label / multiple / columns(1-3) / disabled |
| options | `UTSJSONObject[]` | `[]` | 扁平选项：menu(下标) / label / value / disabled / checked |
| height | `number` | `320` | 组件占用的总高度（px），下拉面板和遮罩都显示在这个范围内 |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnClickOverlay | `boolean` | `true` | 点击遮罩是否关闭 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: number, values: string[]` | 选中值变化时触发，`index` 是菜单下标，`values` 是该菜单已选的值 |
| open | `index: number` | 展开某个菜单时触发 |
| close | `index: number` | 收起菜单时触发 |
| confirm | `index: number, values: string[]` | 多选菜单点击确定时触发 |
| reset | `index: number` | 多选菜单点击重置时触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `close()` | 收起当前展开的菜单 |
| `getValues(index: number): string[]` | 返回指定菜单已选的值 |
