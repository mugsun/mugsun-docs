---
title: Cascader
demo: pages/demo/form/cascader
---

# Cascader

`ms-cascader` — Cascader for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-cascader` (repository not yet public).
Demo route: `#/pages/demo/form/cascader`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/cascader.uvue`; see them running in the phone frame.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Flat nodes: value + label + parent (root parent = '') |
| value | `string` | `''` | Selected leaf value |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| placeholder | `string` | `'选择选项'` | Placeholder text for unselected steps |
| theme | `string` | `'step'` | Display style: step / tab |
| subTitles | `string[]` | `[]` | Subtitle per level |
| checkStrictly | `boolean` | `false` | Unlinked parent/child: any node selectable; header shows confirm |
| closeBtn | `boolean` | `true` | Whether to show the close button |
| optionsHeight | `number` | `280` | Options area height (px) |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| change | Value changed |
| pick | Selection changed (before confirm) |
| close | Closed |

## See also

- Component: `uni_modules/ms-ui/components/ms-cascader/`
- Demo: `#/pages/demo/form/cascader`
- Chinese docs: [/uniappx/components/cascader](/uniappx/components/cascader)
