---
title: Camera 相机
demo: pages/demo/media/camera
---

# Camera 相机

`ms-camera`：官方 `<camera>` 的受控封装：定高取景框 + 拍照/翻转工具条，不支持的平台落占位块。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-camera/components/ms-camera`（源码仓暂未公开）。
可选插件：需单独安装 `uni_modules/ms-camera`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/camera`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/camera.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| devicePosition | `string` | `'back'` | 摄像头朝向 |
| flash | `string` | `'auto'` | 闪光灯模式 |
| resolution | `string` | `'medium'` | 分辨率 |
| height | `number` | `220` | 高度（px） |
| showToolbar | `boolean` | `true` | 是否显示工具条 |
| tip | `string` | `''` | 提示文案 |

## 事件

| 事件 | 说明 |
| --- | --- |
| photo | 拍照完成 |
| error | 错误 |
| stop | 停止 |
| position-change | 朝向变化 |

## 相关

- 组件目录: `uni_modules/ms-camera/components/ms-camera/`
- 演示: `#/pages/demo/media/camera`
