type LocaleType = 'zh-CN' | 'en'

interface Language {
  el: Recordable
  name: string
}

interface LocaleDropdownType {
  lang: LocaleType
  name?: string
  elLocale?: Language
}
