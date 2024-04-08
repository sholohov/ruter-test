import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import SomePage from "@/views/SomePage.vue";

interface CmsRoute {
  path: string
  label: string
}

async function fetchRoutes(): Promise<CmsRoute[]> {
  await new Promise(res => setTimeout(res, 3000))

  return [{
    path: '/111',
    label: 'Page 111',
  }]
}

let routes: CmsRoute[] | null = null

router.beforeResolve(async (to) => {
  if (to.name === '404') {
    if (!routes) {
      routes = await fetchRoutes()
    }

    const route = routes.find(route => {
      return route.path === to.path
    })

    if (route) {
      router.addRoute({
        path: route.path,
        component: SomePage
      })

      return to
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
