import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Catálogo de Productos' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: 'Detalle de Producto' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'Acerca de' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'No Encontrado' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
