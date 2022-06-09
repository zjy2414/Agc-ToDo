import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import HomeLayout from '../layouts/HomeLayout.vue'
import Login from '../views/login/index.vue'
import LoginLayout from '../layouts/LoginLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/HomeLayout',
    name: 'HomeLayout',
    component: HomeLayout,
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页 - AGC待办事项'
        }
      }
    ]
  },
  {
    path: '/LoginLayout',
    name: 'LoginLayout',
    component: LoginLayout,
    children:[
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          title: '登录 - AGC待办事项'
        }
      },
      {
        path: '/login/normal',
        name: 'pwdLogin',
        component: () => import('../views/login/normal.vue'),
        meta: {
          title: '密码登录 - AGC待办事项'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/index.vue'),
        meta: {
          title: '注册 - AGC待办事项'
        }
      },
      {
        path: '/logout',
        name: 'logout',
        component: () => import('../views/logout/index.vue'),
        meta: {
          title: '注销中 - AGC待办事项'
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
