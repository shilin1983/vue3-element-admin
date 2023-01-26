import { defineStore } from 'pinia'
import { humpToUnderline, setCssVar } from '@/utils'
import { store } from '@/store'
import { useCache } from '@/hooks/useCache'

const { wsCache } = useCache()

interface AppState {
  collapse: boolean
  currentSize: ElementPlusSize
  isDark: boolean
  layout: LayoutType
  mobile: boolean
  theme: ThemeTypes
}

const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      collapse: false,
      currentSize: wsCache.get('currentSize') || 'default',
      isDark: wsCache.get('isDark') || false,
      layout: wsCache.get('layout') || 'classic',
      mobile: false,
      theme: wsCache.get('theme') || {
        elColorPrimary: 'var(--el-color-primary)',
        leftMenuBgActiveColor: 'var(--el-color-primary)',
        leftMenuBgColor: 'var(--left-menu-bg-color)',
        leftMenuBgLightColor: 'var(--left-menu-bg-light-color)',
        leftMenuBorderColor: 'inherit',
        leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
        leftMenuTextActiveColor: 'var(--left-menu-text-active-color)',
        leftMenuTextColor: 'var(--left-menu-text-color)',
        logoBorderColor: 'inherit',
        logoTitleTextColor: 'var(--logo-title-text-color)',
        topHeaderBgColor: 'var(--top-header-bg-color)',
        topHeaderHoverColor: 'var(--top-header-hover-color)',
        topHeaderTextColor: 'inherit',
        topToolBorderColor: 'var(--top-tool-border-color)'
      }
    }
  },
  getters: {
    getCollapse(): boolean {
      return this.collapse
    },
    getCurrentSize(): ElementPlusSize {
      return this.currentSize
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getMobile(): boolean {
      return this.mobile
    },
    getLayout(): LayoutType {
      return this.layout
    }
  },
  actions: {
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setCurrentSize(currentSize: ElementPlusSize) {
      this.currentSize = currentSize
      wsCache.set('currentSize', this.currentSize)
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      wsCache.set('isDark', this.isDark)
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其他布局')
        return
      }
      this.layout = layout
      wsCache.set('layout', this.layout)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    }
  }
})

const useAppStoreWithOut = () => {
  return useAppStore(store)
}

export { useAppStoreWithOut }
