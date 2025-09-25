import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/main/main.vue';
import Result from '../pages/result/result.vue';
import Stats from '../pages/stats/index.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/result',
    name: 'result',
    component: Result,
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
