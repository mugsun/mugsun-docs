---
title: Steps 步骤
demo: pages/demo/nav/steps
---

# Steps 步骤

`ms-steps`：步骤条。`items` 驱动（`title` / `content` / `icon` / `status`），单组件无子组件注册。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-steps`）。
演示路由：`#/pages/demo/nav/steps`。

## 基础用法

```vue
<template>
  <ms-steps theme="…">
    …
  </ms-steps>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 title / content / icon / status |
| current | `number` | `0` | 当前步骤下标；等于步骤数表示全部完成 |
| currentStatus | `string` | `'process'` | current 指向步骤的状态：process / error / finish / default |
| layout | `string` | `'horizontal'` | 方向：horizontal / vertical |
| theme | `string` | `'default'` | 风格：default 序号圈 / dot 简略圆点 |
| readonly | `boolean` | `false` | 只读：不抛 change |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-steps/`
- 演示: `#/pages/demo/nav/steps`
