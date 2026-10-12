---
title: Barrage 弹幕
demo: pages/demo/media/barrage
---

# Barrage 弹幕

`ms-barrage`：弹幕层，叠在默认 slot 内容上。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-barrage`）。
演示路由：`#/pages/demo/media/barrage`。

## 基础用法

```vue
<template>
  <ms-barrage>
    …
  </ms-barrage>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | — |
| height | `number` | `120` | — |
| speed | `number` | `80` | — |
| rows | `number` | `3` | — |
| paused | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| complete | complete |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-barrage/`
- 演示：`#/pages/demo/media/barrage`
