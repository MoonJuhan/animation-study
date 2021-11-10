const routesBasic = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'view-home' */ '../components/views/ViewHome.vue'),
  },
  {
    path: '/lottie',
    component: () => import(/* webpackChunkName: 'view-lottie' */ '../components/views/ViewLottie.vue'),
  },
  {
    path: '/animejs',
    component: () => import(/* webpackChunkName: 'view-animejs' */ '../components/views/ViewAnimejs.vue'),
  },
  {
    path: '/gsap',
    component: () => import(/* webpackChunkName: 'view-gsap' */ '../components/views/ViewGsap.vue'),
  },
  {
    path: '/mojs',
    component: () => import(/* webpackChunkName: 'view-mojs' */ '../components/views/ViewMojs.vue'),
  },
]

const routesAsync = [...routesBasic].map((o) => o)

export default routesAsync
