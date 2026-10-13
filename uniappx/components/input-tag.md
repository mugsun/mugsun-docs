---
title: Input Tag 标签输入
demo: pages/demo/form/input-tag
---

# Input Tag 标签输入

`ms-input-tag`：标签输入：回车或按钮添加，点标签上的关闭图标删除。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-input-tag`）。
演示路由：`#/pages/demo/form/input-tag`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/input-tag.uvue`，可在右侧手机框中查看运行效果。

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
const outsideTags = ref(['产品', '设计'] as string[])
const insideTags = ref(['前端', '后端', '测试'] as string[])
const limitTags = ref(['已选一'] as string[])
const disabledTags = ref(['只读标签'] as string[])
const buttonTags = ref(['标签'] as string[])
const noBtnTags = ref([] as string[])
const confirmTags = ref([] as string[])
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

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
