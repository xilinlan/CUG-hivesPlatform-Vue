import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotificationsView from "../views/NotificationsView.vue";
import ExploreView from "../views/ExploreView.vue";
import FollowingView from "../views/FollowingView.vue";
import ProfileView from "../views/ProfileView.vue";
import RepliesView from "../views/RepliesView.vue";
import MediaView from "../views/MediaView.vue";
import LikesView from "../views/LikesView.vue";
import LoginPage from "../views/LoginPage.vue";
import MessageView from "../views/MessageView.vue";
import OtherProfileView from "../views/OtherProfileView.vue";
import FriendsView from "../views/FriendsView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path:'/chat',
      name:'chat',
      component:() => import('../views/ChatView.vue')
    },
    {
      path:'/chat2',
      name:'chat2',
      component:() => import('../views/Chat.vue')
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
      path: '/home',
      name: 'homeview',
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
          path:'/following',
          name:'FollowingView',
          component:FollowingView,
        },
        {
          path:'/profile',
          name:'ProfileView',
          component:ProfileView,
          children:[
            {
              path:'/replies',
              name:'RepliesView',
              component:RepliesView,
            },
            {
              path:'/media',
              name:'MediaView',
              component:MediaView,
            },
            {
              path:'/likes',
              name:'LikesView',
              component:LikesView,
            },
          ]
        },
        {
          path:'/message',
          name:'MessageView',
          component:MessageView,
        },
        {
          path:'/other-profile',
          name:'OtherProfileView',
          component:OtherProfileView,
        },
        {
          path:'/friends',
          name:'FriendsView',
          component:FriendsView,
        }
      ]
    },
  ]
})

export default router
