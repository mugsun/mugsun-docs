---
title: Config Provider
demo: pages/demo/basic/config-provider
---

# Config Provider

`ms-config-provider` — Config Provider for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-config-provider`).
Demo route: `#/pages/demo/basic/config-provider`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/config-provider.uvue`; see them running in the phone frame.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | Local CSS variables (applied to the subtree) |
| theme | `string` | `'light'` | Theme color |
| block | `boolean` | `true` | Whether full-bleed / block |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-config-provider/`
- Demo: `#/pages/demo/basic/config-provider`
- Chinese docs: [/uniappx/components/config-provider](/uniappx/components/config-provider)
