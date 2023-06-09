import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login/LoginPage.vue";
import HomePage from "../views/Home/HomePage.vue";
import UserPage from "../views/User/UserPage.vue";
import Signin from "../views/Signin/SigninPage.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/user",
    name: "user",
    component: UserPage,
  },
  {
    path: "/new-user",
    name: "newUser",
    component: Signin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
