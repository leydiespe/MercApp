# MercApp API

API REST para el catalogo de productos de MercApp.

## Requisitos

- Node.js 18 o superior
- Una base de datos MongoDB Atlas y la variable `MONGODB_URI`

## Instalacion

```bash
npm install
npm start
```

## Variables de entorno

- `PORT`: puerto de escucha del backend, opcional en Railway
- `MONGODB_URI`: cadena `mongodb+srv://...` de Atlas
- `MONGODB_DB`: nombre de la base de datos, por defecto `mercapp`
- `FRONTEND_URL`: origen permitido del frontend en producción
- `NETLIFY_URL`: origen alterno permitido para el despliegue en Netlify

## Salud y CORS

- `GET /health` para verificación rápida de disponibilidad
- CORS se limita a `FRONTEND_URL` y `NETLIFY_URL` cuando están definidos

## Endpoints

- `GET /api/health`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`

## Modelo de datos

### Product
- `id`
- `name`
- `description`
- `price`
- `imageUrl`
- `categoryId`
- `stock`

### Category
- `id`
- `name`
