---
title: Pagination 翻页
demo: pages/demo/nav/pagination
---

# Pagination 翻页

`ms-pagination` 是分页组件，默认显示页码按钮，`simple` 模式只显示上一页和下一页。

当前页用 `v-model:value` 绑定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-pagination
    :value="fullPage"
    :total="1000"
    @change="onFullChange"
  />
  <ms-pagination
    :value="simplePage"
    :total="100"
    simple
    @change="onSimpleChange"
  />
  <!-- 组件状态 -->
  <ms-pagination
    :value="3"
    :total="50"
    disabled
  />
  <!-- 组件深度 -->
  <ms-pagination
    :value="navPage"
    :total="200"
    show-prev-next
    @change="onNavChange"
  />
  <ms-pagination
    :value="jumpPage"
    :total="500"
    show-prev-next
    show-jumper
    @change="onJumpChange"
  />
  <ms-pagination
    :value="sizePage"
    :total="240"
    :page-size="20"
    show-prev-next
    @change="onSizeChange"
  />
</template>

<script setup lang="uts">
const fullPage = ref(5)

const jumpPage = ref(8)

const navPage = ref(2)

const simplePage = ref(1)

const sizePage = ref(1)

function onFullChange(page: number) : void {
  console.log('onFullChange')
}

function onSimpleChange(page: number) : void {
  console.log('onSimpleChange')
}

function onNavChange(page: number) : void {
  console.log('onNavChange')
}

function onJumpChange(page: number) : void {
  console.log('onJumpChange')
}

function onSizeChange(page: number) : void {
  console.log('onSizeChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `1` | 当前页码，从 1 开始，可用 `v-model:value` |
| total | `number` | `0` | 总条数 |
| pageSize | `number` | `10` | 每页条数 |
| maxButtons | `number` | `3` | 页数较多时，中间最多显示的页码按钮数 |
| minButtons | `number` | `5` | 总页数不超过这个值时显示全部页码 |
| simple | `boolean` | `false` | 是否使用简洁模式，只显示上一页和下一页 |
| showTotal | `boolean` | `true` | 是否显示总条数 |
| disabled | `boolean` | `false` | 是否禁用 |
| showPrevNext | `boolean` | `false` | 页码两侧是否显示上一页和下一页按钮 |
| showJumper | `boolean` | `false` | 是否显示跳转到指定页的输入框 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `page: number` | 页码变化时触发，`page` 是新的页码 |
| update:value | `page: number` | 页码变化时触发，用于 `v-model:value` |
