<template>
  <div class="product-detail">
    <router-link to="/" class="back-link">&larr; Volver al catálogo</router-link>

    <div v-if="loading" class="loading">Cargando producto...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <div v-else-if="product" class="detail-container">
      <div class="detail-image">
        <img :src="product.imageUrl" :alt="product.name" />
      </div>

      <div class="detail-info">
        <h1>{{ product.name }}</h1>

        <div class="category">
          {{ getCategoryName(product.categoryId) }}
        </div>

        <p class="description">{{ product.description }}</p>

        <div class="pricing">
          <span class="price">${{ product.price.toFixed(2) }}</span>
          <span class="stock" :class="{ 'low-stock': product.stock < 5 }">
            Stock: {{ product.stock }}
          </span>
        </div>

        <button
          v-if="product.stock > 0"
          @click="addToCart"
          class="btn-add-cart"
        >
          Añadir al carrito
        </button>
        <button v-else disabled class="btn-add-cart disabled">
          Sin stock
        </button>
      </div>
    </div>
    <div v-else class="not-found">Producto no encontrado.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'

const route = useRoute()
const product = ref(null)
const loading = ref(false)
const error = ref(null)
const { categories } = useProducts()

const loadProduct = async () => {
  loading.value = true
  error.value = null
  try {
    const { getProductById } = useProducts()
    const id = Number(route.params.id)
    product.value = await getProductById(id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getCategoryName = (categoryId) => {
  if (!categories.value) return ''
  const cat = categories.value.find(c => c.id === categoryId)
  return cat ? cat.name : 'Categoría desconocida'
}

const addToCart = () => {
  // Evento personalizado
  console.log('Producto añadido al carrito:', product.value)
  alert(`${product.value.name} añadido al carrito (función en fase 3)`)
}

onMounted(async () => {
  await loadProduct()
})
</script>

<style scoped>
.product-detail {
  width: 100%;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.back-link:hover {
  color: #2c3e50;
}

.loading,
.error,
.not-found {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
  background: #fadbd8;
  border-radius: 4px;
}

.not-found {
  color: #7f8c8d;
}

.detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.detail-image {
  width: 100%;
}

.detail-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.detail-info h1 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.category {
  color: #7f8c8d;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.description {
  color: #555;
  line-height: 1.6;
  margin: 1.5rem 0;
}

.pricing {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
  font-size: 1.2rem;
}

.price {
  font-size: 2rem;
  color: #27ae60;
  font-weight: bold;
}

.stock {
  color: #f39c12;
}

.stock.low-stock {
  color: #e74c3c;
  font-weight: bold;
}

.btn-add-cart {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-add-cart:hover:not(.disabled) {
  background: #2c8659;
}

.btn-add-cart.disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .detail-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
