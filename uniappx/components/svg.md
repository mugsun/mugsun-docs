---
title: Svg 矢量
demo: pages/demo/media/svg
---

# Svg 矢量

`ms-svg`：矢量图显示：定尺寸容器 + 官方 `<image>` 渲染 SVG，支持内联源码与着色。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-svg/components/ms-svg`）。
可选插件：需单独安装 `uni_modules/ms-svg`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/svg`。

## 基础用法

```vue
<template>
  <ms-svg src="…">
    …
  </ms-svg>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 图片路径（`/static/...` 或 http/https） |
| source | `string` | `''` | 内联 SVG 源码，优先于 `src`，内部转 `data:image/svg+xml,` URI |
| size | `number` | `24` | 边长 px |
| width | `number` | `0` | >0 时覆盖宽 |
| height | `number` | `0` | >0 时覆盖高 |
| color | `string` | `''` | 把内联源码里的 `currentColor` 全部替换为该色 |
| mode | `string` | `'aspectFit'` | 只接受 `scaleToFill` / `aspectFit` / `aspectFill`（保矢量三档），其它值回落 `aspectFit` |

## 事件

| 事件 | 说明 |
| --- | --- |
| load | 加载完成 |
| error | 错误 |

## 相关

- 组件目录: `uni_modules/ms-svg/components/ms-svg/`
- 演示: `#/pages/demo/media/svg`
