interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_PATH: string
  readonly VITE_OUT_DIR: string
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
