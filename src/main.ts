import '@/assets/styles/index.less'
import '@/plugins/animate'
import '@/plugins/svgIcon'
import '@/plugins/windicss'
import App from './App.vue'
import { createApp } from 'vue'
import { setupI18n } from '@/plugins/vueI18n'
import { setupRouter, router } from '@/router'
import { setupStore } from '@/store'

const bootstrap = async () => {
  // 创建实例
  const app = createApp(App)

  // 注册多语言
  await setupI18n(app)

  // 注册状态管理
  setupStore(app)

  // 注册路由
  setupRouter(app)

  await router.isReady().then(() => app.mount('#app'))
}

void bootstrap()
