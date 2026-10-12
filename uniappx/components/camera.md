---
title: Camera 相机
demo: pages/demo/media/camera
---

# Camera 相机

`ms-camera`：官方 `<camera>` 的受控封装：定高取景框 + 拍照/翻转工具条，不支持的平台落占位块。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-camera/components/ms-camera`）。
可选插件：需单独安装 `uni_modules/ms-camera`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/camera`。

## 基础用法

```vue
<template>
  <ms-camera>
    …
  </ms-camera>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| devicePosition | `string` | `'back'` | `back` / `front`，越界回落 `back` |
| flash | `string` | `'auto'` | `auto` / `on` / `off` / `torch` |
| resolution | `string` | `'medium'` | `low` / `medium` / `high` |
| height | `number` | `220` | 取景框高度 px |
| showToolbar | `boolean` | `true` | 显示拍照 / 翻转工具条 |
| tip | `string` | `''` | 取景框下方提示文案 |

## 事件

| 事件 | 说明 |
| --- | --- |
| photo | 拍照完成 |
| error | 错误 |
| stop | 停止 |
| position-change | 朝向变化 |

## 相关

- 组件目录: `uni_modules/ms-camera/components/ms-camera/`
- 演示: `#/pages/demo/media/camera`
