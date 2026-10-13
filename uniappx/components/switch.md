---
title: Switch 开关
demo: pages/demo/form/switch
---

# Switch 开关

`ms-switch`：开关：纯 view 轨道 + 滑块；支持文字/图标、loading、禁用、三档尺寸；深度演示含组合态（文案+大号、图标+加载、禁用+文案、小号+图标）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-switch`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/switch`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/switch.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-switch v-model="vBase" />
  <ms-switch v-model="vLabel" :label="['开', '关']" />
  <ms-switch v-model="vIcon" active-icon="check-line" void-icon="close-line" />
  <!-- 组件状态 -->
  <ms-switch :model-value="true" loading />
  <ms-switch :model-value="false" disabled />
  <!-- 组件尺寸 -->
  <ms-switch v-model="vSize" size="sm" />
  <ms-switch v-model="vSize" size="md" />
  <ms-switch v-model="vSize" size="lg" />
  <!-- 组件深度 -->
  <ms-switch v-model="vDepthLabel" size="lg" :label="['开', '关']" />
  <ms-switch
    :model-value="true"
    loading
    active-icon="check-line"
    void-icon="close-line"
  />
  <ms-switch :model-value="true" disabled :label="['开', '关']" />
</template>

<script setup lang="uts">
const vBase = ref(false)

const vDepthLabel = ref(true)

const vIcon = ref(true)

const vLabel = ref(true)

const vSize = ref(true)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
