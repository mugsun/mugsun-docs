---
title: Devtool
demo: pages/demo/media/devtool
---

# Devtool

`ms-devtool` is an in-page debug panel with a log list, environment info and a clear button, and it can be collapsed or expanded. Log entries are supplied by the page that uses it.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-devtool`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/media/devtool`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/devtool.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `'调试面板'` | Title |
| host | `string` | `''` | Host id |
| entries | `UTSJSONObject[]` | `[]` | Entries |
| open | `boolean` | `false` | Whether open |
| showEnv | `boolean` | `true` | Whether to show environment meta |
| maxHeight | `number` | `220` | Panel max height (px) |

## Events

| Event | Description |
| --- | --- |
| update:open | update:open |
| clear | Clear |
| entry-click | entry-click |

## See also

- Component: `uni_modules/ms-ui/components/ms-devtool/`
- Demo: `#/pages/demo/media/devtool`
- Chinese docs: [/uniappx/components/devtool](/uniappx/components/devtool)
