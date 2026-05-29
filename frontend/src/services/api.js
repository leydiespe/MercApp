const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {})
    },
    ...options
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await response.json() : null

  if (!response.ok) {
    const message = body?.message || `API error: ${response.status}`
    const details = Array.isArray(body?.errors) ? body.errors.join(' ') : ''
    throw new Error(details ? `${message} ${details}` : message)
  }

  return body
}

export function apiGet(endpoint) {
  return request(endpoint)
}

export function apiPost(endpoint, data) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function apiPut(endpoint, data) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function apiDelete(endpoint) {
  return request(endpoint, {
    method: 'DELETE'
  })
}

export const api = {
  getCategories() {
    return apiGet('/api/categories')
  },

  getProducts() {
    return apiGet('/api/products')
  },

  getProduct(id) {
    return apiGet(`/api/products/${id}`)
  },

  createProduct(data) {
    return apiPost('/api/products', data)
  },

  updateProduct(id, data) {
    return apiPut(`/api/products/${id}`, data)
  },

  deleteProduct(id) {
    return apiDelete(`/api/products/${id}`)
  }
}
