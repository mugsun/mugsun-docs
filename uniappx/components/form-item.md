---
title: Form Item 表单项
demo: pages/demo/form/form
---

# Form Item 表单项

`ms-form-item`：表单项：标签 + 内容插槽 + 辅助说明 / 错误文案，可带必填星号与右箭头。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-form-item`）。
演示路由：`#/pages/demo/form/form`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/form.uvue`，可在右侧手机框中查看运行效果。

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
const vNick = ref('')
const sReq = ref('')
const sHelp = ref('')
const sArrow = ref('')
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| label | `string` | `''` | 标签文案 |
| name | `string` | `''` | 名称 / 字段名 |
| value | `string` | `''` | 参与校验的当前值（由宿主把表单数据传进来） |
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
