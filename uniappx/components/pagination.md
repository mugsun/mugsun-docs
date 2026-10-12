---
title: Pagination 翻页
demo: pages/demo/nav/pagination
---

# Pagination 翻页

`ms-pagination`：页码：完整窗口 / 简易上一页下一页；`showPrevNext` / `showJumper`；`v-model:value`。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

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
| value | `number` | `1` | 当前页码（从 1 起） |
| total | `number` | `0` | 总条数 |
| pageSize | `number` | `10` | 每页条数 |
| maxButtons | `number` | `3` | 省略号模式下中间最多页码按钮数 |
| minButtons | `number` | `5` | 总页较少时全部展开的页码上限 |
| simple | `boolean` | `false` | 简洁模式（仅上一页/下一页） |
| showTotal | `boolean` | `true` | 是否显示总条数 |
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
