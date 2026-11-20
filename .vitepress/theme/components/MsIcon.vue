<script setup lang="ts">
import { computed } from 'vue'
import { icons } from './icons'

const props = withDefaults(defineProps<{ name: string; size?: number | string }>(), { size: 20 })
const body = computed(() => icons[props.name] ?? icons.grid)
</script>

<template>
  <svg
    class="ms-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="body"
  />
</template>

<style scoped>
.ms-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
