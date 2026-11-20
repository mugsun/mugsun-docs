---
title: Result 结果
demo: pages/demo/display/result
---

# Result 结果

`ms-result` 是结果页反馈，由图标或图片、标题、描述和可选的操作区组成。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 类型，决定默认的图标和颜色 |
| title | `string` | `''` | 标题 |
| description | `string` | `''` | 描述文字 |
| icon | `string` | `''` | 图标名，留空使用类型对应的默认图标，`none` 表示不显示 |
| image | `string` | `''` | 图片地址，设置后代替图标 |
| showActions | `boolean` | `false` | 是否显示操作区，内容放在默认插槽 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| title | 自定义标题，默认显示 `title` |
| description | 自定义描述，默认显示 `description` |
| default | 操作区内容，`showActions` 为 `true` 时显示 |
