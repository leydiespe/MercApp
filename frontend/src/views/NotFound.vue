<template>
  <div class="not-found">
    <div class="error-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe.</p>
      <router-link to="/" class="back-link">
        Volver al catálogo
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-container {
  text-align: center;
}

h1 {
  font-size: 5rem;
  color: #e74c3c;
  margin: 0;
  line-height: 1;
}

h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0.5rem 0 1rem 0;
}

p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  color: white;
  background: #42b983;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.back-link:hover {
  background: #2c8659;
}
</style>
