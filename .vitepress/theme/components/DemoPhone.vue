<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter, page } = useData()
const collapsed = ref(false)

const demoPath = computed(() => {
  const raw = frontmatter.value.demo
  if (typeof raw !== 'string' || !raw.trim()) return ''
  return raw.trim().replace(/^\//, '')
})

const show = computed(() => Boolean(demoPath.value))

/** HBuilderX web export lives under public/demo/; hash maps to uni-app x page path. */
const iframeSrc = computed(() => {
  if (!demoPath.value) return ''
  return `${withBase('/demo/index.html')}#/${demoPath.value}`
})

watch(
  () => page.value.relativePath,
  () => {
    collapsed.value = false
  },
)
</script>

<template>
  <ClientOnly>
    <aside
      v-if="show"
      class="ms-demo-phone"
      :class="{ 'ms-demo-phone--collapsed': collapsed }"
      aria-label="组件 H5 演示"
    >
      <div class="ms-demo-phone__chrome">
        <span class="ms-demo-phone__title">H5 预览</span>
        <div class="ms-demo-phone__actions">
          <a
            class="ms-demo-phone__open"
            :href="iframeSrc"
            target="_blank"
            rel="noopener noreferrer"
            title="新窗口打开"
          >↗</a>
          <button
            type="button"
            class="ms-demo-phone__toggle"
            :aria-expanded="(!collapsed).toString()"
            @click="collapsed = !collapsed"
          >
            {{ collapsed ? '展开' : '收起' }}
          </button>
        </div>
      </div>
      <div v-show="!collapsed" class="ms-demo-phone__bezel">
        <iframe
          class="ms-demo-phone__frame"
          :src="iframeSrc"
          :title="`演示 ${demoPath}`"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </aside>
  </ClientOnly>
</template>
