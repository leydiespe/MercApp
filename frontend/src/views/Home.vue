<template>
  <div class="home">
    <h1>Catálogo de Productos</h1>

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
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../composables/useProducts'

const router = useRouter()
const { products, categories, loading, error, init } = useProducts()

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

onMounted(async () => {
  await init()
})
</script>

<style scoped>
.home {
  width: 100%;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
