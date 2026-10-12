---
title: Pull Refresh 刷新
demo: pages/demo/feedback/pull-refresh
---

# Pull Refresh 刷新

`ms-pull-refresh`：包装 `scroll-view` 内置 `refresher-*`，不手搓 touch —— TDesign 那套 `translate3d` 位移在蒸汽下违红线，且 `refresher-max-drag-distance` 在 Web/微信都不支持，手搓等于必须自己写位移。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-pull-refresh`）。
演示路由：`#/pages/demo/feedback/pull-refresh`。

## 基础用法

```vue
<template>
  <ms-pull-refresh v-model="value" :disabled="true">
    …
  </ms-pull-refresh>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 刷新中；业务处理完置 false 收起 |
| disabled | `boolean` | `false` | 禁用下拉 |
| threshold | `number` | `60` | 触发阈值 px，同时作 refresher 槽固定高 |
| height | `number` | `360` | 容器固定高 px（蒸汽禁百分比高） |
| texts | `UTSJSONObject[]` | `[]` | 覆盖四态文案：{ status, text } |
| successDuration | `number` | `500` | 「刷新完成」停留 ms |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| refresh | refresh |
| pulling | pulling |
| restore | restore |
| scrolltolower | scrolltolower |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| refresher | `refresher` 插槽 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-pull-refresh/`
- 演示：`#/pages/demo/feedback/pull-refresh`
