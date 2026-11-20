---
title: Devtool
demo: pages/demo/media/devtool
---

# Devtool

`ms-devtool` is an in-page debug panel with a log list, environment info and a clear button, and it can be collapsed or expanded. Log entries are supplied by the page that uses it.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-devtool
    v-model:open="mainOpen"
    title="Request log"
    host="https://api.example.com"
    :entries="entries"
    :show-env="false"
    @clear="onClear"
    @entry-click="onEntry"
  />
  <ms-devtool v-model:open="envOpen" title="Environment" :entries="entries" />
  <!-- Styles -->
  <ms-devtool title="Collapsed panel" :entries="entries" :open="false" />
  <ms-devtool title="Expanded panel" :entries="[]" :open="true" :max-height="120" />
  <!-- Advanced -->
  <ms-devtool
    title="Short list"
    host="https://api.example.com"
    :entries="entries"
    :open="true"
    :show-env="false"
    :max-height="80"
  />
  <ms-devtool
    title="Domain panel"
    host="https://edge.example.cn"
    :entries="[]"
    :open="true"
    :show-env="false"
    :max-height="100"
  />
  <ms-devtool
    v-model:open="clickOpen"
    title="Click log"
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `'调试面板'` | Title; the default is Chinese for "Debug panel" |
| host | `string` | `''` | Request host; hidden when empty |
| entries | `UTSJSONObject[]` | `[]` | Log entries; each item supports api / status / time / result |
| open | `boolean` | `false` | Whether expanded; works with `v-model:open` |
| showEnv | `boolean` | `true` | Whether to show environment info |
| maxHeight | `number` | `220` | Maximum height of the log area (px) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:open | `value: boolean` | Fires when the title bar is tapped to toggle the panel; used by `v-model:open` |
| clear | `payload: UTSJSONObject` | Fires when the clear button is tapped; `payload.count` is the current number of entries. The page clears the entries itself |
| entry-click | `payload: UTSJSONObject` | Fires when an entry is tapped; `payload` has `index`, `api` and `status` |
