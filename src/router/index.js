import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import ConcursoView from '../views/ConcursoView.vue'
import RankingView from '../views/RankingView.vue'
export default createRouter({
 history: createWebHistory(),
 routes: [
  { path: '/', component: LandingView },
  { path: '/concurso', component: ConcursoView },
  { path: '/ranking', component: RankingView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
 ]
})
