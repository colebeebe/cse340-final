import db from '../db.js';

export const postGameChanges = async (data) => {
  const query = `
    UPDATE oa_games
    SET
      title = $2,
      description = $3,
      cover_image = $4,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1;
  `;

  const params = [data.id, data.title, data.description, data.imageUrl];

  const response = await db.query(query, params);
  return response.rows[0];
};
