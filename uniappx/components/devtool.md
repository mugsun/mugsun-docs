---
title: Devtool 调试
demo: pages/demo/media/devtool
---

# Devtool 调试

`ms-devtool`：页内调试面板：记录列表 + 环境信息 + 清空，折叠/展开两态。记录由宿主喂入。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-devtool`（源码仓暂未公开）。
演示路由：`#/pages/demo/media/devtool`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/devtool.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `'调试面板'` | 标题 |
| host | `string` | `''` | 宿主标识 |
| entries | `UTSJSONObject[]` | `[]` | 条目列表 |
| open | `boolean` | `false` | 是否打开 |
| showEnv | `boolean` | `true` | 是否显示环境元信息 |
| maxHeight | `number` | `220` | 面板最大高度（px） |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:open | update:open |
| clear | 清空 |
| entry-click | entry-click |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-devtool/`
- 演示: `#/pages/demo/media/devtool`
