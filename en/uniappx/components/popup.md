---
title: Popup
demo: pages/demo/feedback/popup
---

# Popup

`ms-popup` — Popup for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-popup` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/popup`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/popup.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <ms-popup
    :visible="showRecipeSelect"
    placement="bottom"
    title="Select city"
    close-btn
    @update:visible="onRecipeSelectVisible"
  >
    <view>
      <ms-cell title="Beijing" :note="cityNote('Beijing')" arrow @click="pickCity('Beijing')" />
      <ms-cell title="Shanghai" :note="cityNote('Shanghai')" arrow @click="pickCity('Shanghai')" />
      <ms-cell title="Guangzhou" :note="cityNote('Guangzhou')" arrow @click="pickCity('Guangzhou')" />
      <ms-cell title="Shenzhen" :note="cityNote('Shenzhen')" arrow @click="pickCity('Shenzhen')" />
      <ms-cell title="Hangzhou" :note="cityNote('Hangzhou')" arrow :bordered="false" @click="pickCity('Hangzhou')" />
    </view>
  </ms-popup>
  <ms-popup
    :visible="showRecipeForm"
    placement="bottom"
    title="Notification settings"
    close-btn
    @update:visible="onRecipeFormVisible"
  >
    <view>
      <view>
        <ms-cell title="Message notifications" :bordered="true">
          <template #note>
            <ms-switch v-model="formNotify" />
          </template>
        </ms-cell>
        <ms-cell title="Marketing push" :bordered="false">
          <template #note>
            <ms-switch v-model="formPromo" />
          </template>
        </ms-cell>
      </view>
      <view>
        <ms-input v-model="formRemark" placeholder="Remark (optional)" />
      </view>
      <view>
        <ms-button block theme="primary" @click="saveRecipeForm">Save</ms-button>
      </view>
    </view>
  </ms-popup>
  <ms-popup
    :visible="showClose"
    placement="bottom"
    title="How to use"
    close-btn
    @update:visible="onCloseVisible"
  >
    <view>
      <text>The popup has a built-in title, close button and overlay; the body can hold any content.</text>
      <text>Common uses: a list for selection, or switches and inputs for settings.</text>
      <text>Tap the close button in the top-right corner or the overlay to dismiss.</text>
      <view>
        <ms-cell title="Next" note="Go select a city" arrow :bordered="false" @click="fromCloseToSelect" />
      </view>
    </view>
  </ms-popup>
</template>

<script setup lang="uts">
function cityNote(name: string): string {
  return selectedCity.value == name ? 'Selected' : ''
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
