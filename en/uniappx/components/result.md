---
title: Result
demo: pages/demo/display/result
---

# Result

`ms-result` — Result for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-result` (repository not yet public).
Demo route: `#/pages/demo/display/result`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/result.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-result theme="success" title="操作成功" />
  <ms-result
    theme="default"
    title="已提交申请"
    description="内容详情可折行，建议控制在两行以内"
  />
  <ms-result
    image="/static/empty-illustration.svg"
    title="自定义结果"
    description="使用图片替代主题图标"
    show-actions
  >
    <ms-button size="sm" theme="primary" @click="onAction">
      返回
    </ms-button>
  </ms-result>
  <!-- 组件状态 -->
  <ms-result theme="success" title="提交成功" description="预计 1–3 个工作日处理完成" />
  <ms-result theme="warning" title="请核对信息" description="部分字段可能影响后续流程" />
  <ms-result theme="error" title="提交失败" description="请检查网络后重试" />
  <!-- 组件深度 -->
  <ms-result
    theme="error"
    title="支付未完成"
    description="可返回修改或重新发起"
    show-actions
  >
    <ms-button size="sm" theme="default" @click="onSecondary">返回</ms-button>
    <view></view>
    <ms-button size="sm" theme="primary" @click="onPrimary">重试</ms-button>
  </ms-result>
  <ms-result icon="none" title="纯文案结果" description="适合轻量提示场景" />
  <ms-result theme="success" show-actions>
    <template #title>
      <text>插槽标题</text>
    </template>
    <template #description>
      <text>插槽描述 · 可自定义富文案结构</text>
    </template>
    <ms-button size="sm" theme="primary" @click="onAction">知道了</ms-button>
  </ms-result>
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Theme color |
| title | `string` | `''` | Title |
| description | `string` | `''` | Description text |
| icon | `string` | `''` | Override theme icon; 'none' hides the icon |
| image | `string` | `''` | Image URL; takes priority over icon when set |
| showActions | `boolean` | `false` | Whether to render the action area (default slot) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| description | `description` slot |
| title | `title` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-result/`
- Demo: `#/pages/demo/display/result`
- Chinese docs: [/uniappx/components/result](/uniappx/components/result)
