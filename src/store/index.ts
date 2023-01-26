import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

const setupStore = (app: App<Element>): void => {
  app.use(store)
}

export { store, setupStore }
