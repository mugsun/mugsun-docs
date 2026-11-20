---
title: Devtool 调试
demo: pages/demo/media/devtool
---

# Devtool 调试

`ms-devtool` 是页面内的调试面板，包含记录列表、环境信息和清空按钮，可在折叠和展开两种状态间切换。记录由使用它的页面传入。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-devtool
    v-model:open="mainOpen"
    title="请求记录"
    host="https://api.example.com"
    :entries="entries"
    :show-env="false"
    @clear="onClear"
    @entry-click="onEntry"
  />
  <ms-devtool v-model:open="envOpen" title="环境信息" :entries="entries" />
  <!-- 组件样式 -->
  <ms-devtool title="折叠面板" :entries="entries" :open="false" />
  <ms-devtool title="展开面板" :entries="[]" :open="true" :max-height="120" />
  <!-- 组件深度 -->
  <ms-devtool
    title="矮列表"
    host="https://api.example.com"
    :entries="entries"
    :open="true"
    :show-env="false"
    :max-height="80"
  />
  <ms-devtool
    title="域名面板"
    host="https://edge.example.cn"
    :entries="[]"
    :open="true"
    :show-env="false"
    :max-height="100"
  />
  <ms-devtool
    v-model:open="clickOpen"
    title="点击记录"
    :entries="entries"
    :show-env="false"
    :max-height="120"
    @entry-click="onEntry"
  />
</template>

<script setup lang="uts">
const clickOpen = ref(true)

const entries = ref([
  entry('/app/home', '200', '128 ms', 'ok'),
  entry('/app/todos', '200', '96 ms', 'ok'),
  entry('/app/inbox', '401', '42 ms', 'unauthorized'),
] as UTSJSONObject[])

const envOpen = ref(true)

const mainOpen = ref(true)

function onClear(payload: UTSJSONObject) : void {
  console.log('onClear')
}

function onEntry(payload: UTSJSONObject) : void {
  console.log('onEntry')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `'调试面板'` | 标题 |
| host | `string` | `''` | 请求域名，留空不显示 |
| entries | `UTSJSONObject[]` | `[]` | 记录列表，每项支持 api / status / time / result |
| open | `boolean` | `false` | 是否展开，可用 `v-model:open` |
| showEnv | `boolean` | `true` | 是否显示环境信息 |
| maxHeight | `number` | `220` | 记录区的最大高度（px） |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:open | `value: boolean` | 点击标题栏切换展开状态时触发，用于 `v-model:open` |
| clear | `payload: UTSJSONObject` | 点击清空按钮时触发，`payload.count` 是当前记录数；记录需要由页面自行清空 |
| entry-click | `payload: UTSJSONObject` | 点击某条记录时触发，`payload` 含 `index`、`api` 和 `status` |
