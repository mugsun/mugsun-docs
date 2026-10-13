---
title: Tree 树
demo: pages/demo/display/tree
---

# Tree 树

`ms-tree`：树形列表：扁平可见行渲染（不递归组件），支持展开/折叠、多选勾选、子父关联半选、禁父框。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-tree`）。
演示路由：`#/pages/demo/display/tree`。

## 基础用法

```vue
<template>
  <ms-tree value="…">
    …
  </ms-tree>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| value | `string[]` | `[]` | 当前值 |
| folderIds | `string[]` | `[]` | 文件夹 id 列表 |
| checkable | `boolean` | `true` | 是否可选中 |
| parentLink | `boolean` | `false` | 选父是否联动子；选子是否回写父 |
| disabledParent | `boolean` | `false` | 是否禁用父级联动 |
| disabled | `boolean` | `false` | 是否禁用 |
| idKey | `string` | `'id'` | id 字段名 |
| labelKey | `string` | `'text'` | 标签字段名 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:value | v-model:value 更新 |
| update:folderIds | update:folderIds |
| change | 值变化 |
| expand-change | expand-change |
| node-click | 点击节点 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tree/`
- 演示: `#/pages/demo/display/tree`
