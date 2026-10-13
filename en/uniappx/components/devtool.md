---
title: Devtool
demo: pages/demo/media/devtool
---

# Devtool

`ms-devtool` — Devtool for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-devtool` (repository not yet public).
Demo route: `#/pages/demo/media/devtool`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/devtool.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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
