import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { isLoggedIn, signIn } from '@/firebase'
import SignIn from "@/views/SignIn.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: SignIn,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    isLoggedIn().then((loggedIn) => {
      if (!loggedIn) {
        next('/login')
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
