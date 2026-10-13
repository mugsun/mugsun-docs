---
title: Picker Selected 搜索选
demo: pages/demo/form/picker-selected
---

# Picker Selected 搜索选

`ms-picker-selected`：弹层式搜索选择。本地过滤或宿主异步搜；支持多选/单选。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-picker-selected`（源码仓暂未公开）。
演示路由：`#/pages/demo/form/picker-selected`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/picker-selected.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项列表 |
| value | `string[]` | `[]` | 当前值 |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `'请选择'` | 标题 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| placeholder | `string` | `'搜索'` | 占位文案 |
| emptyText | `string` | `'暂无数据'` | 空态文案 |
| valueKey | `string` | `'id'` | 选项值字段名 |
| labelKey | `string` | `'name'` | 选项文案字段名 |
| filterKey | `string` | `''` | 搜索匹配字段名 |
| localSearch | `boolean` | `true` | 是否在本地 options 内筛选 |
| multiple | `boolean` | `true` | 是否多选 |
| required | `boolean` | `false` | 是否必填 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| update:value | v-model:value 更新 |
| search | search |
| change | 值变化 |
| confirm | 确认 |
| cancel | 取消 |
| open | 打开 |
| close | 关闭 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-picker-selected/`
- 演示: `#/pages/demo/form/picker-selected`
