<template>
  <div class="home">
    <div class="hero">
      <div>
        <p class="eyebrow">MercApp SPA</p>
        <h1>Catálogo de Productos</h1>
        <p class="subtitle">Busca, filtra y añade productos al carrito mientras navegas por la API.</p>
      </div>

      <router-link to="/product/new" class="new-product-link">Nuevo producto</router-link>
    </div>

    <div v-if="loading" class="loading">Cargando productos...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>

    <div v-else class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por nombre o descripción..."
        class="search-input"
      />

      <select v-model="selectedCategory" class="category-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div v-if="filteredProducts.length === 0" class="no-products">
      No se encontraron productos.
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @click="goToProduct(product.id)"
        @added-to-cart="addToCart(product)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../composables/useProducts'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { products, categories, loading, error, init } = useProducts()
const { addItem } = useCart()

const searchQuery = ref('')
const selectedCategory = ref('')

const filteredProducts = computed(() => {
  if (!products.value) return []

  return products.value.filter(product => {
    const matchesSearch =
      !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value || product.categoryId === Number(selectedCategory.value)

    return matchesSearch && matchesCategory
  })
})

const goToProduct = (id) => {
  router.push(`/product/${id}`)
}

const addToCart = (product) => {
  addItem(product)
}

onMounted(async () => {
  await init()
})
</script>

<style scoped>
.home {
  width: 100%;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 1.75rem;
  padding: 1.25rem 1.25rem 1rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.72));
  border: 1px solid rgba(210, 219, 231, 0.9);
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.06);
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #42b983;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.8rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.4rem;
}

.subtitle {
  color: #5d6d7e;
  max-width: 60ch;
  line-height: 1.6;
}

.new-product-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: #2c3e50;
  color: white;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 10px 24px rgba(44, 62, 80, 0.2);
}

.loading,
.error,
.no-products {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
  background: #fadbd8;
  border-radius: 4px;
}

.no-products {
  color: #7f8c8d;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-input,
.category-select {
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.category-select {
  min-width: 180px;
}

.search-input:focus,
.category-select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

@media (max-width: 860px) {
  .hero {
    align-items: start;
    flex-direction: column;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .search-input,
  .category-select {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    border-radius: 18px;
  }

  .new-product-link {
    width: 100%;
  }
}
</style>
