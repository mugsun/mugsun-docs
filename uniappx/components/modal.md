---
title: Modal 对话框
demo: pages/demo/feedback/modal
---

# Modal 对话框

`ms-modal`：对话框：标题 + 正文居中，底部一或两个按钮，可竖排；`theme="danger"` 给危险操作。

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

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| title | `string` | `''` | — |
| content | `string` | `''` | — |
| confirmText | `string` | `'确定'` | — |
| cancelText | `string` | `'取消'` | — |
| showCancel | `boolean` | `false` | — |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | — |
| theme | `'default' \| 'danger'` | `'default'` | — |
| closeBtn | `boolean` | `false` | — |
| closeOnOverlayClick | `boolean` | `false` | — |
| closeOnConfirm | `boolean` | `true` | — |
| confirmLoading | `boolean` | `false` | — |
| zIndex | `number` | `1000` | — |

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

- 组件目录：`uni_modules/ms-ui/components/ms-modal/`
- 演示：`#/pages/demo/feedback/modal`
