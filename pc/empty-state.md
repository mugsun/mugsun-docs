# 空状态

管理后台里没有数据的地方，都用同一个空状态组件 `ArtEmptyState`。它由图标、一句标题或引导和可选的操作按钮组成。

## 用在哪里

| 位置 | 没有数据时显示什么 |
| --- | --- |
| 用 `ArtTable` 的列表 | 图标加一句引导。没传引导文字的页面显示「暂无数据」 |
| AI 中心的「账单记录」 | 图表区显示「近 N 天还没有调用记录」和一句说明 |

- 引导要告诉人下一步做什么，例如岗位管理的「还没有岗位。点「新增岗位」添加一个」。
- 搜索后没有结果时换一句话，例如「没有符合条件的岗位。请改名称、编码或类型后再查」。
- 请求失败可以显示成错误状态，图标变红并写出原因。现在用户管理页这样做。
- 亮色和暗色下的样子一致。

## 在列表里用 {#in-table}

列表页给 `ArtTable` 传 `empty-text` 就行，空状态已经内置在表格组件里。

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

| 属性或插槽 | 说明 |
| --- | --- |
| `empty-text` | 没有数据时的引导文字，默认是「暂无数据」 |
| `error-message` | 请求失败的原因。传了以后显示成红色图标的错误状态 |
| `empty-actions` 插槽 | 放操作按钮，例如新增 |

- 上面的例子来自岗位管理页，按有没有搜索条件显示两句不同的话。
- 表格还在加载时不显示空状态。

## 在其他地方用 {#standalone}

图表和卡片这类区域没有数据时，直接用 `ArtEmptyState`。

```vue
<ArtEmptyState
  icon="ri:line-chart-line"
  title="近 30 天还没有调用记录"
  description="AI 应用、助手被调用后，这里按天显示 Token 用量"
  size="compact"
>
  <template #actions>
    <ElButton type="primary">去创建</ElButton>
  </template>
</ArtEmptyState>
```

```ts
import ArtEmptyState from '@/components/core/others/art-empty-state/index.vue'
```

| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `icon` | Iconify 图标名 | `ri:inbox-2-line` |
| `title` | 标题，可以不传 | 空 |
| `description` | 一句引导 | 空 |
| `size` | `page` 用在列表和整块区域，`compact` 用在图表和卡片里 | `page` |
| `error` | 错误状态，图标变红 | `false` |

- 按钮放在 `actions` 插槽里。
- 图标 40px，标题 17px，说明 13px。`compact` 下图标 32px，标题 15px。
- 例子里的文字直接写了中文。正式的页面要用 `$t` 取词条。

## 下一步

<div class="ms-cards">

- [表单校验](/pc/form-validation) 必填和格式提示怎么写。
- [UI 自检](/pc/ui-check) 提交前在本地跑一遍自动检查。

</div>
