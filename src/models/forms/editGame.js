import db from '../db.js';

export const postGameChanges = async (data) => {
  const query = `
    UPDATE oa_games
    SET
      title = $2,
      description = $3,
      release_date = $4,
      cover_image = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1;
  `;

  const params = [
    data.id,
    data.title,
    data.description,
    data.releaseDate,
    data.imageUrl,
  ];

  const response = await db.query(query, params);
  return response.rows[0];
};

export const postNewGame = async (data) => {
  const query = `
    INSERT INTO oa_games
    (title, description, release_date, cover_image)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const params = [
    data.title,
    data.description,
    data.releaseDate,
    data.coverImage,
  ];

  const response = await db.query(query, params);
  return response.rows[0];
};
