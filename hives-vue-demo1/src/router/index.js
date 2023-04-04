import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import NotificationsView from "../views/NotificationsView.vue";
import ExploreView from "../views/ExploreView.vue";
import ForyouView from "../views/ForyouView.vue";
import FollowingView from "../views/FollowingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'homeviwe',
      component: HomeView,
      children:[
        {
          path:'/explore',
          name:'ExploreView',
          component:ExploreView
        },
        {
          path:'/notifications',
          name:'NotificationsView',
          component:NotificationsView,
        },
        {
          path:'/foryou',
          name:'ForyouView',
          component:ForyouView,
        },
        {
          path:'/following',
          name:'FollowingView',
          component:FollowingView,
        }
      ]
    },
  ]
})

export default router
