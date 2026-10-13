---
title: Popup 弹层
demo: pages/demo/feedback/popup
---

# Popup 弹层

`ms-popup`：弹出层容器：`placement` 支持 `bottom/top/left/right/center`，可带标题栏与关闭按钮，`round` 按位置自动圆角。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-popup`）。
演示路由：`#/pages/demo/feedback/popup`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/popup.uvue`，可在右侧手机框中查看运行效果。

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
const placement = ref('bottom')
const showClose = ref(false)
const showRecipeSelect = ref(false)
const showRecipeForm = ref(false)
const formNotify = ref(true)
const formPromo = ref(false)
const formRemark = ref('')
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` | 弹出/摆放位置 |
| title | `string` | `''` | 标题 |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnOverlayClick | `boolean` | `true` | 点击遮罩是否关闭 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| round | `boolean` | `true` | 是否圆角 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| close | 关闭 |
| overlay-click | 点击遮罩 |
| open | 打开 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-popup/`
- 演示: `#/pages/demo/feedback/popup`
