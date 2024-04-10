import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface DynamicRoute {
  path: string
  label: string
}

export const useMainStore = defineStore('counter', () => {
  const routes = ref<DynamicRoute[]|null>(null)

  async function fetchRoutes(): Promise<void> {
    await new Promise(res => setTimeout(res, 3000))

    routes.value = [{
      path: '/111',
      label: 'Page 111',
    }, {
      path: '/222',
      label: 'Page 222',
    }]
  }

  return {
    routes,
    fetchRoutes
  }
})
