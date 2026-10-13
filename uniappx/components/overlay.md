---
title: Overlay 遮罩
demo: pages/demo/basic/overlay
---

# Overlay 遮罩

`ms-overlay`：全屏半透明遮罩，弹层地基。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-overlay`（源码仓暂未公开）。
演示路由：`#/pages/demo/basic/overlay`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/overlay.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <ms-overlay
    :visible="showBase"
    @update:visible="onBaseVisible"
    @click="onBaseMaskClick"
  />
  <ms-overlay :visible="showContent" @update:visible="onContentVisible">
    <ms-sheet margin="page" radius="lg" shadow>
      <ms-text>遮罩上的内容块</ms-text>
      <view>
        <ms-button size="sm" theme="primary" @click="closeContent">关闭</ms-button>
      </view>
    </ms-sheet>
  </ms-overlay>
  <ms-overlay :visible="showLock" :closable="false" @update:visible="onLockVisible">
    <ms-sheet margin="page" radius="lg">
      <ms-text>点遮罩不会关闭</ms-text>
      <view>
        <ms-button size="sm" theme="primary" @click="closeLock">知道了</ms-button>
      </view>
    </ms-sheet>
  </ms-overlay>
</template>

<script setup lang="uts">
const showBase = ref(false)

const showContent = ref(false)

const showLock = ref(false)

function onBaseVisible(value: boolean): void {
  showBase.value = value
}

function onBaseMaskClick() : void {
  console.log('onBaseMaskClick')
}

function onContentVisible(value: boolean): void {
  showContent.value = value
}

function closeContent(): void {
  showContent.value = false
}

function onLockVisible(value: boolean): void {
  showLock.value = value
}

function closeLock(): void {
  showLock.value = false
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| closable | `boolean` | `true` | 是否可关闭 |
| zIndex | `number` | `1000` | 层级 z-index |
| dim | `'light' \| 'normal' \| 'heavy'` | `'normal'` | 遮罩浓度：浅 / 常规 / 深（语义档，非任意颜色字符串） |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| close | 关闭 |
| open | 打开 |
| update:visible | v-model:visible 更新 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-overlay/`
- 演示: `#/pages/demo/basic/overlay`
