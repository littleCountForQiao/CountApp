import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Welcome from '@/components/welcome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'notfound',
      redirect: { name: 'welcome' }
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    }
  ]
})
