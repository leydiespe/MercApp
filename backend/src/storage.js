import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';
import { defaultState } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'db.json');

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB || 'mercapp';

let mongoClientPromise;

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dataFile, 'utf8');
  } catch {
    await writeFile(dataFile, JSON.stringify(defaultState, null, 2), 'utf8');
  }
}

function isMongoEnabled() {
  return Boolean(mongoUri);
}

async function getMongoClient() {
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

  if (categories.length === 0 && products.length === 0 && defaultState.categories.length > 0) {
    await writeMongoDb(defaultState);
    return defaultState;
  }

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

async function readFileDb() {
  await ensureDataFile();
  const raw = await readFile(dataFile, 'utf8');
  return JSON.parse(raw);
}

async function writeFileDb(state) {
  await ensureDataFile();
  await writeFile(dataFile, JSON.stringify(state, null, 2), 'utf8');
}

export async function readDb() {
  if (isMongoEnabled()) {
    return readMongoDb();
  }

  return readFileDb();
}

export async function writeDb(state) {
  if (isMongoEnabled()) {
    return writeMongoDb(state);
  }

  return writeFileDb(state);
}

export async function initializeDb() {
  if (isMongoEnabled()) {
    await readMongoDb();
    return;
  }

  await ensureDataFile();
}import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'db.json');

const defaultState = {
  categories: [],
  products: []
};

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dataFile, 'utf8');
  } catch {
    await writeFile(dataFile, JSON.stringify(defaultState, null, 2), 'utf8');
  }
}

export async function readDb() {
  await ensureDataFile();
  const raw = await readFile(dataFile, 'utf8');
  return JSON.parse(raw);
}

export async function writeDb(state) {
  await ensureDataFile();
  await writeFile(dataFile, JSON.stringify(state, null, 2), 'utf8');
}
