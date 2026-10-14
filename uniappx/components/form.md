---
title: Form 表单
demo: pages/demo/form/form
---

# Form 表单

`ms-form` 是表单容器，把 `labelAlign`（`left/right/top`）、`labelWidth`、`colon`、`showErrorMessage` 和 `disabled` 传给其中的 `ms-form-item`。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-form`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/form/form`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/form.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-form label-align="right" :label-width="72">
    <ms-form-item label="用户名" name="name" :value="hName">
      <ms-input v-model="hName" placeholder="请输入用户名" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="密码" name="password" :value="hPassword" :bordered="false">
      <ms-input
        v-model="hPassword"
        type="password"
        placeholder="请输入密码"
        :bordered="false"
      />
    </ms-form-item>
  </ms-form>
  <ms-form label-align="top">
    <ms-form-item label="昵称" name="nick" :value="vNick" :bordered="false">
      <ms-input v-model="vNick" placeholder="请输入昵称" />
    </ms-form-item>
  </ms-form>
  <!-- 组件状态 -->
  <ms-form label-align="left" :label-width="72" colon>
    <ms-form-item label="必填" name="req" :value="sReq" required help="必填项带红色星号">
      <ms-input v-model="sReq" placeholder="请输入内容" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="说明" name="help" :value="sHelp" help="下方为辅助说明文案">
      <ms-input v-model="sHelp" placeholder="可不填" :bordered="false" />
    </ms-form-item>
    <ms-form-item label="箭头" name="arrow" :value="sArrow" arrow :bordered="false">
      <ms-input v-model="sArrow" placeholder="点选类字段" readonly :bordered="false" />
    </ms-form-item>
  </ms-form>
</template>

<script setup lang="uts">
const hName = ref('mugsun')

const hPassword = ref('')

const sArrow = ref('')

const sHelp = ref('')

const sReq = ref('')

const vNick = ref('')
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| labelAlign | `'left' \| 'right' \| 'top'` | `'right'` | 标签对齐 |
| labelWidth | `number` | `81` | 标签宽度（px） |
| colon | `boolean` | `false` | 标签后是否显示冒号 |
| showErrorMessage | `boolean` | `true` | 是否显示校验错误 |
| disabled | `boolean` | `false` | 是否禁用 |
| validateTick | `number` | `0` | +1 触发一次全量校验（避免页面持有组件 ref 调方法） |
| resetTick | `number` | `0` | +1 清空全部错误 |

## 事件

| 事件 | 说明 |
| --- | --- |
| validate | 校验结束 |
| submit | 提交 |
| error | 错误 |
| reset | 重置 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-form/`
- 演示: `#/pages/demo/form/form`
