<template>
  <ConfigGlobal :size="currentSize">
    <RouterView />
  </ConfigGlobal>
</template>

<script setup lang="ts">
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/useCache'

const { wsCache } = useCache()
const appStore = useAppStoreWithOut()

const currentSize = computed(() => appStore.getCurrentSize)

const setDefaultTheme = () => {
  if (wsCache.get('isDark')) {
    appStore.setIsDark(wsCache.get('isDark'))
    return
  }
  appStore.setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
}

setDefaultTheme()
</script>

<style lang="less">
.size {
  height: 100%;
  width: 100%;
}

html,
body {
  .size;
  margin: 0;
  overflow: hidden;
  padding: 0 !important;

  #app {
    .size;
  }
}
</style>
