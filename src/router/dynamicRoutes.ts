import type { RouteLocationNormalized } from "vue-router";
import SomePage from "@/views/SomePage.vue";
import { useMainStore } from "@/stores/main";
import router from "@/router";

let waitFetch: Promise<void> | null = null
let resolve = () => {}
let reject = () => {}

export function fetchDynamicRoutes () {
  if (waitFetch) {
    return
  }

  const mainStore = useMainStore()

  waitFetch = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  mainStore.fetchRoutes().then(resolve).catch(reject)
}

export async function addDynamicRoutes (
  to: RouteLocationNormalized
): Promise<string | undefined> {
  await waitFetch

  const route = useMainStore().routes?.find(route => {
    return route.path === to.path
  })

  if (!route) {
    return
  }

  router.addRoute({
    path: route.path,
    component: SomePage
  })

  return to.fullPath
}
