import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    component: () => import("@/views/login/loginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/login/registerPage.vue"),
  },
  {
    path: "/user",
    component: () => import("@/views/user/userPage.vue"),
  },
  {
    path: "/my",
    component: () => import("@/views/my/indexPage.vue"),
  },
  {
    path: "/repay",
    component: () => import("@/views/repay/indexPage.vue"),
  },
  {
    path: "/takeLoan",
    component: () => import("@/views/takeLoan/indexPage.vue"),
  },
  {
    path: "/risk",
    component: () => import("@/views/risk/indexPage.vue"),
  },
  {
    path: "/AIchat",
    component: () => import("@/views/AIchat/index.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
