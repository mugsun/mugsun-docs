---
title: Calendar 日历
demo: pages/demo/form/calendar
---

# Calendar 日历

`ms-calendar`：月网格日历。`type`：`single` / `multiple` / `range`。`value` 为 `YYYY-MM-DD` 逗号串。`marks` 扁平上下标。`switchMode=month` 翻月；`none` 平铺。弹层 `ms-popup`；`usePopup=false` 内嵌。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-calendar`）。
演示路由：`#/pages/demo/form/calendar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/calendar.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件用法 -->
  <ms-calendar
    value="2026-03-10,2026-03-18"
    type="range"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    min-date="2026-03-01"
    max-date="2026-03-31"
    :marks="markList2"
    @change="onInlineChange"
  />
  <!-- 组件深度 -->
  <ms-calendar
    ref="resetCalRef"
    value="2026-04-10"
    type="single"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    :auto-close="false"
    min-date="2026-04-01"
    max-date="2026-04-30"
    @change="onResetCalChange"
  />
  <ms-calendar
    type="single"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    :auto-close="false"
    min-date="2026-05-01"
    max-date="2026-05-31"
    @select="onSelectDay"
  />
</template>

<script setup lang="uts">
const resetCalRef = ref(null)
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| type | `string` | `'single'` | 选择模式：single / multiple / range |
| value | `string` | `''` | 选中值；多选/区间为逗号分隔日期 |
| minDate | `string` | `''` | 可选最小日期（YYYY-MM-DD） |
| maxDate | `string` | `''` | 可选最大日期（YYYY-MM-DD） |
| firstDayOfWeek | `number` | `0` | 一周起始：0=周日 … 6=周六 |
| disabledDates | `string[]` | `[]` | 禁用日期列表（YYYY-MM-DD） |
| marks | `UTSJSONObject[]` | `[]` | 日期标记（含 date/text 等字段） |
| switchMode | `string` | `'none'` | 头部切换：none 不切换；month 按月切换 |
| title | `string` | `''` | 弹层标题；空则用当前年月 |
| weekdays | `string[]` | `[]` | 星期栏文案；空则用默认日一二… |
| readonly | `boolean` | `false` | 是否只读 |
| allowSameDay | `boolean` | `false` | range 模式下是否允许起止同一天 |
| showConfirm | `boolean` | `true` | 是否显示底部确认按钮 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| visible | `boolean` | `false` | 弹层是否显示（usePopup 时） |
| usePopup | `boolean` | `true` | 是否包在弹出层内展示 |
| autoClose | `boolean` | `true` | 确认/选完后是否自动关闭弹层 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| select | select |
| change | 值变化 |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |
| panel-change | panel-change |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-calendar/`
- 演示: `#/pages/demo/form/calendar`
