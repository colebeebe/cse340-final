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

export const getLatestReviews = async () => {
  const query = `
    SELECT oa_games.*
    FROM oa_games
    JOIN (
      SELECT
        game_id,
        MAX(created_at) AS latest_review
      FROM oa_reviews
      WHERE user_role_id = 2
      GROUP BY game_id
    ) latest
    ON oa_games.id = latest.game_id
    ORDER BY latest.latest_review DESC
    LIMIT 5;
  `;

  const response = await db.query(query);
  return response.rows;
};
