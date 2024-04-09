import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface CmsRoute {
  path: string
  label: string
}

export const useMainStore = defineStore('counter', () => {
  const routes = ref<CmsRoute[]|null>(null)

  async function fetchRoutes(): Promise<void> {
    console.log(1111)
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
