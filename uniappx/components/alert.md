---
title: Alert 警告条
demo: pages/demo/feedback/alert
---

# Alert 警告条

`ms-alert`：页内警告条：主题 + 浅色/填充 + 可关闭。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-alert`（商业版，源码不公开）。
演示路由：`#/pages/demo/feedback/alert`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/alert.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 主题 -->
  <ms-alert theme="primary" :closable="false">主色提醒</ms-alert>
  <ms-alert theme="info" :closable="false">信息提醒</ms-alert>
  <ms-alert theme="success" :closable="false">成功提醒</ms-alert>
  <!-- 形态 -->
  <ms-alert variant="light" theme="primary" :closable="false">浅色</ms-alert>
  <ms-alert variant="solid" theme="primary" :closable="false">填充</ms-alert>
  <!-- 可关闭 -->
  <ms-alert
    theme="warning"
    :visible="showClosable"
    @update:visible="onClosableVisible"
    @close="onAlertClose"
  >可关闭</ms-alert>
  <ms-alert theme="info" :closable="false">常驻</ms-alert>
  <!-- 图标 -->
  <ms-alert theme="primary" icon="information-line" :closable="false">自定义图标</ms-alert>
</template>

<script setup lang="uts">
const showClosable = ref(true)

function onClosableVisible(value: boolean): void {
  showClosable.value = value
}

function onAlertClose() : void {
  console.log('onAlertClose')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 主题色 |
| variant | `'light' \| 'solid'` | `'light'` | 样式变体 |
| closable | `boolean` | `true` | 是否可关闭 |
| icon | `string` | `''` | 图标名（icons.uts） |
| showIcon | `boolean` | `true` | 不显示左侧图标 |
| title | `string` | `''` | 标题（可选，与默认插槽正文并存） |
| visible | `boolean` | `true` | 是否显示；配合 update:visible，关闭后可由宿主重开 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| update:visible | v-model:visible 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-alert/`
- 演示: `#/pages/demo/feedback/alert`
