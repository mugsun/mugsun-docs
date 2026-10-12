---
title: Image Viewer 预览
demo: pages/demo/display/image-viewer
---

# Image Viewer 预览

`ms-image-viewer`：全屏大图预览：swiper 翻页 + 可选页码/关闭/删除。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-image-viewer`）。
演示路由：`#/pages/demo/display/image-viewer`。

## 基础用法

```vue
<template>
  <ms-image-viewer v-model:visible="open">
    …
  </ms-image-viewer>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| images | `string[]` | `[]` | 图片地址列表 |
| initialIndex | `number` | `0` | 初始索引 |
| showIndex | `boolean` | `false` | 是否显示Index |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| deleteBtn | `boolean` | `false` | 是否显示删除按钮 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |
| change | 值变化 |
| delete | delete |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-image-viewer/`
- 演示: `#/pages/demo/display/image-viewer`
