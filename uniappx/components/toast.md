---
title: Toast 轻提示
demo: pages/demo/feedback/toast
---

# Toast 轻提示

`ms-toast`：轻提示：文本 / 图标 / 加载；顶中底；遮罩可选。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-toast`）。
演示路由：`#/pages/demo/feedback/toast`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/toast.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-toast
    :visible="showPlain"
    message="操作成功"
    @update:visible="onPlainVisible"
  />
  <ms-toast
    :visible="showMultiLine"
    message="这是一条比较长的提示文案，会折行显示，最多两三行"
    @update:visible="onMultiVisible"
  />
  <ms-toast
    :visible="showRowIcon"
    message="横向图标"
    icon="star-line"
    @update:visible="onRowVisible"
  />
</template>

<script setup lang="uts">
const showPlain = ref(false)
const showMultiLine = ref(false)
const showRowIcon = ref(false)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| message | `string` | `''` | 消息文案 |
| theme | `'default' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'default'` | 主题色 |
| icon | `string` | `''` | 自定义图标名（icons.uts 注册名）；theme 自带图标时可省 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| placement | `'top' \| 'middle' \| 'bottom'` | `'middle'` | 弹出/摆放位置 |
| duration | `number` | `2000` | 毫秒；0 表示不自动关闭 |
| showOverlay | `boolean` | `false` | 显示遮罩挡住点击穿透 |
| zIndex | `number` | `1100` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-toast/`
- 演示: `#/pages/demo/feedback/toast`
