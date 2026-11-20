---
title: Cascader 级联
demo: pages/demo/form/cascader
---

# Cascader 级联

`ms-cascader` 是级联选择器。传入扁平的 `options`（包含 value、label、parent），在弹层中逐级选择。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-cascader
    :visible="stepVisible"
    :options="areaOptions"
    :value="stepValue"
    title="请选择地址"
    @update:visible="onStepVisible"
    @change="onStepChange"
    @pick="onStepPick"
  />
  <ms-cascader
    :visible="tabVisible"
    :options="areaOptions"
    theme="tab"
    title="请选择地址"
    @update:visible="onTabVisible"
    @change="onTabChange"
  />
  <ms-cascader
    :visible="looseVisible"
    :options="areaOptions"
    check-strictly
    :close-btn="false"
    title="请选择地址"
    @update:visible="onLooseVisible"
    @change="onLooseChange"
  />
</template>

<script setup lang="uts">
const areaOptions = [
  { value: '110000', label: '北京市', parent: '' } as UTSJSONObject,
  { value: '120000', label: '天津市', parent: '' } as UTSJSONObject,
  { value: '330000', label: '浙江省', parent: '' } as UTSJSONObject,
  { value: '110100', label: '北京市', parent: '110000' } as UTSJSONObject,
  { value: '120100', label: '天津市', parent: '120000' } as UTSJSONObject,
  { value: '330100', label: '杭州市', parent: '330000' } as UTSJSONObject,
  { value: '330200', label: '宁波市', parent: '330000' } as UTSJSONObject,
  { value: '110101', label: '东城区', parent: '110100' } as UTSJSONObject,
  { value: '110105', label: '朝阳区', parent: '110100' } as UTSJSONObject,
  { value: '110108', label: '海淀区', parent: '110100' } as UTSJSONObject,
  { value: '120101', label: '和平区', parent: '120100' } as UTSJSONObject,
  { value: '330102', label: '上城区', parent: '330100' } as UTSJSONObject,
  { value: '330106', label: '西湖区', parent: '330100' } as UTSJSONObject,
  { value: '330203', label: '海曙区', parent: '330200' } as UTSJSONObject,
] as UTSJSONObject[]

const looseVisible = ref(false)

const stepValue = ref('110105')

const stepVisible = ref(false)

const tabVisible = ref(false)

function onStepVisible(shown: boolean): void {
  stepVisible.value = shown
}

function onStepChange(value: string, label: string) : void {
  console.log('onStepChange')
}

function onStepPick(value: string, label: string, level: number) : void {
  console.log('onStepPick')
}

function onTabVisible(shown: boolean): void {
  tabVisible.value = shown
}

function onTabChange(value: string, label: string) : void {
  console.log('onTabChange')
}

function onLooseVisible(shown: boolean): void {
  looseVisible.value = shown
}

function onLooseChange(value: string, label: string) : void {
  console.log('onLooseChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 扁平节点：value + label + parent（根节点 parent 为空串） |
| value | `string` | `''` | 选中的叶子 value |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 弹层标题 |
| placeholder | `string` | `'选择选项'` | 未选中时的步骤占位文案 |
| theme | `string` | `'step'` | 展示风格：step / tab |
| subTitles | `string[]` | `[]` | 每级次标题 |
| checkStrictly | `boolean` | `false` | 允许选择任意一级，开启后头部显示确定按钮 |
| closeBtn | `boolean` | `true` | 是否显示关闭按钮 |
| optionsHeight | `number` | `280` | 选项区高度 px |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 弹层关闭时触发，值为 `false`，用于 `v-model:visible` |
| change | `value: string, label: string` | 选择完成时触发，`value` 是所选节点的值，`label` 是各级名称用 ` / ` 连接成的路径 |
| pick | `value: string, label: string, level: number` | 点击某一级的选项时触发，`level` 是该级的下标；禁用项不触发 |
| close | — | 弹层关闭时触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getLabel(): string` | 返回当前已选路径的名称，各级用 ` / ` 连接 |
| `confirm()` | 按当前已选路径完成选择，等同于点击确定 |
