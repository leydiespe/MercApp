import { ref, computed } from 'vue'
import { apiGet } from '../services/api'

export function useApi(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await apiGet(url)
    } catch (err) {
      error.value = err.message
      // Reintento simple (1 vez)
      try {
        data.value = await apiGet(url)
        error.value = null
      } catch (retryErr) {
        error.value = retryErr.message
      }
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchData
  }
}

export function useProducts() {
  const productsApi = useApi('/api/products')
  const categoriesApi = useApi('/api/categories')

  const getProductById = async (id) => {
    try {
      return await apiGet(`/api/products/${id}`)
    } catch (err) {
      console.error('Error fetching product:', err)
      throw err
    }
  }

  const init = async () => {
    await Promise.all([productsApi.fetchData(), categoriesApi.fetchData()])
  }

  const loading = computed(() => productsApi.loading.value || categoriesApi.loading.value)
  const error = computed(() => productsApi.error.value || categoriesApi.error.value)

  return {
    products: productsApi.data,
    categories: categoriesApi.data,
    loading,
    error,
    loadProducts: productsApi.fetchData,
    loadCategories: categoriesApi.fetchData,
    getProductById,
    init
  }
}
