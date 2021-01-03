/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import ThreeMap from '@/components/ThreeMap.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Layout from '@/components/Layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ThreeMap',
      component: Layout
    },
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
