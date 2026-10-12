---
title: Toast 轻提示
demo: pages/demo/feedback/toast
---

# Toast 轻提示

`ms-toast`：轻提示：文本 / 图标 / 加载；顶中底；遮罩可选。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-toast`）。
演示路由：`#/pages/demo/feedback/toast`。

## 基础用法

```vue
<template>
  <ms-toast theme="default" v-model:visible="open">
    …
  </ms-toast>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| message | `string` | `''` | 校验消息 |
| theme | `'default' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'default'` | 主题 |
| icon | `string` | `''` | 自定义图标名（icons.uts 注册名）；theme 自带图标时可省 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| placement | `'top' \| 'middle' \| 'bottom'` | `'middle'` | 弹出位置 |
| duration | `number` | `2000` | 毫秒；0 表示不自动关闭 |
| showOverlay | `boolean` | `false` | 显示遮罩挡住点击穿透 |
| zIndex | `number` | `1100` | 层级 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-toast/`
- 演示: `#/pages/demo/feedback/toast`
