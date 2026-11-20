---
title: Picker City 城市
demo: pages/demo/form/picker-city
---

# Picker City 城市

`ms-picker-city` 是滚轮式的省市区联动选择器，可以选到市或区。

数据用扁平的 `options` 传入，每项含 `value`、`label` 和 `parent`，格式与 [`ms-cascader`](./cascader) 相同。

组件不内置全国行政区划数据，可以从后端的 `sys_region` 表获取。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-picker-city
    :value="popupValue"
    :options="regions"
    title="选择地区"
    @confirm="onPopupConfirm"
    @change="onChange"
  >
    <ms-cell title="所在地区" :note="popupLabel" arrow :bordered="false" />
  </ms-picker-city>
  <ms-picker-city
    :value="inlineValue"
    :options="regions"
    :use-popup="false"
    title="常驻选择"
    @confirm="onInlineConfirm"
  />
  <!-- 组件样式 -->
  <ms-picker-city
    :value="twoValue"
    :options="regions"
    :level="2"
    :use-popup="false"
    title="省市两级"
    @confirm="onTwoConfirm"
  />
</template>

<script setup lang="uts">
const inlineValue = ref(['110000', '110100', '110102'] as string[])

const popupLabel = ref('上海市 / 上海城区 / 徐汇区')

const popupValue = ref(['310000', '310100', '310104'] as string[])

const regions = ref([
  { value: '110000', label: '北京市', parent: '' },
  { value: '110100', label: '北京城区', parent: '110000' },
  { value: '110101', label: '东城区', parent: '110100' },
  { value: '110102', label: '西城区', parent: '110100' },
  { value: '110105', label: '朝阳区', parent: '110100' },
  { value: '310000', label: '上海市', parent: '' },
  { value: '310100', label: '上海城区', parent: '310000' },
  { value: '310101', label: '黄浦区', parent: '310100' },
  { value: '310104', label: '徐汇区', parent: '310100' },
  { value: '350000', label: '福建省', parent: '' },
  { value: '350100', label: '福州市', parent: '350000' },
  { value: '350102', label: '鼓楼区', parent: '350100' },
  { value: '350103', label: '台江区', parent: '350100' },
  { value: '350200', label: '厦门市', parent: '350000' },
  { value: '350203', label: '思明区', parent: '350200' },
  { value: '350205', label: '海沧区', parent: '350200' },
] as UTSJSONObject[])

const twoValue = ref(['350000', '350200'] as string[])

function onPopupConfirm(values: string[], label: string) : void {
  console.log('onPopupConfirm')
}

function onChange(values: string[], label: string) : void {
  console.log('onChange')
}

function onInlineConfirm(values: string[], label: string) : void {
  console.log('onInlineConfirm')
}

function onTwoConfirm(values: string[], label: string) : void {
  console.log('onTwoConfirm')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 地区列表，每项含 `value`、`label` 和 `parent` |
| value | `string[]` | `[]` | 各级选中的 `value`，留空时取每级第一项，可用 `v-model:value` |
| level | `number` | `3` | 级数：`2` 选到市，`3` 选到区 |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `'选择地区'` | 标题 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| separator | `string` | `' / '` | 各级标签之间的分隔符 |
| itemHeight | `number` | `44` | 单项高度（px） |
| visibleItemCount | `number` | `5` | 可见的选项数 |
| usePopup | `boolean` | `true` | 是否从底部弹出；`false` 时嵌在页面里 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| update:value | `values: string[]` | 点击确定时触发，用于 `v-model:value` |
| change | `values: string[], label: string` | 滚动选择时触发，参数是各级的 `value` 和用分隔符连接的标签；这时还没有确认 |
| confirm | `values: string[], label: string` | 点击确定时触发，参数同 `change` |
| cancel | — | 点击取消时触发，面板上的选择恢复为 `value` |
| close | — | 弹出层关闭时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 触发元素，点击后打开选择器；`usePopup` 为 `false` 时不显示 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getLabel(): string` | 返回面板上当前选择的标签 |
| `confirm()` | 确认当前选择，等同于点击确定 |
| `cancel()` | 取消选择，等同于点击取消 |
| `open()` | 打开选择器 |
| `close()` | 关闭选择器 |
