import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
