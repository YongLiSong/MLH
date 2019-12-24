import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Comingsoon from '@/views/Comingsoon'
import Detail from '@/views/Detail'
import List from '@/views/List'
import Login from '@/views/Login'
import ShoppingCar from '@/views/ShoppingCar'
import SearchList from '@/views/SearchList'
import Center from '@/views/Center'
import Newgoods from '@/views/Newgoods'

import Crossborder from '@/views/Index/Crossborder'
import Cosmetics from '@/views/Index/Cosmetics'
import Kids from '@/views/Index/Kids'
import Men from '@/views/Index/Men'
import Women from '@/views/Index/Women'
import Lifestyle from '@/views/Index/Lifestyle'
import tuijian from '@/views/Index/tuijian'
import Qingcang from '@/views/Qingcang'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: 'tuijian',
        component: tuijian
      },
      {
        path: 'crossborder',
        component: Crossborder
      },
      {
        path: 'cosmetics',
        component: Cosmetics
      },
      {
        path: 'kids',
        component: Kids
      },
      {
        path: 'lifestyle',
        component: Lifestyle
      },
      {
        path: 'men',
        component: Men
      },
      {
        path: 'women',
        component: Women
      },
      {
        path: '/index',
        redirect: '/index/tuijian'
      }
    ]
  },
  {
    path: '/comingsoon',
    component: Comingsoon
  },
  {
    path: '/detail/:glsCode',
    component: Detail
  },
  {
    path: '/list/:eventId',
    component: List
  },
  {
    path: '/comingsoon',
    component: Comingsoon
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shoppingcar',
    component: ShoppingCar
  },
  {
    path: '/searchlist/:goodsname',
    component: SearchList
  },
  {
    path: '/qingcang',
    component: Qingcang
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/newgoods',
    component: Newgoods
  },
  {
    path: '*',
    redirect: '/index'
  }
]

const router = new VueRouter({
  routes
})

export default router
