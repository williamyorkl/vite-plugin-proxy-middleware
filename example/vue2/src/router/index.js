import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerMap = [
  {
    path:'/news',
    component: () => import('../components/News')
  }
]

export default new Router({
  scrollBehavior:() => ({
    y:0,
    x:0
  }),
  routes:routerMap
})