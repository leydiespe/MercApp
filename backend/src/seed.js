import { writeDb } from './storage.js';
import { defaultState } from './seedData.js';

await writeDb(defaultState);
console.log('Seed completado: categorias y productos cargados.');
