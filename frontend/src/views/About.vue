<template>
  <div class="about">
    <h1>Acerca de MercApp</h1>

    <div class="about-content">
      <section>
        <h2>¿Qué es MercApp?</h2>
        <p>
          MercApp es una aplicación web moderna para explorar y gestionar un catálogo de productos.
          Desarrollada con Vue 3 y Composition API, proporciona una experiencia de usuario fluida y
          responsiva.
        </p>
      </section>

      <section>
        <h2>Tecnologías</h2>
        <ul>
          <li><strong>Frontend:</strong> Vue 3 (Composition API), Vue Router, Vite</li>
          <li><strong>Backend:</strong> Express.js, Node.js</li>
          <li><strong>Persistencia:</strong> JSON (local)</li>
        </ul>
      </section>

      <section>
        <h2>Características</h2>
        <ul>
          <li>Catálogo de productos con búsqueda y filtrado</li>
          <li>Vistas detalladas de cada producto</li>
          <li>Interfaz responsiva y moderna</li>
          <li>API REST completa</li>
        </ul>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>Para más información, visita nuestro repositorio en GitHub:</p>
        <a href="https://github.com/leydiespe/MercApp" target="_blank" class="github-link">
          github.com/leydiespe/MercApp
        </a>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

section {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

h2 {
  color: #2c3e50;
  margin-top: 0;
}

p {
  color: #555;
  line-height: 1.6;
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

li {
  color: #555;
  padding: 0.5rem 0;
}

li strong {
  color: #2c3e50;
}

.github-link {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.github-link:hover {
  color: #2c8659;
  text-decoration: underline;
}

@media (max-width: 640px) {
  section {
    padding: 1rem;
  }
}
</style>
