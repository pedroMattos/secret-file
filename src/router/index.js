import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login/LoginPage.vue";
import HomePage from "../views/Home/HomePage.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
