# MercApp API

API REST para el catalogo de productos de MercApp.

## Requisitos

- Node.js 18 o superior

## Instalacion

```bash
npm install
npm run seed
npm start
```

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
