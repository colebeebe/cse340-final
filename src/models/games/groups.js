import db from '../db.js';

export const getRecentlyAdded = async () => {
  const query = `
    SELECT * FROM oa_games
    ORDER BY created_at DESC
    LIMIT 5;
  `;

  const response = await db.query(query);
  return response.rows;
};

export const getNewReleases = async () => {
  const query = `
    SELECT * FROM oa_games
    ORDER BY release_date DESC
    LIMIT 5;
  `;

  const response = await db.query(query);
  return response.rows;
};
