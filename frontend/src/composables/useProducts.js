import { ref, computed } from 'vue'
import { api } from '../services/api'

export function useApi(fetcher) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (err) {
      error.value = err.message
      // Reintento simple (1 vez)
      try {
        data.value = await fetcher()
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
  const productsApi = useApi(() => api.getProducts())
  const categoriesApi = useApi(() => api.getCategories())

  const getProductById = async (id) => {
    try {
      return await api.getProduct(id)
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
