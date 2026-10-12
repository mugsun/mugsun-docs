---
title: Switch 开关
demo: pages/demo/form/switch
---

# Switch 开关

`ms-switch`：开关：纯 view 轨道 + 滑块；支持文字/图标、loading、禁用、三档尺寸；深度演示含组合态（文案+大号、图标+加载、禁用+文案、小号+图标）。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-switch`）。
演示路由：`#/pages/demo/form/switch`。

## 基础用法

```vue
<template>
  <ms-switch size="sm" label="…">
    …
  </ms-switch>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 绑定值（v-model） |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸：sm / md / lg |
| label | `string[]` | `[]` | 开关两侧文案 [关, 开]；空则不显示 |
| activeIcon | `string` | `''` | 开启态图标 |
| voidIcon | `string` | `''` | 关闭态图标 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-switch/`
- 演示: `#/pages/demo/form/switch`
