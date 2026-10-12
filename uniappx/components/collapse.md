---
title: Collapse 折叠
demo: pages/demo/display/collapse
---

# Collapse 折叠

`ms-collapse`：折叠面板：`items` 驱动；`accordion` / `theme` / `expandIcon` / `defaultExpandAll`；受控 `value`。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-collapse`）。
演示路由：`#/pages/demo/display/collapse`。

## 基础用法

```vue
<template>
  <ms-collapse theme="…">
    …
  </ms-collapse>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / content / note / icon / disabled |
| value | `number[]` | `[]` | 展开的项下标集合（受控） |
| accordion | `boolean` | `false` | 手风琴：每次只展开一个 |
| theme | `string` | `'default'` | 风格：default 通栏 / card 卡片 |
| expandIcon | `boolean` | `true` | 是否显示展开箭头 |
| disabled | `boolean` | `false` | 整体禁用（项上 disabled 优先） |
| defaultExpandAll | `boolean` | `false` | 首次是否全部展开（未传 value 时生效） |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-collapse/`
- 演示: `#/pages/demo/display/collapse`
