import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const testConnection = async () => {
  const result = await db.query('SELECT NOW() as current_time');
  console.log('Database connection successful:', result.rows[0].current_time);
  return true;
};
