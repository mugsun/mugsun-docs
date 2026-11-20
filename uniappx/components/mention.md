---
title: Mention 提及
demo: pages/demo/form/mention
---

# Mention 提及

`ms-mention` 在输入触发符（默认 `@`）时弹出候选面板，选中后插入 `@名字 `；按一次退格键会删除整个提及。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| options | `string[]` | `[]` | 候选名字列表；为空时不弹面板，只触发 `mention` 事件，可以自己实现候选面板 |
| trigger | `string` | `'@'` | 触发符，只取第一个字符 |
| filterable | `boolean` | `true` | 是否按触发符后面输入的文字筛选候选项（前缀匹配） |
| placeholder | `string` | `'输入 @ 提及成员'` | 占位文案 |
| emptyText | `string` | `'无匹配成员'` | 没有匹配项时的提示文字 |
| disabled | `boolean` | `false` | 是否禁用 |
| confirmType | `string` | `'send'` | 键盘确认键类型 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容变化时触发，用于 `v-model` |
| change | `value: string` | 输入内容变化时触发 |
| mention | `keyword: string` | 输入触发符以及之后的筛选文字变化时触发，`keyword` 是触发符后面的文字 |
| select | `name: string` | 选中候选项时触发 |
| removemention | `name: string` | 用退格键删掉一个提及时触发，`name` 是被删的名字 |
| confirm | `value: string` | 点击键盘的确认键时触发 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getMentions(): string[]` | 返回当前文本里的全部提及名字 |
| `closePanel()` | 关闭候选面板 |
