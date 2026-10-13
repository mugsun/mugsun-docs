---
title: Cascader
demo: pages/demo/form/cascader
---

# Cascader

`ms-cascader` — Cascader for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cascader`).
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
const stepValue = ref('110105')
const stepVisible = ref(false)
const tabVisible = ref(false)
const looseVisible = ref(false)
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
