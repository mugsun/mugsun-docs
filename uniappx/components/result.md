---
title: Result 结果
demo: pages/demo/display/result
---

# Result 结果

`ms-result` 是结果页反馈，由图标或图片、标题、描述和可选的操作区组成。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-result`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/result`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/result.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

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

<script setup lang="uts">
function onAction() : void {
  console.log('onAction')
}

function onSecondary() : void {
  console.log('onSecondary')
}

function onPrimary() : void {
  console.log('onPrimary')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 主题色 |
| title | `string` | `''` | 标题 |
| description | `string` | `''` | 描述文案 |
| icon | `string` | `''` | 覆盖主题默认图标；'none' 表示不显示图标 |
| image | `string` | `''` | 图片地址，有值时优先于图标 |
| showActions | `boolean` | `false` | 是否渲染操作区（默认插槽） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| description | `description` 插槽 |
| title | `title` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-result/`
- 演示: `#/pages/demo/display/result`
