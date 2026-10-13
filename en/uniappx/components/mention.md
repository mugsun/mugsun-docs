---
title: Mention
demo: pages/demo/form/mention
---

# Mention

`ms-mention` — Mention for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-mention`).
Demo route: `#/pages/demo/form/mention`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/mention.uvue`; see them running in the phone frame.

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
const members = ref(['张伟', '李娜', '王强', '刘敏', '陈晨'] as string[])
const topics = ref(['发布计划', '版本回顾', '性能优化'] as string[])
const basicText = ref('今天的进度 ')
const topicText = ref('')
const emptyText = ref('')
const disabledText = ref('@张伟 已只读')
const unfilteredText = ref('')
const customEmptyText = ref('')
const confirmText = ref('')
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Bound value (v-model) |
| options | `string[]` | `[]` | Options list |
| trigger | `string` | `'@'` | Trigger |
| filterable | `boolean` | `true` | Whether filterable |
| placeholder | `string` | `'输入 @ 提及成员'` | Placeholder |
| emptyText | `string` | `'无匹配成员'` | Empty-state text |
| disabled | `boolean` | `false` | Whether disabled |
| confirmType | `string` | `'send'` | Keyboard confirm-key type |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| mention | mention |
| select | select |
| removemention | removemention |
| confirm | Confirm |

## See also

- Component: `uni_modules/ms-ui/components/ms-mention/`
- Demo: `#/pages/demo/form/mention`
- Chinese docs: [/uniappx/components/mention](/uniappx/components/mention)
