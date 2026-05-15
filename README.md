# MercApp

Aplicación web tipo SPA para catálogo de productos, desarrollada con Vue 3 y un API REST propia para la Unidad 3 de Programación del lado del cliente.

## Datos del estudiante

- Nombre: Leydi Espe
- Proyecto: MercApp
- Repositorio: https://github.com/leydiespe/MercApp.git

## Funcionalidades implementadas

- API REST con productos y categorías
- Persistencia en JSON y semilla de datos
- Frontend SPA con Vue 3 + Vite
- Vue Router con rutas principales y dinámica por id
- Listado con buscador y filtro por categoría
- Vista de detalle de producto
- Componente reutilizable `ProductCard`
- Composables para consumo del API
- Carrito simple en memoria con persistencia en `localStorage`
- Formulario de creación, edición y eliminación de productos
- Lazy loading de vistas y fallback con `Suspense`
- Manejo de estados de carga y error

## Estructura

- `backend/` API REST con Express
- `frontend/` SPA con Vue 3

## Instalación y uso

### Backend

```bash
cd backend
npm install
npm run seed
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Rutas principales

- `/` catálogo
- `/product/:id` detalle
- `/product/new` crear producto
- `/product/:id/edit` editar producto
- `/cart` carrito
- `/about` información del proyecto
