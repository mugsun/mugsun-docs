---
title: Upload 上传
demo: pages/demo/feedback/upload
---

# Upload 上传

`ms-upload`：图片宫格上传。规格卡 `reference/specs/p1-ms-upload.md`，审计规格 `reference/specs/component-audits/p1-ms-upload.json`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-upload`）。
演示路由：`#/pages/demo/feedback/upload`。

## 基础用法

```vue
<template>
  <ms-upload>
    …
  </ms-upload>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| fileList | `UTSJSONObject[]` | `[]` | 受控文件列表，唯一渲染真源；项字段 url / name / status / percent |
| max | `number` | `9` | 数量上限，0 不限 |
| column | `number` | `4` | 每行列数 |
| source | `string` | `'both'` | album / camera / both |
| showName | `boolean` | `false` | 磁贴下显示文件名 |
| addable | `boolean` | `true` | 显示添加磁贴 |
| removable | `boolean` | `true` | 显示删除按钮 |
| disabled | `boolean` | `false` | 是否禁用 |
| preview | `boolean` | `true` | 点击磁贴是否调用原生预览 |
| sizeLimit | `number` | `0` | 单文件大小上限（字节），0 不限；超限 emit oversize 且不入列 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:fileList | v-model:fileList 更新 |
| add | 新增 |
| remove | 移除 |
| click | 点击 |
| oversize | 超出大小限制 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-upload/`
- 演示: `#/pages/demo/feedback/upload`
