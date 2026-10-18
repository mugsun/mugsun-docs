---
title: Pagination 翻页
demo: pages/demo/nav/pagination
---

# Pagination 翻页

`ms-pagination` 是分页组件，支持完整页码和仅显示上一页、下一页的简易模式，可通过 `showPrevNext` 和 `showJumper` 控制按钮，当前页用 `v-model:value` 绑定。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-pagination`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/nav/pagination`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/pagination.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `1` | 当前页码（从 1 起） |
| total | `number` | `0` | 总条数 |
| pageSize | `number` | `10` | 每页条数 |
| maxButtons | `number` | `3` | 省略号模式下中间最多页码按钮数 |
| minButtons | `number` | `5` | 总页较少时全部展开的页码上限 |
| simple | `boolean` | `false` | 简洁模式（仅上一页/下一页） |
| showTotal | `boolean` | `true` | 是否显示总条数 |
| disabled | `boolean` | `false` | 是否禁用 |
| showPrevNext | `boolean` | `false` | 完整模式两侧上一页/下一页 |
| showJumper | `boolean` | `false` | 跳转到指定页 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-pagination/`
- 演示: `#/pages/demo/nav/pagination`
