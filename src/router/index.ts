import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import {addDynamicRoutes, fetchDynamicRoutes} from "@/router/dynamicRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/NoFoundPage.vue')
      // первый вариант, хук идёт после beforeEach
      // beforeEnter: [addDynamicRoutes]
    }
  ]
})

router.beforeEach(async (to) => {
  fetchDynamicRoutes()

  // второй вариант, вся логика в одном месте
  if (to.name === '404') {
    return await addDynamicRoutes(to)
  }
})

export default router
