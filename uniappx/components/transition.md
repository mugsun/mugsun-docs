---
title: Transition 过渡
demo: pages/demo/basic/transition
---

# Transition 过渡

`ms-transition`：进出场过渡容器，由 `visible` 驱动。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-transition`）。
演示路由：`#/pages/demo/basic/transition`。

## 基础用法

```vue
<template>
  <ms-transition name="fade" v-model:visible="open">
    …
  </ms-transition>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| name | `\| 'fade'` | `'fade'` | 名称 / 字段名 |
| duration | `number` | `300` | 时长（ms） |
| appear | `boolean` | `false` | 是否入场动画 |
| destroyOnHide | `boolean` | `false` | 隐藏时是否销毁 |

## 事件

| 事件 | 说明 |
| --- | --- |
| before-enter | before-enter |
| after-enter | after-enter |
| before-leave | before-leave |
| after-leave | after-leave |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-transition/`
- 演示: `#/pages/demo/basic/transition`
