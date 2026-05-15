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

        <div class="actions">
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

          <router-link :to="`/product/${product.id}/edit`" class="btn-edit">
            Editar producto
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="not-found">Producto no encontrado.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCart } from '../composables/useCart'

const route = useRoute()
const product = ref(null)
const loading = ref(false)
const error = ref(null)
const { categories, loadCategories, getProductById } = useProducts()
const { addItem } = useCart()

const loadProduct = async () => {
  loading.value = true
  error.value = null
  try {
    const id = Number(route.params.id)
    product.value = await getProductById(id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getCategoryName = (categoryId) => {
  if (!categories.value) return 'Cargando categoría...'
  const cat = categories.value.find(c => c.id === categoryId)
  return cat ? cat.name : 'Categoría desconocida'
}

const addToCart = () => {
  addItem(product.value)
}

onMounted(async () => {
  await loadCategories()
  await loadProduct()
})
</script>

<style scoped>
.product-detail {
  width: 100%;
}

.product-detail,
.not-found {
  max-width: 1200px;
  margin-inline: auto;
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
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(210, 219, 231, 0.9);
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.detail-image {
  width: 100%;
}

.detail-image img {
  width: 100%;
  height: auto;
  border-radius: 18px;
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

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.actions > * {
  flex: 1 1 220px;
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

.btn-edit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 999px;
  background: #eaf2ff;
  color: #1f4aa8;
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 768px) {
  .detail-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
    border-radius: 20px;
  }

  .actions {
    flex-direction: column;
  }

  .price {
    font-size: 1.7rem;
  }
}

@media (max-width: 520px) {
  .pricing {
    flex-direction: column;
    align-items: start;
    gap: 0.8rem;
  }

  .btn-add-cart,
  .btn-edit {
    width: 100%;
  }
}
</style>
