---
title: Input Tag 标签输入
demo: pages/demo/form/input-tag
---

# Input Tag 标签输入

`ms-input-tag` 是标签输入框，按回车或点击按钮添加标签，点击标签上的关闭图标删除标签。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-input-tag`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/form/input-tag`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/input-tag.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | 绑定值（v-model） |
| placeholder | `string` | `'输入后回车添加'` | 占位文案 |
| position | `string` | `'outside'` | 位置 |
| showButton | `boolean` | `true` | 是否显示添加按钮 |
| buttonText | `string` | `'添加'` | 按钮文案 |
| maxCount | `number` | `-1` | 最大数量 |
| disabled | `boolean` | `false` | 是否禁用 |
| confirmType | `string` | `'done'` | 键盘确认键类型 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| add | 新增 |
| remove | 移除 |
| exceed | exceed |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-input-tag/`
- 演示: `#/pages/demo/form/input-tag`
