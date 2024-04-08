<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SomePage from '@/views/SomePage.vue';

const router = useRouter()

const data = reactive({
  routes: [] as { path: string, label: string }[]
})

async function fetchRoutes () {
  await new Promise(res => setTimeout(res, 500))

  return [{
    path: '/111',
    label: 'Cтраница',
  }]
}

async function init () {
  const routes = await fetchRoutes()

  const currentUrl = location.pathname

  const route = routes.find(route => route.path === currentUrl)

  if (route) {
    data.routes.push(route)

    router.addRoute({
      path: route.path,
      component: SomePage
    })

    await router.replace(currentUrl)
  }
}

init()

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink
          v-for="item in data.routes"
          :to="item.path"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
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
