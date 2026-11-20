---
title: Input Tag 标签输入
demo: pages/demo/form/input-tag
---

# Input Tag 标签输入

`ms-input-tag` 是标签输入框，按回车或点击按钮添加标签，点击标签上的关闭图标删除标签。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-input-tag
    v-model="outsideTags"
    placeholder="输入后回车添加"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="insideTags"
    position="inside"
    placeholder="继续输入"
    @add="onAdd"
    @remove="onRemove"
  />
  <!-- 组件样式 -->
  <ms-input-tag
    v-model="limitTags"
    :max-count="3"
    placeholder="最多 3 个"
    @add="onAdd"
    @exceed="onExceed"
  />
  <ms-input-tag
    v-model="disabledTags"
    disabled
    placeholder="已禁用"
  />
  <!-- 组件深度 -->
  <ms-input-tag
    v-model="buttonTags"
    button-text="加入"
    placeholder="输入后点加入"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="noBtnTags"
    :show-button="false"
    placeholder="仅回车添加"
    @add="onAdd"
    @remove="onRemove"
  />
  <ms-input-tag
    v-model="confirmTags"
    confirm-type="go"
    placeholder="键盘确认键为 go"
    @add="onAdd"
    @remove="onRemove"
  />
</template>

<script setup lang="uts">
const buttonTags = ref(['标签'] as string[])

const confirmTags = ref([] as string[])

const disabledTags = ref(['只读标签'] as string[])

const insideTags = ref(['前端', '后端', '测试'] as string[])

const limitTags = ref(['已选一'] as string[])

const noBtnTags = ref([] as string[])

const outsideTags = ref(['产品', '设计'] as string[])

function onAdd(tag: string) : void {
  console.log('onAdd')
}

function onRemove(tag: string, index: number) : void {
  console.log('onRemove')
}

function onExceed(max: number) : void {
  console.log('onExceed')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | 绑定值（v-model） |
| placeholder | `string` | `'输入后回车添加'` | 占位文案 |
| position | `string` | `'outside'` | 标签位置：`outside` 显示在输入框外，`inside` 显示在输入框内 |
| showButton | `boolean` | `true` | 是否显示添加按钮，`position` 为 `inside` 时不显示 |
| buttonText | `string` | `'添加'` | 按钮文案 |
| maxCount | `number` | `-1` | 最多标签数，`-1` 表示不限制 |
| disabled | `boolean` | `false` | 是否禁用 |
| confirmType | `string` | `'done'` | 键盘确认键类型 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string[]` | 标签列表变化时触发，用于 `v-model` |
| change | `value: string[]` | 标签列表变化时触发，`value` 是全部标签 |
| add | `tag: string` | 添加标签后触发；内容为空或与已有标签重复时不添加 |
| remove | `tag: string, index: number` | 删除标签后触发，参数是被删的标签和它原来的下标 |
| exceed | `max: number` | 标签数达到 `maxCount` 后再添加时触发，`max` 是上限；组件不弹提示，需要自行处理 |
