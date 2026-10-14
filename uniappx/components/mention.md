---
title: Mention 提及
demo: pages/demo/form/mention
---

# Mention 提及

`ms-mention` 在输入触发符（默认 `@`）时弹出候选面板，选中后插入 `@名字 `；按一次退格键会删除整个提及。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-mention`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/form/mention`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/mention.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-mention
    v-model="basicText"
    :options="members"
    @select="onSelect"
    @removemention="onRemove"
    @mention="onMention"
  />
  <ms-mention
    v-model="topicText"
    trigger="#"
    :options="topics"
    placeholder="输入 # 选择话题"
    @select="onSelect"
  />
  <!-- 组件样式 -->
  <ms-mention
    v-model="emptyText"
    :options="members"
    placeholder="输入 @zzz 看空态"
  />
  <ms-mention
    v-model="disabledText"
    :options="members"
    disabled
    placeholder="已禁用"
  />
  <!-- 组件深度 -->
  <ms-mention
    v-model="unfilteredText"
    :options="members"
    :filterable="false"
    placeholder="输入 @ 显示全部成员"
    @select="onSelect"
  />
  <ms-mention
    v-model="customEmptyText"
    :options="members"
    empty-text="没有这位同事"
    placeholder="输入 @zzz 看空态"
  />
  <ms-mention
    v-model="confirmText"
    :options="members"
    confirm-type="done"
    placeholder="键盘确认键为 done"
    @select="onSelect"
  />
</template>

<script setup lang="uts">
const basicText = ref('今天的进度 ')

const confirmText = ref('')

const customEmptyText = ref('')

const disabledText = ref('@张伟 已只读')

const emptyText = ref('')

const members = ref(['张伟', '李娜', '王强', '刘敏', '陈晨'] as string[])

const topicText = ref('')

const topics = ref(['发布计划', '版本回顾', '性能优化'] as string[])

const unfilteredText = ref('')

function onSelect(name: string) : void {
  console.log('onSelect')
}

function onRemove(name: string) : void {
  console.log('onRemove')
}

function onMention(keyword: string) : void {
  console.log('onMention')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| options | `string[]` | `[]` | 选项列表 |
| trigger | `string` | `'@'` | 触发时机 |
| filterable | `boolean` | `true` | 是否可筛选 |
| placeholder | `string` | `'输入 @ 提及成员'` | 占位文案 |
| emptyText | `string` | `'无匹配成员'` | 空态文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| confirmType | `string` | `'send'` | 键盘确认键类型 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| mention | mention |
| select | select |
| removemention | removemention |
| confirm | 确认 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-mention/`
- 演示: `#/pages/demo/form/mention`
