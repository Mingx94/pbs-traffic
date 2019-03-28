import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/freeway',
      name: 'freeway',
      component: () =>
        import(/* webpackChunkName: "freeway" */ './views/Freeway.vue'),
    },
    {
      path: '/non-freeway',
      name: 'non-freeway',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "non-freeway" */ './views/NonFreeway.vue'),
    },
  ],
});
