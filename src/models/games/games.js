import db from '../db.js';

export const getGameById = async (id) => {
  const query = `
    SELECT * FROM oa_games
    WHERE id = $1
    LIMIT 1;
  `;

  const response = await db.query(query, [id]);
  return response.rows[0];
};
