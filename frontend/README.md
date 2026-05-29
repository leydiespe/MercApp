# MercApp Frontend

Frontend SPA con Vue 3 para el catálogo de productos MercApp.

## Requisitos

- Node.js 18 o superior
- Backend MercApp ejecutándose en `http://localhost:3000`

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Estructura

```
src/
├── assets/          # Estilos globales
├── components/      # Componentes reutilizables
│   └── ProductCard.vue
├── composables/     # Composables (useProducts, useApi)
│   └── useProducts.js
├── router/          # Configuración de Vue Router
│   └── index.js
├── services/        # Servicios API
│   └── api.js
├── views/           # Vistas de la aplicación
│   ├── Home.vue
│   ├── ProductDetail.vue
│   └── NotFound.vue
├── App.vue
└── main.js
```

## Características

- Bootstrap con Vite + Vue 3
- Router con rutas dinámicas
- Listado de productos con búsqueda y filtro
- Vista de detalle de producto
- Componente ProductCard reutilizable
- Capa de API centralizada con useApi y useProducts
- Manejo de estados de carga y error

## Persistencia y despliegue

- `VITE_API_URL` apunta al API de Railway en producción
- En desarrollo usa `http://localhost:3000` como valor por defecto
- El build final debe publicarse en Netlify
