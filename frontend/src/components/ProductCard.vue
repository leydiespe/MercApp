<template>
  <article class="product-card" @click="$emit('click')">
    <div class="card-image">
      <img :src="product.imageUrl" :alt="product.name" />
    </div>

    <div class="card-body">
      <h3>{{ product.name }}</h3>
      <p class="description">{{ truncateText(product.description, 60) }}</p>

      <div class="card-footer">
        <span class="price">${{ product.price.toFixed(2) }}</span>
        <span class="stock" :class="{ 'low-stock': product.stock < 5 }">
          {{ product.stock > 0 ? 'Disponible' : 'Sin stock' }}
        </span>
      </div>

      <div class="card-actions">
        <button type="button" class="detail-button" @click.stop="$emit('click')">
          Ver detalle
        </button>
        <button
          type="button"
          class="cart-button"
          :disabled="product.stock <= 0"
          @click.stop="$emit('added-to-cart', product)"
        >
          Añadir
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['click', 'added-to-cart'])

const truncateText = (text, length) => {
  return text.length > length ? text.slice(0, length) + '...' : text
}
</script>

<style scoped>
.product-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
  border-color: rgba(66, 185, 131, 0.45);
}

.card-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  padding: 1rem 1rem 1.1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.3;
}

.description {
  color: #7f8c8d;
  font-size: 0.85rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1rem;
}

.detail-button,
.cart-button {
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1rem;
  font-weight: 600;
  transition: transform 0.2s, background 0.2s, opacity 0.2s;
}

.detail-button {
  background: #eaf2ff;
  color: #1f4aa8;
}

.cart-button {
  background: #42b983;
  color: white;
}

.detail-button:hover,
.cart-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.cart-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 520px) {
  .card-actions {
    grid-template-columns: 1fr;
  }

  .card-footer {
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
  }
}

.price {
  font-weight: bold;
  color: #27ae60;
  font-size: 1.2rem;
}

.stock {
  font-size: 0.85rem;
  color: #f39c12;
  padding: 0.25rem 0.75rem;
  background: #fef5e7;
  border-radius: 4px;
}

.stock.low-stock {
  color: white;
  background: #e74c3c;
}
</style>
