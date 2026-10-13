---
title: Cascader 级联
demo: pages/demo/form/cascader
---

# Cascader 级联

`ms-cascader`：级联选择：扁平 `options`（value/label/parent）弹层逐级选。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-cascader`（源码仓暂未公开）。
演示路由：`#/pages/demo/form/cascader`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/cascader.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 扁平节点：value + label + parent（根节点 parent 为空串） |
| value | `string` | `''` | 选中的叶子 value |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| placeholder | `string` | `'选择选项'` | 未选中时的步骤占位文案 |
| theme | `string` | `'step'` | 展示风格：step / tab |
| subTitles | `string[]` | `[]` | 每级次标题 |
| checkStrictly | `boolean` | `false` | 父子不关联：任意一项可选，头部出确定 |
| closeBtn | `boolean` | `true` | 是否显示关闭按钮 |
| optionsHeight | `number` | `280` | 选项区高度 px |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| change | 值变化 |
| pick | 选中项变化（未确认） |
| close | 关闭 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-cascader/`
- 演示: `#/pages/demo/form/cascader`
