# 空状态

管理台里「没有数据」的地方统一用一个空状态组件 `ArtEmptyState`：图标 + 一句标题或引导 + 可选的主操作按钮。视觉与地图页的「底图未配置」空状态一致（40px 主色图标、标题、13px 说明、按钮间距 12px）。

## 用在哪里

- **所有列表（ArtTable）**：没有数据时显示图标和引导文案，例如岗位管理「还没有岗位。点「新增岗位」添加一个」；没传引导文案的页面显示「暂无数据」。请求失败时图标变红，显示错误原因。
- **AI 运维 → 账单记录**：近 7 / 30 天没有调用时，图表区不再只剩一条横轴和「Tokens」字样，而是显示「近 N 天还没有调用记录」和说明。亮色、暗色下一样。

## 开发新页面

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

| 属性 | 说明 | 默认 |
| --- | --- | --- |
| `icon` | Iconify 图标名 | `ri:inbox-2-line` |
| `title` | 标题，可省略 | — |
| `description` | 一句引导 | — |
| `size` | `page`（列表、整块区域）或 `compact`（图表、卡片内） | `page` |
| `error` | 错误态，图标变红 | `false` |

列表页给 ArtTable 传 `empty-text` 即可；需要主操作按钮时用 ArtTable 的 `empty-actions` 插槽。
