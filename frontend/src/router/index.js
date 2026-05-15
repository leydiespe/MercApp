import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductForm from '../views/ProductForm.vue'

const About = () => import('../views/About.vue')
const Cart = () => import('../views/Cart.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Catálogo de Productos' }
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductForm,
    meta: { title: 'Nuevo producto' }
  },
  {
    path: '/product/:id/edit',
    name: 'ProductEdit',
    component: ProductForm,
    meta: { title: 'Editar producto' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: 'Detalle de Producto' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Carrito' }
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

router.afterEach((to) => {
  document.title = `${to.meta.title || 'MercApp'} | MercApp`
})

export default router
