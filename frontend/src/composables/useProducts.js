import { ref, computed } from 'vue'
import { apiGet } from '../services/api'

export function useApi(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetch = async () => {
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
    fetch
  }
}

export function useProducts() {
  const { data: products, loading, error, fetch } = useApi('/api/products')
  const { data: categories, fetch: fetchCategories } = useApi('/api/categories')

  const getProductById = async (id) => {
    try {
      return await apiGet(`/api/products/${id}`)
    } catch (err) {
      console.error('Error fetching product:', err)
      throw err
    }
  }

  const init = async () => {
    await fetch()
    await fetchCategories()
  }

  return {
    products,
    categories,
    loading,
    error,
    getProductById,
    init
  }
}
