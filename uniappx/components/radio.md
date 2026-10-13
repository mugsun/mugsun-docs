---
title: Radio 单选
demo: pages/demo/form/radio
---

# Radio 单选

`ms-radio`：单选项：填充 / 描边 / 圆点三种选框形态，选框可放左或右。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-radio`（源码仓暂未公开）。
演示路由：`#/pages/demo/form/radio`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/radio.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-radio :model-value="true" label="填充" block />
  <ms-radio :model-value="true" label="描边" icon="line" block />
  <ms-radio :model-value="true" label="圆点" icon="dot" block />
  <!-- 组件状态 -->
  <ms-radio :model-value="false" disabled label="禁用" block />
  <ms-radio :model-value="true" disabled label="禁用已选" block />
  <ms-radio v-model="vUncheck" allow-uncheck label="可取消" block />
  <!-- 组件分组 -->
  <ms-radio value="a" label="选项 A" block />
  <ms-radio value="b" label="选项 B" block />
  <ms-radio value="c" label="选项 C" block />
  <!-- 组件深度 -->
  <ms-radio value="1" label="禁用组甲" block />
  <ms-radio value="2" label="禁用组乙" block />
  <ms-radio v-model="vDepth" label="描边右侧" icon="line" placement="right" block />
</template>

<script setup lang="uts">
const vDepth = ref(true)

const vUncheck = ref(true)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 绑定值（v-model） |
| value | `string` | `''` | 在 radio-group 中的选项值 |
| label | `string` | `''` | 标签文案 |
| content | `string` | `''` | 次要说明文案 |
| contentDisabled | `boolean` | `false` | 点内容区不切换；仅点图标切换 |
| disabled | `boolean` | `false` | 是否禁用 |
| icon | `'circle' \| 'line' \| 'dot'` | `'circle'` | 图标形状 |
| placement | `'left' \| 'right'` | `'left'` | 图标相对文案位置 |
| block | `boolean` | `false` | 是否通栏 |
| allowUncheck | `boolean` | `false` | 再次点击已选项是否取消选中 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-radio/`
- 演示: `#/pages/demo/form/radio`
