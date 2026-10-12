---
title: Footer 页脚
demo: pages/demo/nav/footer
---

# Footer 页脚

`ms-footer`：页脚：版权 / 链接 / 品牌；默认插槽自定义内容。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-footer`）。
演示路由：`#/pages/demo/nav/footer`。

## 基础用法

```vue
<template>
  <ms-footer text="…">
    …
  </ms-footer>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `''` | 展示文案 |
| links | `UTSJSONObject[]` | `[]` | 底部链接列表（name 等） |
| logoTitle | `string` | `''` | Logo 旁标题 |
| logoIcon | `string` | `''` | Logo 图标名 |
| logoWithInfo | `boolean` | `false` | logo 模式下是否仍显示链接与版权 |

## 事件

| 事件 | 说明 |
| --- | --- |
| link | 点击链接 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-footer/`
- 演示: `#/pages/demo/nav/footer`
