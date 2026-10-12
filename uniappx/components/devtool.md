---
title: Devtool 调试
demo: pages/demo/media/devtool
---

# Devtool 调试

`ms-devtool`：页内调试面板：记录列表 + 环境信息 + 清空，折叠/展开两态。记录由宿主喂入。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-devtool`）。
演示路由：`#/pages/demo/media/devtool`。

## 基础用法

```vue
<template>
  <ms-devtool title="…">
    …
  </ms-devtool>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `'调试面板'` | 标题 |
| host | `string` | `''` | 请求域名，空则不显示 |
| entries | `UTSJSONObject[]` | `[]` | `api` / `status` / `time` / `result` |
| open | `boolean` | `false` | 展开态（`v-model:open`） |
| showEnv | `boolean` | `true` | 环境信息段 |
| maxHeight | `number` | `220` | 记录区最大高度 px |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:open | update:open |
| clear | 清空 |
| entry-click | entry-click |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-devtool/`
- 演示: `#/pages/demo/media/devtool`
