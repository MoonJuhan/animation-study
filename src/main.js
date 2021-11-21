import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'

import '@fortawesome/fontawesome-free/js/all.js'
require('@/assets/styles/index.scss')

const boot = async () => {
  const app = createApp(App)
  app.use(store).use(router)

  Object.values(plugins).forEach(app.use)

  //   const result = await import('./global-components')
  //   result.default(app)

  app.mount('#app')
}

boot()
