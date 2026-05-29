import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initializeDb, readDb, writeDb } from './storage.js';

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validateProductPayload(payload, categories, isPatch = false) {
  const errors = [];
  const allowedFields = ['name', 'description', 'price', 'imageUrl', 'categoryId', 'stock'];
  const keys = Object.keys(payload ?? {});

  if (!isPatch) {
    for (const field of allowedFields) {
      if (payload[field] === undefined || payload[field] === null || payload[field] === '') {
        errors.push(`El campo ${field} es obligatorio.`);
      }
    }
  }

  if (keys.some((key) => !allowedFields.includes(key))) {
    errors.push('El payload contiene campos no permitidos.');
  }

  if (payload.name !== undefined && typeof payload.name !== 'string') {
    errors.push('name debe ser texto.');
  }

  if (payload.description !== undefined && typeof payload.description !== 'string') {
    errors.push('description debe ser texto.');
  }

  if (payload.price !== undefined) {
    const price = Number(payload.price);
    if (!Number.isFinite(price) || price <= 0) {
      errors.push('price debe ser un numero mayor a 0.');
    }
  }

  if (payload.imageUrl !== undefined && (typeof payload.imageUrl !== 'string' || !isValidUrl(payload.imageUrl))) {
    errors.push('imageUrl debe ser una URL valida.');
  }

  if (payload.categoryId !== undefined) {
    const categoryId = Number(payload.categoryId);
    if (!Number.isInteger(categoryId) || !categories.some((category) => category.id === categoryId)) {
      errors.push('categoryId debe ser una categoria valida.');
    }
  }

  if (payload.stock !== undefined) {
    const stock = Number(payload.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      errors.push('stock debe ser un entero mayor o igual a 0.');
    }
  }

  return errors;
}

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'MercApp API funcionando' });
});

app.get('/api/categories', async (_req, res, next) => {
  try {
    const db = await readDb();
    res.json(db.categories);
  } catch (error) {
    next(error);
  }
});

app.get('/api/products', async (_req, res, next) => {
  try {
    const db = await readDb();
    res.json(db.products);
  } catch (error) {
    next(error);
  }
});

app.get('/api/products/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const db = await readDb();
    const product = db.products.find((item) => item.id === id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.post('/api/products', async (req, res, next) => {
  try {
    const db = await readDb();
    const errors = validateProductPayload(req.body, db.categories, false);

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Datos invalidos.', errors });
    }

    const product = {
      id: nextId(db.products),
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl.trim(),
      categoryId: Number(req.body.categoryId),
      stock: Number(req.body.stock)
    };

    db.products.push(product);
    await writeDb(db);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

app.put('/api/products/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const db = await readDb();
    const index = db.products.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const errors = validateProductPayload(req.body, db.categories, false);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Datos invalidos.', errors });
    }

    const updatedProduct = {
      id,
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl.trim(),
      categoryId: Number(req.body.categoryId),
      stock: Number(req.body.stock)
    };

    db.products[index] = updatedProduct;
    await writeDb(db);

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/products/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const db = await readDb();
    const index = db.products.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const errors = validateProductPayload(req.body, db.categories, true);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Datos invalidos.', errors });
    }

    const current = db.products[index];
    const updatedProduct = {
      ...current,
      ...(req.body.name !== undefined ? { name: String(req.body.name).trim() } : {}),
      ...(req.body.description !== undefined ? { description: String(req.body.description).trim() } : {}),
      ...(req.body.price !== undefined ? { price: Number(req.body.price) } : {}),
      ...(req.body.imageUrl !== undefined ? { imageUrl: String(req.body.imageUrl).trim() } : {}),
      ...(req.body.categoryId !== undefined ? { categoryId: Number(req.body.categoryId) } : {}),
      ...(req.body.stock !== undefined ? { stock: Number(req.body.stock) } : {})
    };

    db.products[index] = updatedProduct;
    await writeDb(db);

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/products/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const db = await readDb();
    const index = db.products.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const [deletedProduct] = db.products.splice(index, 1);
    await writeDb(db);

    res.json({ message: 'Producto eliminado correctamente.', product: deletedProduct });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

async function startServer() {
  try {
    await initializeDb();

    app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      console.log(`Servidor corriendo en ${baseUrl}`);
      console.log(`API REST disponible en ${baseUrl}/api`);
      console.log(process.env.MONGODB_URI ? 'Persistencia MongoDB conectada correctamente' : 'Persistencia local conectada correctamente');
    });
  } catch (error) {
    console.error('No fue posible iniciar la persistencia local');
    console.error(error);
    process.exit(1);
  }
}

startServer();
