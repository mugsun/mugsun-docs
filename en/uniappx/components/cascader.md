---
title: Cascader
demo: pages/demo/form/cascader
---

# Cascader

`ms-cascader` is a cascading selector. Pass flat `options` (with value, label and parent) and choose level by level in a popup.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-cascader
    :visible="stepVisible"
    :options="areaOptions"
    :value="stepValue"
    title="Select an address"
    @update:visible="onStepVisible"
    @change="onStepChange"
    @pick="onStepPick"
  />
  <ms-cascader
    :visible="tabVisible"
    :options="areaOptions"
    theme="tab"
    title="Select an address"
    @update:visible="onTabVisible"
    @change="onTabChange"
  />
  <ms-cascader
    :visible="looseVisible"
    :options="areaOptions"
    check-strictly
    :close-btn="false"
    title="Select an address"
    @update:visible="onLooseVisible"
    @change="onLooseChange"
  />
</template>

<script setup lang="uts">
const areaOptions = [
  { value: '110000', label: 'Beijing', parent: '' } as UTSJSONObject,
  { value: '120000', label: 'Tianjin', parent: '' } as UTSJSONObject,
  { value: '330000', label: 'Zhejiang', parent: '' } as UTSJSONObject,
  { value: '110100', label: 'Beijing', parent: '110000' } as UTSJSONObject,
  { value: '120100', label: 'Tianjin', parent: '120000' } as UTSJSONObject,
  { value: '330100', label: 'Hangzhou', parent: '330000' } as UTSJSONObject,
  { value: '330200', label: 'Ningbo', parent: '330000' } as UTSJSONObject,
  { value: '110101', label: 'Dongcheng', parent: '110100' } as UTSJSONObject,
  { value: '110105', label: 'Chaoyang', parent: '110100' } as UTSJSONObject,
  { value: '110108', label: 'Haidian', parent: '110100' } as UTSJSONObject,
  { value: '120101', label: 'Heping', parent: '120100' } as UTSJSONObject,
  { value: '330102', label: 'Shangcheng', parent: '330100' } as UTSJSONObject,
  { value: '330106', label: 'Xihu', parent: '330100' } as UTSJSONObject,
  { value: '330203', label: 'Haishu', parent: '330200' } as UTSJSONObject,
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Flat nodes: value + label + parent (root parent = '') |
| value | `string` | `''` | Selected leaf value |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Popup title |
| placeholder | `string` | `'选择选项'` | Placeholder text for unselected steps; the default is Chinese for "Select an option" |
| theme | `string` | `'step'` | Display style: step / tab |
| subTitles | `string[]` | `[]` | Subtitle per level |
| checkStrictly | `boolean` | `false` | Allows picking any level; a confirm button appears in the header |
| closeBtn | `boolean` | `true` | Whether to show the close button |
| optionsHeight | `number` | `280` | Options area height (px) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires with `false` when the popup closes; used by `v-model:visible` |
| change | `value: string, label: string` | Fires when the selection is complete; `value` is the picked node's value and `label` is the path of level names joined with ` / ` |
| pick | `value: string, label: string, level: number` | Fires when an option at any level is tapped; `level` is the index of that level. Disabled options do not fire it |
| close | — | Fires when the popup closes |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getLabel(): string` | Returns the names along the current path, joined with ` / ` |
| `confirm()` | Completes the selection with the current path, same as tapping confirm |
