---
title: Text Cloud 词云
demo: pages/demo/display/text-cloud
---

# Text Cloud 词云

`ms-text-cloud`：词云：按权重定字号，大词优先从中心椭圆螺旋向外紧凑排布，互不重叠，canvas 2d 绘制。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-text-cloud`）。
演示路由：`#/pages/demo/display/text-cloud`。

## 基础用法

```vue
<template>
  <ms-text-cloud>
    …
  </ms-text-cloud>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| height | `number` | `180` | 高度（px） |
| minFontSize | `number` | `12` | 词云最小字号（px） |
| maxFontSize | `number` | `30` | 词云最大字号（px） |
| gap | `number` | `2` | 间距（px） |

## 事件

| 事件 | 说明 |
| --- | --- |
| complete | complete |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-text-cloud/`
- 演示: `#/pages/demo/display/text-cloud`
