---
title: Config Provider 主题提供
demo: pages/demo/basic/config-provider
---

# Config Provider 主题提供

`ms-config-provider`：局部主题容器：把 `themeVars` 写成子树内联 CSS 变量，可整段切暗色。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-config-provider`）。
演示路由：`#/pages/demo/basic/config-provider`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/config-provider.uvue`，可在右侧手机框中查看运行效果。

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
const greenVars = ref(vars('#0d9488'))
const orangeVars = ref(vars('#ea580c'))
const pinkVars = ref(vars('#db2777'))
const darkPrimaryVars = ref(vars('#38bdf8'))
const textVars = ref(new UTSJSONObject())
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | 局部 CSS 变量（写到子树） |
| theme | `string` | `'light'` | 主题色 |
| block | `boolean` | `true` | 是否通栏 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-config-provider/`
- 演示: `#/pages/demo/basic/config-provider`
