---
title: Svg 矢量
demo: pages/demo/media/svg
---

# Svg 矢量

`ms-svg`：矢量图显示：定尺寸容器 + 官方 `<image>` 渲染 SVG，支持内联源码与着色。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

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
| src | `string` | `''` | 资源地址 |
| source | `string` | `''` | 源码 / 内联内容 |
| size | `number` | `24` | 尺寸 |
| width | `number` | `0` | 宽度（px） |
| height | `number` | `0` | 高度（px） |
| color | `string` | `''` | 颜色 |
| mode | `string` | `'aspectFit'` | 模式 |

## 事件

| 事件 | 说明 |
| --- | --- |
| load | 加载完成 |
| error | 错误 |

## 相关

- 组件目录: `uni_modules/ms-svg/components/ms-svg/`
- 演示: `#/pages/demo/media/svg`
