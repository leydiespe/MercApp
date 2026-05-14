<template>
  <div id="app" class="app">
    <header class="header">
      <div class="container">
        <h1 class="logo">MercApp</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">Catálogo</router-link>
          <router-link to="/about" class="nav-link">Acerca de</router-link>
        </nav>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 MercApp. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.8rem;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b983;
}

.main {
  flex: 1;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  width: 100%;
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
    gap: 1rem;
  }

  .nav {
    gap: 1rem;
  }

  .logo {
    font-size: 1.5rem;
  }
}
</style>
