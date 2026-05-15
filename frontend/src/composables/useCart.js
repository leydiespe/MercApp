import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'mercapp-cart'
const items = ref(loadCart())

function loadCart() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function persistCart(value) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

watch(
  items,
  (value) => {
    persistCart(value)
  },
  { deep: true }
)

const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
const totalPrice = computed(() =>
  items.value.reduce((sum, item) => sum + item.quantity * Number(item.product.price), 0)
)

function addItem(product) {
  const existingItem = items.value.find((item) => item.product.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
    return
  }

  items.value.push({ product, quantity: 1 })
}

function increaseQuantity(productId) {
  const item = items.value.find((entry) => entry.product.id === productId)
  if (item) {
    item.quantity += 1
  }
}

function decreaseQuantity(productId) {
  const item = items.value.find((entry) => entry.product.id === productId)
  if (!item) {
    return
  }

  if (item.quantity <= 1) {
    removeItem(productId)
    return
  }

  item.quantity -= 1
}

function removeItem(productId) {
  items.value = items.value.filter((entry) => entry.product.id !== productId)
}

function clearCart() {
  items.value = []
}

export function useCart() {
  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
  }
}