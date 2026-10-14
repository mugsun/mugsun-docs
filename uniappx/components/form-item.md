---
title: Form Item 表单项
demo: pages/demo/form/form
---

# Form Item 表单项

`ms-form-item` 是表单项，包含标签、内容插槽、辅助说明和错误提示，可显示必填星号和右侧箭头。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-form-item`。ms-ui 为商业版，源码不公开。
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
| label | `string` | `''` | 标签文案 |
| name | `string` | `''` | 名称 / 字段名 |
| value | `string` | `''` | 参与校验的当前值（由父页面传入表单数据） |
| required | `boolean` | `false` | 是否必填 |
| requiredMark | `boolean` | `true` | 必填时是否显示红色星号 |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | 内置校验：none / phone / email / number |
| min | `number` | `-1` | 最小值 |
| max | `number` | `-1` | 最大值 |
| message | `string` | `''` | 校验失败文案 |
| help | `string` | `''` | 帮助文案 |
| arrow | `boolean` | `false` | 右侧是否显示箭头 |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | 标签对齐 |
| labelWidth | `number` | `-1` | 标签宽度（px） |
| bordered | `boolean` | `true` | 是否显示边框 |

## 事件

| 事件 | 说明 |
| --- | --- |
| validate | 校验结束 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-form-item/`
- 演示: `#/pages/demo/form/form`
