<template>
  <section class="product-form">
    <router-link to="/" class="back-link">&larr; Volver</router-link>

    <div class="form-shell">
      <header>
        <p class="eyebrow">{{ isEditMode ? 'Editar producto' : 'Crear producto' }}</p>
        <h1>{{ isEditMode ? 'Editar producto' : 'Nuevo producto' }}</h1>
      </header>

      <form class="form" @submit.prevent="handleSubmit">
        <label>
          <span>Nombre</span>
          <input v-model.trim="form.name" type="text" placeholder="Nombre del producto" />
        </label>

        <label>
          <span>Descripción</span>
          <textarea v-model.trim="form.description" rows="4" placeholder="Descripción del producto"></textarea>
        </label>

        <div class="grid">
          <label>
            <span>Precio</span>
            <input v-model="form.price" type="number" min="0.01" step="0.01" />
          </label>

          <label>
            <span>Stock</span>
            <input v-model="form.stock" type="number" min="0" step="1" />
          </label>
        </div>

        <label>
          <span>Categoría</span>
          <select v-model="form.categoryId">
            <option value="">Selecciona una categoría</option>
            <option v-for="category in categories" :key="category.id" :value="String(category.id)">
              {{ category.name }}
            </option>
          </select>
        </label>

        <label>
          <span>URL de imagen</span>
          <input v-model.trim="form.imageUrl" type="url" placeholder="https://..." />
        </label>

        <div v-if="errors.length" class="error-box">
          <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
        </div>

        <div class="actions">
          <button type="submit" class="save-button" :disabled="saving">
            {{ saving ? 'Guardando...' : isEditMode ? 'Actualizar producto' : 'Crear producto' }}
          </button>

          <button v-if="isEditMode" type="button" class="delete-button" :disabled="saving" @click="handleDelete">
            Eliminar producto
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../services/api'
import { useProducts } from '../composables/useProducts'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.name === 'ProductEdit')
const productId = computed(() => Number(route.params.id))

const { categories, loadCategories, getProductById } = useProducts()

const form = reactive({
  name: '',
  description: '',
  price: '',
  stock: '',
  categoryId: '',
  imageUrl: ''
})

const errors = ref([])
const saving = ref(false)

function validateForm() {
  const validationErrors = []

  if (!form.name) validationErrors.push('El nombre es obligatorio.')
  if (!form.description) validationErrors.push('La descripción es obligatoria.')

  const price = Number(form.price)
  if (!Number.isFinite(price) || price <= 0) validationErrors.push('El precio debe ser mayor a 0.')

  const stock = Number(form.stock)
  if (!Number.isInteger(stock) || stock < 0) validationErrors.push('El stock debe ser un entero mayor o igual a 0.')

  if (!form.categoryId) validationErrors.push('La categoría es obligatoria.')

  try {
    new URL(form.imageUrl)
  } catch {
    validationErrors.push('La URL de la imagen no es válida.')
  }

  return validationErrors
}

function mapToPayload() {
  return {
    name: form.name,
    description: form.description,
    price: Number(form.price),
    stock: Number(form.stock),
    categoryId: Number(form.categoryId),
    imageUrl: form.imageUrl
  }
}

async function loadProduct() {
  if (!isEditMode.value) {
    return
  }

  const product = await getProductById(productId.value)
  form.name = product.name
  form.description = product.description
  form.price = String(product.price)
  form.stock = String(product.stock)
  form.categoryId = String(product.categoryId)
  form.imageUrl = product.imageUrl
}

async function handleSubmit() {
  errors.value = validateForm()
  if (errors.value.length > 0) {
    return
  }

  saving.value = true
  try {
    const payload = mapToPayload()
    if (isEditMode.value) {
      await api.updateProduct(productId.value, payload)
      await router.push(`/product/${productId.value}`)
    } else {
      const created = await api.createProduct(payload)
      await router.push(`/product/${created.id}`)
    }
  } catch (error) {
    errors.value = [error.message]
  } finally {
    saving.value = false
  }
}

async function handleDelete() {
  const confirmed = window.confirm('¿Seguro que deseas eliminar este producto?')
  if (!confirmed) {
    return
  }

  saving.value = true
  try {
    await api.deleteProduct(productId.value)
    await router.push('/')
  } catch (error) {
    errors.value = [error.message]
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadCategories()
  await loadProduct()
})
</script>

<style scoped>
.product-form {
  display: grid;
  gap: 1rem;
}

.back-link {
  color: #42b983;
  text-decoration: none;
  font-weight: 700;
}

.form-shell {
  max-width: 760px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e5e8eb;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #42b983;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  font-weight: 800;
}

h1 {
  margin: 0 0 1.2rem;
  color: #2c3e50;
}

.form {
  display: grid;
  gap: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.45rem;
  color: #2c3e50;
  font-weight: 600;
}

input,
textarea,
select {
  width: 100%;
  border: 1px solid #d6dde4;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 1rem;
}

input:focus,
textarea:focus,
select:focus {
  outline: 2px solid rgba(66, 185, 131, 0.18);
  border-color: #42b983;
}

.error-box {
  padding: 1rem;
  border-radius: 12px;
  background: #fff3f2;
  color: #c0392b;
}

.error-box p {
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.actions > * {
  flex: 1 1 220px;
}

.save-button,
.delete-button {
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.2rem;
  font-weight: 700;
}

.save-button {
  background: #42b983;
  color: white;
}

.delete-button {
  background: #e74c3c;
  color: white;
}

@media (max-width: 680px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .form-shell {
    padding: 1rem;
  }

  .actions {
    flex-direction: column;
  }

  .save-button,
  .delete-button {
    width: 100%;
  }
}
</style>