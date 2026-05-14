<template>
  <div class="product-card" @click="$emit('click')">
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
    </div>
  </div>
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
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
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
  padding: 1rem;
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
