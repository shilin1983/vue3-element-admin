import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  strict: true,
  sensitive: true,
  history: createWebHistory(),
  routes: [] as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

const setupRouter = (app: App<Element>): void => {
  app.use(router)
}

export { router, setupRouter }
