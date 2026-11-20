<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

interface Client {
  name: string
  note: string
  via: string
}

interface Box {
  name: string
  note: string
  optional?: boolean
}

interface Copy {
  label: string
  optional: string
  clients: Client[]
  boot: Box
  modules: Box[]
  stores: Box[]
}

// Keep both languages here so the two architecture pages cannot drift apart.
const copy: Record<'zh' | 'en', Copy> = {
  zh: {
    label:
      '结构图：管理后台、业务页面和第三方系统通过 HTTP 访问 mugsun-boot，数据保存在 PostgreSQL 和 Redis 里',
    optional: '可选',
    clients: [
      { name: '管理后台', note: 'mugsun-pc', via: '/api' },
      { name: '你的业务页面', note: '@mugsun/track-web', via: '/track/collect' },
      { name: '第三方系统', note: 'OAuth2 或 API Key', via: '开放接口' },
    ],
    boot: { name: 'mugsun-boot', note: '一个可执行 JAR' },
    modules: [
      { name: 'core', note: '账号权限、租户和工作流' },
      { name: 'track', note: '埋点分析', optional: true },
      { name: 'gis', note: '地图和空间查询', optional: true },
      { name: 'ai', note: '模型和知识库', optional: true },
    ],
    stores: [
      { name: 'PostgreSQL 16', note: '业务库和埋点库，带 PostGIS 和 pgvector' },
      { name: 'Redis 7', note: '会话和缓存' },
    ],
  },
  en: {
    label:
      'Diagram: the admin console, your product pages and third-party systems call mugsun-boot over HTTP; data lives in PostgreSQL and Redis',
    optional: 'optional',
    clients: [
      { name: 'Admin console', note: 'mugsun-pc', via: '/api' },
      { name: 'Your product pages', note: '@mugsun/track-web', via: '/track/collect' },
      { name: 'Third-party systems', note: 'OAuth2 or API key', via: 'Open API' },
    ],
    boot: { name: 'mugsun-boot', note: 'one executable JAR' },
    modules: [
      { name: 'core', note: 'Accounts, permissions, tenants and workflow' },
      { name: 'track', note: 'Product analytics', optional: true },
      { name: 'gis', note: 'Maps and spatial queries', optional: true },
      { name: 'ai', note: 'Models and knowledge bases', optional: true },
    ],
    stores: [
      { name: 'PostgreSQL 16', note: 'Business and analytics databases, with PostGIS and pgvector' },
      { name: 'Redis 7', note: 'Sessions and cache' },
    ],
  },
}

const { lang } = useData()
const t = computed(() => (lang.value.toLowerCase().startsWith('en') ? copy.en : copy.zh))
</script>

<template>
  <div class="ms-arch" role="img" :aria-label="t.label">
    <div class="ms-arch__row ms-arch__row--clients">
      <div v-for="c in t.clients" :key="c.name" class="ms-arch__node">
        <span class="ms-arch__name">{{ c.name }}</span>
        <span class="ms-arch__note">{{ c.note }}</span>
        <span class="ms-arch__via">{{ c.via }}</span>
      </div>
    </div>

    <div class="ms-arch__wires" aria-hidden="true">
      <div v-for="c in t.clients" :key="c.name" class="ms-arch__wire">
        <span>{{ c.via }}</span>
      </div>
    </div>
    <div class="ms-arch__wire ms-arch__wire--single" aria-hidden="true"></div>

    <div class="ms-arch__boot">
      <div class="ms-arch__boot-head">
        <strong>{{ t.boot.name }}</strong>
        <span>{{ t.boot.note }}</span>
      </div>
      <div class="ms-arch__row ms-arch__row--modules">
        <div
          v-for="m in t.modules"
          :key="m.name"
          class="ms-arch__node"
          :class="{ 'is-optional': m.optional }"
        >
          <span class="ms-arch__name">
            {{ m.name }}
            <span v-if="m.optional" class="ms-arch__tag">{{ t.optional }}</span>
          </span>
          <span class="ms-arch__note">{{ m.note }}</span>
        </div>
      </div>
    </div>

    <div class="ms-arch__wires ms-arch__wires--stores" aria-hidden="true">
      <div v-for="s in t.stores" :key="s.name" class="ms-arch__wire"></div>
    </div>
    <div class="ms-arch__wire ms-arch__wire--single" aria-hidden="true"></div>

    <div class="ms-arch__row ms-arch__row--stores">
      <div v-for="s in t.stores" :key="s.name" class="ms-arch__node">
        <span class="ms-arch__name">{{ s.name }}</span>
        <span class="ms-arch__note">{{ s.note }}</span>
      </div>
    </div>
  </div>
</template>
