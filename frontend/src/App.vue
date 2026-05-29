<template>
  <div id="app" class="app">
    <header class="header">
      <div class="container">
        <router-link to="/" class="logo">MercApp</router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link">Catálogo</router-link>
          <router-link to="/cart" class="nav-link nav-cart">
            Carrito
            <span class="badge">{{ totalItems }}</span>
          </router-link>
          <router-link to="/product/new" class="nav-link">Nuevo</router-link>
        </nav>
      </div>
    </header>

    <main class="main">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <div class="route-loading">Cargando vista...</div>
        </template>
      </Suspense>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 MercApp. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useCart } from './composables/useCart'

const { totalItems } = useCart()
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(66, 185, 131, 0.08), transparent 28%),
    radial-gradient(circle at bottom right, rgba(44, 62, 80, 0.06), transparent 24%),
    #f4f7fb;
}

.header {
  background: rgba(44, 62, 80, 0.92);
  color: white;
  padding: 1rem 0;
  backdrop-filter: blur(14px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 20;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.logo {
  margin: 0;
  font-size: 1.8rem;
  color: white;
  text-decoration: none;
  font-weight: 800;
}

.nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-cart {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.badge {
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #42b983;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b983;
}

.main {
  flex: 1;
  max-width: 1240px;
  margin: 1.5rem auto;
  padding: 0 1.25rem 2rem;
  width: 100%;
}

.route-loading {
  min-height: 45vh;
  display: grid;
  place-items: center;
  color: #5d6d7e;
  font-weight: 700;
}

.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: 2rem;
}

.footer p {
  margin: 0;
}

@media (max-width: 640px) {
  .container {
    flex-direction: column;
    align-items: stretch;
    gap: 0.85rem;
  }

  .nav {
    justify-content: center;
    gap: 0.65rem;
  }

  .logo {
    font-size: 1.5rem;
    text-align: center;
  }

  .nav-link {
    padding: 0.45rem 0.7rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
  }

  .main {
    margin-top: 1rem;
    padding-inline: 0.9rem;
  }
}
</style>
