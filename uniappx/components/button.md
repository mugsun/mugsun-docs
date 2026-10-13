---
title: Button 按钮
demo: pages/demo/basic/button
---

# Button 按钮

`ms-button`：语义化按钮。`theme` + `variant` + `size` + `block` + `disabled` + `loading` + `loadingText` + `formType` + `ghost` + `icon` / `iconOnly` + `shape` + `haptic`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-button`（商业版，源码不公开）。
演示路由：`#/pages/demo/basic/button`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/button.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
| haptic | `boolean` | `true` | App/小程序点击短震动；Web 无能力自动跳过 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-button/`
- 演示: `#/pages/demo/basic/button`
