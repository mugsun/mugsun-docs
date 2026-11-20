---
title: Progress
demo: pages/demo/display/progress
---

# Progress

`ms-progress` is a progress indicator in three styles: a line, a bar with the label inside, and a circle. At 100% it switches to the success state automatically.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-progress variant="line" :percentage="80" />
  <ms-progress variant="plump" :percentage="80" />
  <ms-progress variant="circle" :percentage="30" />
  <!-- Linear states -->
  <ms-progress variant="line" :percentage="88" status="warning" />
  <ms-progress variant="line" :percentage="88" status="error" />
  <ms-progress variant="line" :percentage="88" status="success" />
  <!-- Inner label states -->
  <ms-progress variant="plump" :percentage="88" status="warning" />
  <ms-progress variant="plump" :percentage="88" status="error" />
  <ms-progress variant="plump" :percentage="88" status="success" />
  <!-- Circle states -->
  <ms-progress variant="circle" :percentage="88" status="warning" />
  <ms-progress variant="circle" :percentage="88" status="error" />
  <ms-progress variant="circle" :percentage="88" status="success" />
</template>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| percentage | `number` | `0` | Progress percentage, from 0 to 100 |
| variant | `'line' \| 'plump' \| 'circle'` | `'line'` | Style: line / plump (label inside the bar) / circle |
| status | `'default' \| 'success' \| 'warning' \| 'error' \| 'active'` | `'default'` | Status: default / success / warning / error / active |
| strokeWidth | `number` | `6` | Bar thickness (px) |
| label | `boolean \| string` | `true` | `true` shows the percentage, `false` hides it, and a string is shown as the label |
| size | `'xs' \| 'md'` | `'md'` | Size of the circle style, `xs` being small; no effect on the other styles |
