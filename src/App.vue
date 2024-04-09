<script setup lang="ts">
import {RouterLink, RouterView, useRouter} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {useMainStore} from "@/stores/main";
import SomePage from "@/views/SomePage.vue";

const router = useRouter()
const mainStore = useMainStore()

let waitFetchRoutes: Promise<void> | null = null
let resolve = () => {}
let reject = () => {}

router.beforeEach(async (to) => {
  if (!waitFetchRoutes) {
    waitFetchRoutes = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })

    mainStore.fetchRoutes().then(resolve).catch(reject)
  }

  if (to.name === '404') {
    await waitFetchRoutes

    const route = mainStore.routes?.find(route => {
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
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>

    <div class="wrapper">
      <HelloWorld msg="You did it!"/>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/111">111</RouterLink>
        <RouterLink to="/222">222</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
