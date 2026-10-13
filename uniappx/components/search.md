---
title: Search 搜索
demo: pages/demo/form/search
---

# Search 搜索

`ms-search`：搜索栏：shape / action / leftIcon；expose focus/blur/clear。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-search`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/search`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/search.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-search v-model="baseValue" placeholder="搜索预设文案" />
  <ms-search
    v-model="limitValue"
    placeholder="最多输入 10 个字符"
    :maxlength="10"
  />
  <ms-search
    v-model="actionValue"
    placeholder="输入后点右侧搜索"
    action="搜索"
    @action="onSearchAction"
  />
  <!-- 组件样式 -->
  <ms-search v-model="squareValue" placeholder="方形搜索框" shape="square" />
  <ms-search v-model="roundValue" placeholder="圆形搜索框" shape="round" />
  <!-- 组件状态 -->
  <ms-search v-model="centerValue" placeholder="居中占位" shape="round" center />
  <ms-search model-value="" placeholder="禁用状态" disabled />
  <!-- 组件深度 -->
  <ms-search model-value="只读关键字" readonly shape="round" />
  <ms-search v-model="noClearValue" placeholder="无清空按钮" :clearable="false" />
  <ms-search v-model="filterValue" placeholder="筛选关键字" left-icon="filter" />
</template>

<script setup lang="uts">
const actionValue = ref('关键词')

const baseValue = ref('')

const centerValue = ref('')

const filterValue = ref('')

const limitValue = ref('')

const noClearValue = ref('保留')

const roundValue = ref('')

const squareValue = ref('')

function onSearchAction() : void {
  console.log('onSearchAction')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| placeholder | `string` | `''` | 占位文案 |
| shape | `'square' \| 'round'` | `'square'` | 外形：square / round |
| action | `string` | `''` | 右侧操作文案；空则不显示 |
| center | `boolean` | `false` | 未聚焦时内容是否居中展示 |
| clearable | `boolean` | `true` | 是否可清空 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度；-1 不限 |
| leftIcon | `string` | `'search'` | 左侧图标名 |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | 键盘确认键类型 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | 输入 |
| focus | 聚焦 |
| blur | 失焦 |
| clear | 清空 |
| confirm | 确认 |
| action | 操作按钮 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| action | `action` 插槽 |
| left | `left` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-search/`
- 演示: `#/pages/demo/form/search`
