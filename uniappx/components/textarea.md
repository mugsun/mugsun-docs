---
title: Textarea 多行输入
demo: pages/demo/form/textarea
---

# Textarea 多行输入

`ms-textarea` 是多行输入框，支持标签、自动高度（autosize）、字数统计、状态和确认按钮类型。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-textarea`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/form/textarea`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/textarea.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-textarea v-model="baseValue" placeholder="请输入文字" />
  <ms-textarea v-model="labelValue" label="标签文字" placeholder="请输入文字" />
  <ms-textarea
    v-model="autoValue"
    label="自动增高"
    placeholder="输入多行后高度跟随"
    auto-height
  />
  <!-- 组件状态 -->
  <ms-textarea
    model-value="不可编辑文字"
    label="禁用"
    placeholder="请输入文字"
    disabled
  />
  <!-- 组件样式 -->
  <ms-textarea
    v-model="borderValue"
    label="描边"
    placeholder="请输入文字"
    :maxlength="100"
    indicator
    bordered
  />
  <ms-textarea
    v-model="plainValue"
    label="无边框"
    placeholder="嵌入列表时去掉描边"
    :bordered="false"
    height="sm"
  />
</template>

<script setup lang="uts">
const autoValue = ref('')

const baseValue = ref('')

const borderValue = ref('')

const labelValue = ref('')

const plainValue = ref('')
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| label | `string` | `''` | 标签文案 |
| placeholder | `string` | `''` | 占位文案 |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | 状态：default / success / warning / error |
| tips | `string` | `''` | 提示文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度；-1 不限 |
| indicator | `boolean` | `false` | 是否显示字数统计 |
| autoHeight | `boolean` | `false` | 是否随内容增高 |
| maxHeight | `number` | `0` | autoHeight 时最大高度 px；0 不限制（对标 peer autosize.maxHeight） |
| height | `'sm' \| 'md' \| 'lg'` | `'md'` | 固定高度（px）；autoHeight 时作最小高度 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 文本对齐 |
| bordered | `boolean` | `true` | 是否显示边框 |
| confirmType | `'return' \| 'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'return'` | 键盘确认键类型 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | 输入 |
| focus | 聚焦 |
| blur | 失焦 |
| confirm | 确认 |
| linechange | linechange |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | `label` 插槽 |
| tips | `tips` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-textarea/`
- 演示: `#/pages/demo/form/textarea`
