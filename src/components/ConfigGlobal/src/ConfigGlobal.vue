<template>
  <ElConfigProvider
    :locale="currentLocale.elLocale"
    :message="{ max: 1 }"
    :namespace="variables.elNamespace"
    :size="size"
  >
    <slot></slot>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { setCssVar } from '@/utils'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useDesign } from '@/hooks/useDesign'
import { useLocaleStoreWithOut } from '@/store/modules/locale'

const props = defineProps({
  size: propTypes.oneOf<ElementPlusSize>(['default', 'small', 'large']).def('default')
})

const { variables } = useDesign()

const appStore = useAppStoreWithOut()

const localeStore = useLocaleStoreWithOut()

const currentLocale = computed(() => localeStore.currentLocale)

const { width } = useWindowSize()

provide('configGlobal', props)

onMounted(() => {
  appStore.setCssVarTheme()
})

watch(
  () => width.value,
  (width: number) => {
    if (width < 768) {
      !appStore.getMobile ? appStore.setMobile(true) : undefined
      setCssVar('--left-menu-min-width', '0')
      appStore.setCollapse(true)
      appStore.getLayout !== 'classic' ? appStore.setLayout('classic') : undefined
    } else {
      appStore.getMobile ? appStore.setMobile(false) : undefined
      setCssVar('--left-menu-min-width', '64px')
    }
  },
  {
    immediate: true
  }
)
</script>
