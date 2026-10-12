---
title: Input Tag 标签输入
demo: pages/demo/form/input-tag
---

# Input Tag 标签输入

`ms-input-tag`：标签输入：回车或按钮添加，点标签上的关闭图标删除。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-input-tag`）。
演示路由：`#/pages/demo/form/input-tag`。

## 基础用法

```vue
<template>
  <ms-input-tag v-model="value">
    …
  </ms-input-tag>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | 绑定值（v-model） |
| placeholder | `string` | `'输入后回车添加'` | 占位文案 |
| position | `string` | `'outside'` | 位置 |
| showButton | `boolean` | `true` | 是否显示Button |
| buttonText | `string` | `'添加'` | 按钮文案 |
| maxCount | `number` | `-1` | 最大数量 |
| disabled | `boolean` | `false` | 是否禁用 |
| confirmType | `string` | `'done'` | 键盘确认类型 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| add | 新增 |
| remove | 移除 |
| exceed | exceed |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-input-tag/`
- 演示: `#/pages/demo/form/input-tag`
