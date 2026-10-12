---
title: Search 搜索
demo: pages/demo/form/search
---

# Search 搜索

`ms-search`：搜索栏：shape / action / leftIcon；expose focus/blur/clear。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-search`）。
演示路由：`#/pages/demo/form/search`。

## 基础用法

```vue
<template>
  <ms-search v-model="value">
    …
  </ms-search>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| placeholder | `string` | `''` | 占位文案 |
| shape | `'square' \| 'round'` | `'square'` | 外形 |
| action | `string` | `''` | 操作 |
| center | `boolean` | `false` | 是否垂直居中 |
| clearable | `boolean` | `true` | 是否可清空 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度；-1 不限 |
| leftIcon | `string` | `'search'` | 左侧图标 |
| confirmType | `'return' \| 'search' \| 'send' \| 'next' \| 'go' \| 'done'` | `'search'` | 键盘确认类型 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | 输入 |
| focus | 聚焦 |
| blur | 失焦 |
| clear | 清空 |
| confirm | 确认 |
| action | 操作按钮 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| action | `action` 插槽 |
| left | `left` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-search/`
- 演示: `#/pages/demo/form/search`
