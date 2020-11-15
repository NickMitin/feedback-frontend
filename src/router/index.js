import Vue from 'vue'
import Router from 'vue-router'
import Ping from '@/components/Ping'
import Feedback from '@/components/Feedback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Feedback
    },
    {
      path: '/',
      name: 'Ping',
      component: Ping
    }
  ],
  mode: 'history'
})
