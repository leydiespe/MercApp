<template>
  <section class="cart-view">
    <header class="cart-header">
      <div>
        <p class="eyebrow">Carrito en memoria</p>
        <h1>Tu carrito</h1>
      </div>

      <button class="clear-button" type="button" :disabled="items.length === 0" @click="clearCart">
        Vaciar carrito
      </button>
    </header>

    <div v-if="items.length === 0" class="empty-state">
      <p>No hay productos en el carrito.</p>
      <router-link to="/" class="primary-link">Volver al catálogo</router-link>
    </div>

    <div v-else class="cart-layout">
      <div class="cart-items">
        <article v-for="item in items" :key="item.product.id" class="cart-item">
          <img :src="item.product.imageUrl" :alt="item.product.name" class="thumb" />
          <div class="info">
            <h2>{{ item.product.name }}</h2>
            <p>{{ item.product.description }}</p>
            <router-link :to="`/product/${item.product.id}`" class="secondary-link">Ver detalle</router-link>
          </div>

          <div class="controls">
            <div class="qty-controls">
              <button type="button" @click="decreaseQuantity(item.product.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button type="button" @click="increaseQuantity(item.product.id)">+</button>
            </div>

            <strong>${{ (item.quantity * item.product.price).toFixed(2) }}</strong>
            <button class="remove-button" type="button" @click="removeItem(item.product.id)">
              Quitar
            </button>
          </div>
        </article>
      </div>

      <aside class="summary">
        <h2>Resumen</h2>
        <p>Productos: {{ totalItems }}</p>
        <p>Total: <strong>${{ totalPrice.toFixed(2) }}</strong></p>
        <p class="note">Persistencia automática en localStorage.</p>

        <button
          type="button"
          class="pay-button"
          :disabled="items.length === 0"
          @click="handlePay"
        >
          Pagar
        </button>
      </aside>
    </div>

    <div v-if="showPayModal" class="modal-backdrop" @click.self="closePayModal">
      <div class="modal">
        <p class="eyebrow">Confirmar pago</p>
        <h2>¿Deseas finalizar la compra?</h2>
        <p class="modal-text">
          Se cobrará un total de <strong>${{ totalPrice.toFixed(2) }}</strong> y el carrito se vaciará.
        </p>

        <div class="modal-actions">
          <button type="button" class="secondary-button" @click="closePayModal">Cancelar</button>
          <button type="button" class="pay-button modal-pay-button" @click="confirmPay">Pagar ahora</button>
        </div>
      </div>
    </div>

    <div v-if="showSuccessModal" class="modal-backdrop" @click.self="closeSuccessModal">
      <div class="modal">
        <p class="eyebrow">Pago realizado</p>
        <h2>Tu compra se procesó correctamente</h2>
        <p class="modal-text">El carrito fue vaciado y ya puedes seguir navegando por el catálogo.</p>

        <div class="modal-actions">
          <button type="button" class="secondary-button" @click="closeSuccessModal">Cerrar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { items, totalItems, totalPrice, clearCart, increaseQuantity, decreaseQuantity, removeItem } = useCart()

const showPayModal = ref(false)
const showSuccessModal = ref(false)

function handlePay() {
  showPayModal.value = true
}

function closePayModal() {
  showPayModal.value = false
}

function confirmPay() {
  showPayModal.value = false
  clearCart()
  showSuccessModal.value = true
}

function closeSuccessModal() {
  showSuccessModal.value = false
  router.push('/')
}
</script>

<style scoped>
.cart-view {
  display: grid;
  gap: 1.5rem;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #42b983;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
}

h1 {
  margin: 0;
  color: #2c3e50;
}

.clear-button,
.primary-link,
.secondary-link,
.remove-button {
  border: none;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.2s ease;
}

.clear-button,
.remove-button {
  background: #e74c3c;
  color: white;
  padding: 0.7rem 1rem;
}

.clear-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  min-height: 50vh;
  display: grid;
  place-items: center;
  gap: 1rem;
  text-align: center;
  color: #5d6d7e;
}

.primary-link,
.secondary-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1rem;
}

.primary-link {
  background: #2c3e50;
  color: white;
}

.secondary-link {
  background: #eef4ff;
  color: #1f4aa8;
  margin-top: 0.5rem;
}

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 1.5rem;
}

.cart-items {
  display: grid;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e8eb;
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
}

.thumb {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
}

.info h2 {
  margin: 0 0 0.4rem;
  color: #2c3e50;
}

.info p {
  margin: 0;
  color: #5d6d7e;
  line-height: 1.5;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.75rem;
  white-space: nowrap;
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #f5f7fa;
  padding: 0.35rem;
  border-radius: 999px;
}

.qty-controls button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #2c3e50;
  color: white;
  font-weight: 700;
}

.summary {
  align-self: start;
  padding: 1.25rem;
  background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
  border-radius: 20px;
  border: 1px solid #dbe5ff;
  position: sticky;
  top: 1rem;
}

.summary h2 {
  margin-top: 0;
  color: #2c3e50;
}

.note {
  color: #5d6d7e;
  font-size: 0.92rem;
}

.pay-button {
  margin-top: 1rem;
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 0.9rem 1rem;
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
  color: white;
  font-weight: 800;
  font-size: 1rem;
}

.pay-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.secondary-button {
  border: 1px solid #d6dde4;
  border-radius: 999px;
  background: white;
  color: #2c3e50;
  padding: 0.9rem 1rem;
  font-weight: 800;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 50;
}

.modal {
  width: min(100%, 480px);
  background: white;
  border-radius: 28px;
  padding: 1.5rem;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.25);
}

.modal h2 {
  margin: 0 0 0.75rem;
  color: #2c3e50;
}

.modal-text {
  color: #5d6d7e;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.modal-pay-button {
  width: auto;
  margin-top: 0;
}

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .summary {
    position: static;
  }

  .cart-item {
    grid-template-columns: 96px 1fr auto;
  }

  .thumb {
    width: 96px;
    height: 96px;
  }
}

@media (max-width: 700px) {
  .cart-item {
    grid-template-columns: 1fr;
  }

  .cart-header {
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  .controls {
    align-items: start;
  }

  .thumb {
    width: 100%;
    height: 200px;
  }

  .cart-item {
    padding: 0.9rem;
  }

  .qty-controls {
    width: 100%;
    justify-content: space-between;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-pay-button,
  .secondary-button {
    width: 100%;
  }
}
</style>