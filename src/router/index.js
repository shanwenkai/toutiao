import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import secondHome from '@/views/home/second-home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: secondHome
      },
      {
        path: 'comment',
        component: () => import('@/views/comment')
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      },
      {
        path: 'articles',
        component: () => import('@/views/articles')
      },
      // 发布文章
      {
        path: 'publish',
        component: () => import('@/views/publish')
      }
    ]

  },
  {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router
