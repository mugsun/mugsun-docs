---
title: Picker Selected 搜索选择
demo: pages/demo/form/picker-selected
---

# Picker Selected 搜索选择

`ms-picker-selected` 是弹层式搜索选择器，可以在本地过滤，也可以由使用它的页面异步搜索，支持单选和多选。

选中的值用 `v-model:value` 绑定，点击确定后才会更新。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-picker-selected
    ref="localPickerRef"
    :value="localValue"
    :options="companies"
    title="本地搜索"
    @open="onLocalOpen"
    @confirm="onLocalConfirm"
  >
    <ms-cell title="合作公司" :note="localLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <ms-picker-selected
    :value="remoteValue"
    :options="remoteOptions"
    :local-search="false"
    title="异步搜索"
    @open="onRemoteOpen"
    @search="onRemoteSearch"
    @confirm="onRemoteConfirm"
  >
    <ms-cell title="搜索公司" :note="remoteLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <!-- 组件样式 -->
  <ms-picker-selected
    :value="multiValue"
    :options="companies"
    :multiple="true"
    title="多选公司"
    @open="onMultiOpen"
    @confirm="onMultiConfirm"
  >
    <ms-cell title="多选公司" :note="multiLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <ms-picker-selected
    :value="singleValue"
    :options="companies"
    :multiple="false"
    :required="true"
    title="单选公司"
    @open="onSingleOpen"
    @confirm="onSingleConfirm"
  >
    <ms-cell title="单选公司" :note="singleLabel" arrow :bordered="false" />
  </ms-picker-selected>
</template>

<script setup lang="uts">
const companies = ref([
  { id: '1', name: '广州信瑞化妆品公司' },
  { id: '2', name: '深圳市创明展览设计有限公司' },
  { id: '3', name: '上海盟威实业发展有限公司' },
  { id: '4', name: '国都期货有限公司' },
  { id: '5', name: '山西宇达集团' },
  { id: '6', name: '博达网络有限公司' },
  { id: '7', name: '新贸易有限公司' },
  { id: '8', name: '东莞市东辉仪器有限公司' },
  { id: '9', name: '古兰电子科技有限责任公司' },
  { id: '10', name: '邦达礼品公司' },
  { id: '11', name: '明珠盘艺有限公司' },
  { id: '12', name: '福建古拉特商贸公司' },
] as UTSJSONObject[])

const localLabel = ref('已选 2 项')

const localValue = ref(['2', '8'] as string[])

const multiLabel = ref('广州信瑞化妆品公司')

const multiValue = ref(['1'] as string[])

const remoteLabel = ref('未选择')

const remoteOptions = ref([] as UTSJSONObject[])

const remoteValue = ref([] as string[])

const singleLabel = ref('国都期货有限公司')

const singleValue = ref(['4'] as string[])

function onLocalOpen() : void {
  console.log('onLocalOpen')
}

function onLocalConfirm(ids: string[], labels: string[]) : void {
  console.log('onLocalConfirm')
}

function onRemoteOpen() : void {
  console.log('onRemoteOpen')
}

function onRemoteSearch(keyword: string) : void {
  console.log('onRemoteSearch')
}

function onRemoteConfirm(ids: string[], labels: string[]) : void {
  console.log('onRemoteConfirm')
}

function onMultiOpen() : void {
  console.log('onMultiOpen')
}

function onMultiConfirm(ids: string[], labels: string[]) : void {
  console.log('onMultiConfirm')
}

function onSingleOpen() : void {
  console.log('onSingleOpen')
}

function onSingleConfirm(ids: string[], labels: string[]) : void {
  console.log('onSingleConfirm')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项列表，值和文字的字段名由 `valueKey` 和 `labelKey` 指定 |
| value | `string[]` | `[]` | 选中项的值，可用 `v-model:value` |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `'请选择'` | 标题 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| placeholder | `string` | `'搜索'` | 搜索框占位文字 |
| emptyText | `string` | `'暂无数据'` | 没有数据时的提示文字 |
| valueKey | `string` | `'id'` | 选项值字段名 |
| labelKey | `string` | `'name'` | 选项文字的字段名 |
| filterKey | `string` | `''` | 搜索时匹配的字段名，留空时用 `labelKey` |
| localSearch | `boolean` | `true` | 是否在本地筛选；设为 `false` 时在 `search` 事件里自行搜索并更新 `options` |
| multiple | `boolean` | `true` | 是否多选 |
| required | `boolean` | `false` | 单选时是否禁止取消已选中的项 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| update:value | `ids: string[]` | 点击确定时触发，用于 `v-model:value` |
| search | `keyword: string` | 搜索框内容变化时触发，清空时 `keyword` 为空字符串 |
| change | `ids: string[], labels: string[]` | 在面板里选中或取消一项时触发，这时还没有确认 |
| confirm | `ids: string[], labels: string[]` | 点击确定时触发，参数是选中项的值和文字 |
| cancel | — | 点击取消时触发，面板上的选择恢复为 `value` |
| open | — | 面板打开时触发 |
| close | — | 面板关闭时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 触发元素，点击后打开面板 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getLabels(): string[]` | 返回面板上当前选中项的文字 |
| `open()` | 打开面板，禁用时无效 |
| `close()` | 关闭面板 |
