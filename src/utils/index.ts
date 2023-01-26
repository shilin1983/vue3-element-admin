const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

const setCssVar = (prop: string, val: any): void => {
  document.documentElement.style.setProperty(prop, val)
}

export { humpToUnderline, setCssVar }
