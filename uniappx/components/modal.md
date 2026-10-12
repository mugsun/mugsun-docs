---
title: Modal 对话框
demo: pages/demo/feedback/modal
---

# Modal 对话框

`ms-modal`：对话框：标题 + 正文居中，底部一或两个按钮，可竖排；`theme="danger"` 给危险操作。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-modal`）。
演示路由：`#/pages/demo/feedback/modal`。

## 基础用法

```vue
<template>
  <ms-modal theme="default" title="…">
    …
  </ms-modal>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| content | `string` | `''` | 正文文案；也可插槽覆盖 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| showCancel | `boolean` | `false` | 是否显示取消按钮 |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | 按钮排布：horizontal / vertical |
| theme | `'default' \| 'danger'` | `'default'` | 主题色 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| closeOnOverlayClick | `boolean` | `false` | 点击遮罩是否关闭 |
| closeOnConfirm | `boolean` | `true` | 点确认后是否关闭 |
| confirmLoading | `boolean` | `false` | 确认按钮是否加载中 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-modal/`
- 演示: `#/pages/demo/feedback/modal`
