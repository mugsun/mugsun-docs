---
title: Button 按钮
demo: pages/demo/basic/button
---

# Button 按钮

`ms-button` 是按钮组件，提供多种主题色、样式和尺寸，支持加载状态、图标和原生表单提交。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 形态 -->
  <ms-button block theme="primary">填充</ms-button>
  <ms-button block variant="outline" theme="primary">描边</ms-button>
  <ms-button block variant="dashed" theme="primary">虚框</ms-button>
  <!-- 主题 -->
  <ms-button block theme="default" @click="onThemeClick('default')">默认</ms-button>
  <ms-button block theme="primary" @click="onThemeClick('primary')">主色</ms-button>
  <ms-button block theme="danger" @click="onThemeClick('danger')">危险</ms-button>
  <!-- 尺寸 -->
  <ms-button theme="primary" size="lg">大号</ms-button>
  <ms-button theme="primary" size="md">中号</ms-button>
  <ms-button theme="primary" size="sm">小号</ms-button>
  <!-- 状态 -->
  <ms-button block disabled theme="primary">禁用填充</ms-button>
  <ms-button block disabled variant="dashed" theme="primary">禁用虚框</ms-button>
  <ms-button block disabled theme="light">禁用浅色</ms-button>
</template>

<script setup lang="uts">
function onThemeClick(name: string) : void {
  console.log('onThemeClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | 主题色：default / primary / danger / success / warning / light |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | 样式：solid / outline / dashed / text |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸：xs / sm / md / lg |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | 外形：rectangle / square / round / circle |
| block | `boolean` | `false` | 是否通栏宽度 |
| ghost | `boolean` | `false` | 幽灵按钮（透明底描边） |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| loadingText | `string` | `'加载中…'` | 加载态文案；空串则只显示转圈 |
| icon | `string` | `''` | 左侧图标名；与文案并存 |
| iconOnly | `boolean` | `false` | 仅图标（正方形触控区） |
| formType | `'' \| 'submit' \| 'reset'` | `''` | 原生表单类型：submit / reset；空为普通按钮 |
| haptic | `boolean` | `true` | 点击时短震动，在 App 和小程序上生效 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | `e: UniPointerEvent` | 点击按钮时触发，禁用时不触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 按钮文字 |
