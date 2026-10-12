---
title: Icon 图标
demo: pages/demo/basic/icon
---

# Icon 图标

`ms-icon`：Remix 子集图标。`spin`：App/Web 用 `UniElement.animate`（宿主 view）；微信用 **text/image** 上 CSS `animation`（对齐 x-icon `faceSpinIcon`，勿挂宿主 view）。`rotate` 静态角度挂字形。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-icon`）。
演示路由：`#/pages/demo/basic/icon`。

## 基础用法

```vue
<template>
  <ms-icon size="xs" name="…">
    …
  </ms-icon>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| name | `string` | `''` | 名称 / 字段名 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| tone | `\| 'inherit'` | `'inherit'` | tone |
| spin | `boolean` | `false` | 旋转加载：App/Web 用 UniElement.animate；微信小程序用 text CSS animation |
| spinDuration | `number` | `1500` | 一圈时长 ms（默认 1500） |
| rotate | `number` | `0` | 静态旋转角度（与 spin 互斥，spin 优先） |
| pressable | `boolean` | `true` | 是否自带按压态；嵌在 button 内时应为 false，避免双层 hover |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-icon/`
- 演示: `#/pages/demo/basic/icon`
