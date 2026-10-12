---
title: Cascader 级联
demo: pages/demo/form/cascader
---

# Cascader 级联

`ms-cascader`：级联选择：扁平 `options`（value/label/parent）弹层逐级选。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-cascader`）。
演示路由：`#/pages/demo/form/cascader`。

## 基础用法

```vue
<template>
  <ms-cascader theme="…" title="…">
    …
  </ms-cascader>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 扁平节点：value + label + parent（根节点 parent 为空串） |
| value | `string` | `''` | 选中的叶子 value |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| placeholder | `string` | `'选择选项'` | 未选中时的步骤占位文案 |
| theme | `string` | `'step'` | 展示风格：step / tab |
| subTitles | `string[]` | `[]` | 每级次标题 |
| checkStrictly | `boolean` | `false` | 父子不关联：任意一项可选，头部出确定 |
| closeBtn | `boolean` | `true` | 是否显示关闭按钮 |
| optionsHeight | `number` | `280` | 选项区高度 px |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| change | 值变化 |
| pick | 选中项变化（未确认） |
| close | 关闭 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-cascader/`
- 演示: `#/pages/demo/form/cascader`
