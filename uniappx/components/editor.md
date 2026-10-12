---
title: Editor 编辑
demo: pages/demo/media/editor
---

# Editor 编辑

`ms-editor`：Markdown 源码编辑器：工具条插入标记 + `textarea` 源码 + `ms-markdown` 实时预览。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-editor/components/ms-editor`）。
可选插件：需单独安装 `uni_modules/ms-editor`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/editor`。

## 基础用法

```vue
<template>
  <ms-editor v-model="value">
    …
  </ms-editor>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| height | `number` | `220` | 高度（px） |
| placeholder | `string` | `'输入 Markdown…'` | 占位文案 |
| readOnly | `boolean` | `false` | 是否只读 |
| showPreview | `boolean` | `true` | 是否显示预览 |
| toolbar | `string[]` | `['bold', 'italic', 'strike', 'code', 'h2', 'quote', 'list', 'link']` | 工具条配置 |
| maxlength | `number` | `20000` | 源码最大长度；-1 不限制（仍受平台 textarea 上限约束） |
| showCount | `boolean` | `false` | 是否显示字数统计 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| command | 工具条命令 |
| change | 值变化 |
| clear | 清空 |

## 相关

- 组件目录: `uni_modules/ms-editor/components/ms-editor/`
- 演示: `#/pages/demo/media/editor`
