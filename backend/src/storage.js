import 'dotenv/config';
import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB || 'mercapp';

let mongoClientPromise;

async function getMongoClient() {
  if (!mongoUri) {
    throw new Error('MONGODB_URI no esta configurada. Define la conexion de MongoDB Atlas para iniciar la API.');
  }

  if (!mongoClientPromise) {
    const client = new MongoClient(mongoUri);
    mongoClientPromise = client.connect();
  }

  return mongoClientPromise;
}

async function getMongoDatabase() {
  const client = await getMongoClient();
  return client.db(mongoDbName);
}

async function readMongoDb() {
  const db = await getMongoDatabase();
  const [categories, products] = await Promise.all([
    db.collection('categories').find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray(),
    db.collection('products').find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
  ]);

  return { categories, products };
}

async function writeMongoDb(state) {
  const db = await getMongoDatabase();
  const { categories = [], products = [] } = state ?? {};

  await Promise.all([
    db.collection('categories').deleteMany({}),
    db.collection('products').deleteMany({})
  ]);

  if (categories.length > 0) {
    await db.collection('categories').insertMany(categories);
  }

  if (products.length > 0) {
    await db.collection('products').insertMany(products);
  }
}

export async function readDb() {
  return readMongoDb();
}

export async function writeDb(state) {
  return writeMongoDb(state);
}

export async function initializeDb() {
  await getMongoDatabase();
}
