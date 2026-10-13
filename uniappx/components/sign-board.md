---
title: Sign Board 签名
demo: pages/demo/form/sign-board
---

# Sign Board 签名

`ms-sign-board`：手写签名板：`canvas` 2d + 触摸（Web 另补鼠标）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-sign-board`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/sign-board`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/sign-board.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-sign-board ref="boardRef" :pen-type="penType" @end="onStrokeEnd" />
  <!-- 组件样式 -->
  <ms-sign-board ref="pencilRef" pen-type="pencil" :stroke-width="6" />
  <!-- 组件深度 -->
  <ms-sign-board pen-type="pen" :stroke-width="14" />
  <ms-sign-board disabled :stroke-width="8" />
  <ms-sign-board pen-type="pencil" :stroke-width="3" />
</template>

<script setup lang="uts">
const penType = ref('default')

function onStrokeEnd() : void {
  console.log('onStrokeEnd')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| penType | `string` | `'default'` | default / pen / pencil |
| strokeWidth | `number` | `8` | 基准笔宽 px |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| end | end |
| clear | 清空 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-sign-board/`
- 演示: `#/pages/demo/form/sign-board`
