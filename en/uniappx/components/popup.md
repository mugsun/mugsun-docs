---
title: Popup
demo: pages/demo/feedback/popup
---

# Popup

`ms-popup` — Popup for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-popup` (repository not yet public).
Demo route: `#/pages/demo/feedback/popup`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/popup.uvue`; see them running in the phone frame.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` | Popup / placement |
| title | `string` | `''` | Title |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| closeOnOverlayClick | `boolean` | `true` | Whether clicking the overlay closes |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| round | `boolean` | `true` | Whether rounded |
| zIndex | `number` | `1000` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| overlay-click | Overlay click |
| open | Opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-popup/`
- Demo: `#/pages/demo/feedback/popup`
- Chinese docs: [/uniappx/components/popup](/uniappx/components/popup)
