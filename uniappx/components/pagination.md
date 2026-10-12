---
title: Pagination 翻页
demo: pages/demo/nav/pagination
---

# Pagination 翻页

`ms-pagination`：页码：完整窗口 / 简易上一页下一页；`showPrevNext` / `showJumper`；`v-model:value`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-pagination`）。
演示路由：`#/pages/demo/nav/pagination`。

## 基础用法

```vue
<template>
  <ms-pagination>
    …
  </ms-pagination>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `1` | 当前值 |
| total | `number` | `0` | 总条数 |
| pageSize | `number` | `10` | 每页条数 |
| maxButtons | `number` | `3` | maxButtons 数值 |
| minButtons | `number` | `5` | minButtons 数值 |
| simple | `boolean` | `false` | 是否开启 simple |
| showTotal | `boolean` | `true` | 是否显示Total |
| disabled | `boolean` | `false` | 是否禁用 |
| showPrevNext | `boolean` | `false` | 完整模式两侧上一页/下一页 |
| showJumper | `boolean` | `false` | 跳转到指定页 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-pagination/`
- 演示: `#/pages/demo/nav/pagination`
