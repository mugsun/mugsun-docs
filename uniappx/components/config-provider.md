---
title: Config Provider 主题配置
demo: pages/demo/basic/config-provider
---

# Config Provider 主题配置

`ms-config-provider` 是局部主题容器，只影响它包住的内容。可以用 `themeVars` 覆盖其中的 CSS 变量，或把这一块切换为暗色。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-config-provider :theme-vars="greenVars" @change="onChange">
    <ms-button theme="primary" block>容器内按钮</ms-button>
  </ms-config-provider>
  <ms-config-provider theme="dark">
    <view>
      <text>暗色区块内文字</text>
      <ms-button theme="primary" block>暗色按钮</ms-button>
    </view>
  </ms-config-provider>
  <!-- 组件样式 -->
  <ms-config-provider :theme-vars="orangeVars">
    <ms-button theme="primary" block>橙色主色</ms-button>
  </ms-config-provider>
  <ms-config-provider :theme-vars="textVars">
    <ms-cell title="标题文字" note="说明文字" />
  </ms-config-provider>
  <!-- 组件深度 -->
  <ms-config-provider :theme-vars="pinkVars" :block="false">
    <ms-button theme="primary" size="sm">行内按钮</ms-button>
  </ms-config-provider>
  <ms-config-provider theme="dark" :theme-vars="darkPrimaryVars">
    <view>
      <text>暗色 + 自定义主色</text>
      <ms-button theme="primary" block>暗色换色按钮</ms-button>
    </view>
  </ms-config-provider>
  <ms-config-provider :theme-vars="greenVars">
    <ms-button theme="primary" block>外层主色</ms-button>
    <view>
      <ms-config-provider :theme-vars="orangeVars">
        <ms-button theme="primary" block>内层覆盖</ms-button>
      </ms-config-provider>
    </view>
  </ms-config-provider>
</template>

<script setup lang="uts">
const darkPrimaryVars = ref(vars('#38bdf8'))

const greenVars = ref(vars('#0d9488'))

const orangeVars = ref(vars('#ea580c'))

const pinkVars = ref(vars('#db2777'))

const textVars = ref(new UTSJSONObject())

function onChange(payload: UTSJSONObject) : void {
  console.log('onChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | 要覆盖的 CSS 变量；键以 `--` 开头时原样使用，否则自动加上 `--ms-` 前缀 |
| theme | `string` | `'light'` | 主题：light / dark |
| block | `boolean` | `true` | 是否撑满宽度 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `payload: UTSJSONObject` | 挂载时和主题或变量变化后触发，`payload` 含 `count`（生效的变量数）和 `theme` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 主题生效的内容 |
