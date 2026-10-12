---
title: Sign Board 签名
demo: pages/demo/form/sign-board
---

# Sign Board 签名

`ms-sign-board`：手写签名板：`canvas` 2d + 触摸（Web 另补鼠标）。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-sign-board`）。
演示路由：`#/pages/demo/form/sign-board`。

## 基础用法

```vue
<template>
  <ms-sign-board>
    …
  </ms-sign-board>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| penType | `string` | `'default'` | default / pen / pencil |
| strokeWidth | `number` | `8` | 基准笔宽 px |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| end | end |
| clear | 清空 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sign-board/`
- 演示: `#/pages/demo/form/sign-board`
