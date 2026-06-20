import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupDatabase = async () => {
  let hasData = false;
  try {
    const result = await db.query(
      'SELECT EXISTS (SELECT 1 FROM oa_roles LIMIT 1) as has_data',
    );
    hasData = result.rows[0]?.has_data || false;
  } catch {
    hasData = false;
  }

  const queryPath = path.join(__dirname, 'sql', 'query.sql');
  if (fs.existsSync(queryPath)) {
    const querySQL = fs.readFileSync(queryPath, 'utf8');
    if (querySQL.trim()) {
      await db.query(practiceSQL);
      console.log('Query from query.sql run');
    }
  }

  if (hasData) {
    console.log('Database already seeded');
    return true;
  }

  console.log('Seeding database...');
  const seedPath = path.join(__dirname, 'sql', 'seed.sql');
  const seedSQL = fs.readFileSync(seedPath, 'utf8');
  await db.query(seedSQL);
};

export const testConnection = async () => {
  const result = await db.query('SELECT NOW() as current_time');
  console.log('Database connection successful:', result.rows[0].current_time);
  return true;
};
