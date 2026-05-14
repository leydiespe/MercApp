import { readFile, writeFile, mkdir } from 'node:fs/promises';
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
