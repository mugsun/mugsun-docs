---
title: View To Full 全屏
demo: pages/demo/media/view-tofull
---

# View To Full 全屏

`ms-view-tofull`：点击区域展开至全屏，关闭回落原位。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-view-tofull`）。
演示路由：`#/pages/demo/media/view-tofull`。

## 基础用法

```vue
<template>
  <ms-view-tofull>
    …
  </ms-view-tofull>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| duration | `number` | `300` | 时长（ms） |
| showClose | `boolean` | `true` | 是否显示Close |
| opened | `boolean` | `false` | 是否开启 opened |

## 事件

| 事件 | 说明 |
| --- | --- |
| open | 打开 |
| close | 关闭 |
| opened | opened |
| closed | closed |
| update:opened | update:opened |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-view-tofull/`
- 演示: `#/pages/demo/media/view-tofull`
