import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/Index.vue'
import Standings from '../views/Standings.vue'
import Teams from '../views/Teams.vue'
import TeamDetails from '../views/TeamDetails.vue'
import Knockouts from '../views/Knockouts.vue'

const routes = [
  {
    path: '/',
    name: 'Principal',
    component: Index,
  },
  {
    path: '/standings',
    name: 'Clasificación',
    component: Standings,
  },
  {
    path: '/teams',
    name: 'Equipos',
    component: Teams,
  },
  {
    path: '/teams/:id',
    name: 'DetalleEquipo',
    component: TeamDetails,
  },
  {
    path: '/knockouts',
    name: 'Eliminación Directa',
    component: Knockouts,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
