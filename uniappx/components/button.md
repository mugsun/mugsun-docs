---
title: Button 按钮
demo: pages/demo/basic/button
---

# Button 按钮

`ms-button`：语义化按钮。支持主题色、变体、尺寸、形状、块级、幽灵、禁用、加载、图标与表单提交覆盖层。

源码与演示工程见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（演示页 `pages/demo/basic/button`）。

## 基础用法

```vue
<template>
  <ms-button>主要按钮</ms-button>
  <ms-button theme="default" variant="outline">描边</ms-button>
  <ms-button theme="danger">危险</ms-button>
  <ms-button :loading="true">提交中</ms-button>
  <ms-button block>通栏</ms-button>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'light'` | `'primary'` | 主题色 |
| variant | `'solid' \| 'outline' \| 'dashed' \| 'text'` | `'solid'` | 填充 / 描边 / 虚线 / 文字 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| shape | `'rectangle' \| 'square' \| 'round' \| 'circle'` | `'rectangle'` | 外形 |
| block | `boolean` | `false` | 通栏 |
| ghost | `boolean` | `false` | 幽灵（透明底） |
| disabled | `boolean` | `false` | 禁用 |
| loading | `boolean` | `false` | 加载中（同时不可点） |
| loadingText | `string` | `'加载中…'` | 加载文案；空串则只转圈 |
| icon | `string` | `''` | Remix 线型图标名（经 `ms-icon`） |
| iconOnly | `boolean` | `false` | 纯图标按钮 |
| formType | `'' \| 'submit' \| 'reset'` | `''` | 表单类型；非空时叠透明原生 button |
| haptic | `boolean` | `true` | App/小程序短震动；Web 自动跳过 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击（禁用/加载中不触发） |

## 说明

- 视觉层用 `view`；`formType=submit|reset` 时叠加透明原生 `<button>` 触发 form，**不要**把文案放进原生 button 子树。
- 验收默认 Web + Android；本站预览只依赖 Web H5。

## 相关

- 组件规格：仓内 `reference/specs/p0-ms-button.md`
- 演示路由：`#/pages/demo/basic/button`
