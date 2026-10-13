---
title: Image Resizer 裁剪
demo: pages/demo/display/image-resizer
---

# Image Resizer 裁剪

`ms-image-resizer`：图片裁剪：固定居中裁剪窗 + 图片拖动平移 + 滑条缩放 + 左右/上下翻转 + 重置 + 取消/确认导出。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-image-resizer`）。
演示路由：`#/pages/demo/display/image-resizer`。

## 基础用法

```vue
<template>
  <ms-image-resizer src="…">
    …
  </ms-image-resizer>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 资源地址 |
| cropWidth | `number` | `240` | 裁剪宽度（px） |
| cropHeight | `number` | `240` | 裁剪高度（px） |
| height | `number` | `320` | 高度（px） |
| quality | `number` | `1` | 输出图片质量 0–1 |
| hideFlip | `boolean` | `false` | 是否隐藏翻转 |

## 事件

| 事件 | 说明 |
| --- | --- |
| confirm | 确认 |
| cancel | 取消 |
| error | 错误 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-image-resizer/`
- 演示: `#/pages/demo/display/image-resizer`
