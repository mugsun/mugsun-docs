---
title: Graph
demo: pages/demo/media/graph
---

# Graph

`ms-graph`: Native canvas graph subset: tree / force / layered DAG. F6-like layout semantics without embedding `@antv/f6`.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-graph/components/ms-graph`).
Optional plugin: install `uni_modules/ms-graph` alongside `ms-ui`.
Demo route: `#/pages/demo/media/graph`.

## Basic usage

```vue
<template>
  <ms-graph>
    …
  </ms-graph>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| layout | `string` | `'tree'` | Layout |
| nodes | `UTSJSONObject[]` | `[]` | Node list |
| edges | `UTSJSONObject[]` | `[]` | Edge list |
| height | `number` | `320` | Height (px) |
| fitView | `boolean` | `true` | Whether to fit the viewport |

## Events

| Event | Description |
| --- | --- |
| node-click | Node click |
| ready | Ready |

## See also

- Component: `uni_modules/ms-graph/components/ms-graph/`
- Demo: `#/pages/demo/media/graph`
- Chinese docs: [/uniappx/components/graph](/uniappx/components/graph)
