# Empty states

Every "no data" spot in the admin console uses one empty-state component, `ArtEmptyState`: an icon, a one-line title or hint, and an optional primary action. It looks the same as the "basemap not configured" empty state on map pages (40px primary-colour icon, title, 13px description, 12px gap between buttons).

## Where it is used

- **All lists (ArtTable)**: with no data, the list shows an icon and a hint, for example 「还没有岗位。点「新增岗位」添加一个」 (no positions yet; click "New position" to add one) on the positions page. Pages that pass no hint show 「暂无数据」 (no data). When the request fails, the icon turns red and shows the error.
- **AI operations → Billing**: with no calls in the last 7 / 30 days, the chart area no longer shows just an x-axis and the word "Tokens". It shows 「近 N 天还没有调用记录」 (no calls in the last N days) with a short explanation, in both light and dark themes.

## Building a new page

```vue
<ArtEmptyState
  icon="ri:line-chart-line"
  title="近 30 天还没有调用记录"
  description="AI 应用、助手被调用后，这里按天显示 Token 用量"
  size="compact"
>
  <template #actions>
    <ElButton type="primary">Create</ElButton>
  </template>
</ArtEmptyState>
```

| Prop | Meaning | Default |
| --- | --- | --- |
| `icon` | Iconify icon name | `ri:inbox-2-line` |
| `title` | Title, optional | — |
| `description` | One-line hint | — |
| `size` | `page` (lists, whole areas) or `compact` (charts, inside cards) | `page` |
| `error` | Error state, red icon | `false` |

For lists, pass `empty-text` to ArtTable; use ArtTable's `empty-actions` slot when you need a primary action.
