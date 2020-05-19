import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// @ is an alias to /src
import HelloGetUserMedia from '@/components/HelloGetUserMedia.vue';
import HelloGetUserMediaCanvas from '@/components/HelloGetUserMediaCanvas.vue';
import HelloGetUserMediaCanvasFilter from '@/components/HelloGetUserMediaCanvasFilter.vue';
import HelloGetUserMediaResolution from '@/components/HelloGetUserMediaResolution.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/HelloGetUserMedia',
    name: 'HelloGetUserMedia',
    component: HelloGetUserMedia
  },
  {
    path: '/HelloGetUserMediaCanvas',
    name: 'HelloGetUserMediaCanvas',
    component: HelloGetUserMediaCanvas
  },
  {
    path: '/HelloGetUserMediaCanvasFilter',
    name: 'HelloGetUserMediaCanvasFilter',
    component: HelloGetUserMediaCanvasFilter
  },
  {
    path: '/HelloGetUserMediaResolution',
    name: 'HelloGetUserMediaResolution',
    component: HelloGetUserMediaResolution
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
