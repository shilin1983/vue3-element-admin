type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

type ElementPlusSize = 'default' | 'small' | 'large'

type LayoutType = 'classic' | 'topLeft' | 'top'

type ThemeTypes = {
  elColorPrimary?: string
  leftMenuBgActiveColor?: string
  leftMenuBgColor?: string
  leftMenuBgLightColor?: string
  leftMenuBorderColor?: string
  leftMenuCollapseBgActiveColor?: string
  leftMenuTextActiveColor?: string
  leftMenuTextColor?: string
  logoBorderColor?: string
  logoTitleTextColor?: string
  topHeaderBgColor?: string
  topHeaderHoverColor?: string
  topHeaderTextColor?: string
  topToolBorderColor?: string
}
