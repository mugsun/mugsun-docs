---
title: Camera 相机
demo: pages/demo/media/camera
---

# Camera 相机

`ms-camera` 是对官方 `<camera>` 的受控封装，提供固定高度的取景框和拍照、翻转工具栏；在不支持的平台上显示占位区域。

这是可选插件，需要单独安装 `uni_modules/ms-camera`，并依赖 `ms-ui`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-camera
    :device-position="position"
    flash="auto"
    :height="180"
    tip="真机可取景；不支持时显示占位"
    @photo="onPhoto"
    @error="onError"
    @position-change="onPositionChange"
  />
  <ms-camera device-position="front" flash="off" :height="140" :show-toolbar="false" />
  <!-- 组件样式 -->
  <ms-camera :height="120" :show-toolbar="false" resolution="low" />
  <ms-camera :height="120" resolution="high" tip="拍照与翻转两个动作" />
  <!-- 组件深度 -->
  <ms-camera
    flash="torch"
    :height="120"
    :show-toolbar="false"
    tip="常亮闪光"
  />
  <ms-camera
    flash="on"
    resolution="medium"
    :height="120"
    tip="拍照时强制开灯"
  />
  <ms-camera
    ref="cmdCamera"
    :height="120"
    :show-toolbar="false"
    @photo="onPhoto"
    @error="onError"
  />
</template>

<script setup lang="uts">
const position = ref('back')

function onPhoto(payload: UTSJSONObject) : void {
  console.log('onPhoto')
}

function onError(payload: UTSJSONObject) : void {
  console.log('onError')
}

function onPositionChange(payload: UTSJSONObject) : void {
  console.log('onPositionChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| devicePosition | `string` | `'back'` | 摄像头朝向：back / front |
| flash | `string` | `'auto'` | 闪光灯模式：auto / on / off / torch |
| resolution | `string` | `'medium'` | 分辨率：low / medium / high |
| height | `number` | `220` | 取景框高度（px） |
| showToolbar | `boolean` | `true` | 是否显示工具条 |
| tip | `string` | `''` | 取景框下方的提示文字 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| photo | `payload: UTSJSONObject` | 拍照成功时触发，`payload.tempFilePath` 是照片的临时路径 |
| error | `payload: UTSJSONObject` | 拍照失败、未授权或相机不可用时触发，`payload.errMsg` 是错误信息 |
| stop | `payload: UTSJSONObject` | 摄像头被系统中断时触发，例如应用进入后台；`payload` 是空对象 |
| position-change | `payload: UTSJSONObject` | 点击翻转按钮时触发，`payload.devicePosition` 是要切换到的朝向，需要自行更新 `devicePosition` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `takePhoto()` | 拍一张照片，结果通过 `photo` 或 `error` 事件返回 |
