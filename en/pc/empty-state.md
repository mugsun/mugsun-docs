# Empty states

Every place in the admin console that has no data uses the same empty-state component, `ArtEmptyState`. It consists of an icon, a title or one line of guidance, and optional action buttons.

## Where it is used

| Place | What it shows when there is no data |
| --- | --- |
| Lists built with `ArtTable` | An icon and one line of guidance. Pages that pass no guidance show "No Data" |
| Billing in the AI center | The chart area shows "No calls in the last N days" and one line of explanation |

- The guidance tells people what to do next. Positions, for example, shows "No positions yet. Click Add Position to add one".
- A search with no results shows a different line, such as "No positions match. Change the name, code, or type, then search again".
- A failed request can be shown as an error state, with a red icon and the reason. The User Manage page does this today.
- It looks the same in light and dark mode.

## In a list {#in-table}

A list page only needs to pass `empty-text` to `ArtTable`. The empty state is built into the table component.

```vue
<ArtTable :data="data" :columns="columns" :empty-text="emptyText" />
```

```ts
const emptyText = computed(() =>
  searched.value
    ? t('pages.system.post.emptySearch')
    : t('pages.system.post.emptyList')
)
```

| Prop or slot | Description |
| --- | --- |
| `empty-text` | Guidance shown when there is no data. The default is "No Data" |
| `error-message` | The reason a request failed. When set, the table shows an error state with a red icon |
| `empty-actions` slot | Holds action buttons, such as an add button |

- The example above comes from the Positions page. It shows two different lines depending on whether a search is active.
- The empty state is not shown while the table is still loading.

## Elsewhere {#standalone}

For areas such as charts and cards, use `ArtEmptyState` directly when there is no data.

```vue
<ArtEmptyState
  icon="ri:line-chart-line"
  title="No calls in the last 30 days"
  description="Daily token usage appears here once AI apps or assistants are called."
  size="compact"
>
  <template #actions>
    <ElButton type="primary">Create one</ElButton>
  </template>
</ArtEmptyState>
```

```ts
import ArtEmptyState from '@/components/core/others/art-empty-state/index.vue'
```

| Prop | Description | Default |
| --- | --- | --- |
| `icon` | Iconify icon name | `ri:inbox-2-line` |
| `title` | Title, optional | Empty |
| `description` | One line of guidance | Empty |
| `size` | `page` for lists and whole areas, `compact` for charts and cards | `page` |
| `error` | Error state, with a red icon | `false` |

- Buttons go into the `actions` slot.
- The icon is 40px, the title 17px and the description 13px. With `compact`, the icon is 32px and the title 15px.
- The example writes its text inline. A real page gets the text with `$t`.

## Next steps

<div class="ms-cards">

- [Form validation](/en/pc/form-validation) How to write required and format messages.
- [UI self-check](/en/pc/ui-check) Run the automatic check locally before you commit.

</div>
