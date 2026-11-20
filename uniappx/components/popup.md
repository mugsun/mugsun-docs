---
title: Popup 弹层
demo: pages/demo/feedback/popup
---

# Popup 弹层

`ms-popup` 是弹出层容器，可以从上下左右四个方向滑出，也可以显示在屏幕中间，可带标题栏和关闭按钮。

显示状态用 `v-model:visible` 绑定。[`ms-modal`](./modal)、[`ms-action-sheet`](./action-sheet) 和 [`ms-drawer`](./drawer) 都建立在它之上。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-popup
    :visible="showRecipeSelect"
    placement="bottom"
    title="选择城市"
    close-btn
    @update:visible="onRecipeSelectVisible"
  >
    <view>
      <ms-cell title="北京" :note="cityNote('北京')" arrow @click="pickCity('北京')" />
      <ms-cell title="上海" :note="cityNote('上海')" arrow @click="pickCity('上海')" />
      <ms-cell title="广州" :note="cityNote('广州')" arrow @click="pickCity('广州')" />
      <ms-cell title="深圳" :note="cityNote('深圳')" arrow @click="pickCity('深圳')" />
      <ms-cell title="杭州" :note="cityNote('杭州')" arrow :bordered="false" @click="pickCity('杭州')" />
    </view>
  </ms-popup>
  <ms-popup
    :visible="showRecipeForm"
    placement="bottom"
    title="通知设置"
    close-btn
    @update:visible="onRecipeFormVisible"
  >
    <view>
      <view>
        <ms-cell title="消息通知" :bordered="true">
          <template #note>
            <ms-switch v-model="formNotify" />
          </template>
        </ms-cell>
        <ms-cell title="营销推送" :bordered="false">
          <template #note>
            <ms-switch v-model="formPromo" />
          </template>
        </ms-cell>
      </view>
      <view>
        <ms-input v-model="formRemark" placeholder="备注（可选）" />
      </view>
      <view>
        <ms-button block theme="primary" @click="saveRecipeForm">保存</ms-button>
      </view>
    </view>
  </ms-popup>
  <ms-popup
    :visible="showClose"
    placement="bottom"
    title="使用说明"
    close-btn
    @update:visible="onCloseVisible"
  >
    <view>
      <text>弹出层自带标题、关闭按钮和遮罩，中间区域可放任意内容。</text>
      <text>常见用法：放列表做选择，放开关和输入框做设置。</text>
      <text>点右上角关闭按钮或遮罩即可收起。</text>
      <view>
        <ms-cell title="下一步" note="去选择城市" arrow :bordered="false" @click="fromCloseToSelect" />
      </view>
    </view>
  </ms-popup>
</template>

<script setup lang="uts">
function cityNote(name: string): string {
  return selectedCity.value == name ? '已选' : ''
}

const formNotify = ref(true)

const formPromo = ref(false)

const formRemark = ref('')

const showClose = ref(false)

const showRecipeForm = ref(false)

const showRecipeSelect = ref(false)

function onRecipeSelectVisible(value: boolean): void {
  showRecipeSelect.value = value
}

function pickCity(name: string) : void {
  console.log('pickCity')
}

function onRecipeFormVisible(value: boolean): void {
  showRecipeForm.value = value
}

function saveRecipeForm() : void {
  console.log('saveRecipeForm')
}

function onCloseVisible(value: boolean): void {
  showClose.value = value
}

function fromCloseToSelect() : void {
  console.log('fromCloseToSelect')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` | 弹出位置 |
| title | `string` | `''` | 标题 |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| round | `boolean` | `true` | 是否圆角，圆角的位置随弹出位置变化 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| close | — | 弹出层关闭时触发 |
| overlay-click | — | 点击遮罩时触发，`closeOnOverlayClick` 为 `false` 时也会触发 |
| open | — | 打开动画结束后触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 弹出层内容 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `open()` | 打开弹出层，需配合 `v-model:visible` |
| `close()` | 关闭弹出层，需配合 `v-model:visible` |
