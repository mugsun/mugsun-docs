---
title: Rate 评分
demo: pages/demo/form/rate
---

# Rate 评分

`ms-rate`：评分。点选置分，支持只读/禁用、半星、清除、右侧描述与分值、点选时短暂上下提示（`placement`）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-rate`）。
演示路由：`#/pages/demo/form/rate`。

## 基础用法

```vue
<template>
  <ms-rate size="sm" v-model="value">
    …
  </ms-rate>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | 绑定值（v-model） |
| count | `number` | `5` | 数量 |
| readonly | `boolean` | `false` | 是否只读 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| activeIcon | `string` | `'star-fill'` | 激活态图标 |
| voidIcon | `string` | `'star-line'` | 未激活图标 |
| halfIcon | `string` | `'star-half-fill'` | 半星图标 |
| showText | `boolean` | `false` | 是否显示Text |
| showScore | `boolean` | `false` | 显示数字分值 |
| allowHalf | `boolean` | `false` | 允许半星 |
| clearable | `boolean` | `false` | 再点当前分值可清零 |
| texts | `string[]` | `[]` | texts 文案/取值 |
| placement | `'top' \| 'bottom' \| ''` | `''` | 点选时短暂展示评分弹层位置。 空串不展示；top / bottom 相对星排。 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-rate/`
- 演示: `#/pages/demo/form/rate`
