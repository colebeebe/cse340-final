import db from '../db.js';

export const getCurrentUserReview = async (user_id, game_id) => {
  const query = `
    SELECT
      oa_users.username,
      oa_roles.role_name,
      oa_reviews.star_rating,
      oa_reviews.comment,
      oa_reviews.created_at,
      oa_reviews.updated_at
    FROM oa_reviews
    JOIN oa_users
    ON oa_users.id = oa_reviews.user_id
    JOIN oa_roles
    ON oa_roles.id = oa_reviews.user_role_id
    WHERE
      oa_reviews.user_id = $1
    AND
      oa_reviews.game_id = $2;
  `;

  const response = await db.query(query, [user_id, game_id]);
  return response.rows[0];
};

export const getCriticReviews = async (game_id) => {
  const query = `
    SELECT
      oa_users.username,
      oa_roles.role_name,
      oa_reviews.star_rating,
      oa_reviews.comment,
      oa_reviews.created_at,
      oa_reviews.updated_at
    FROM oa_reviews
    JOIN oa_users
    ON oa_users.id = oa_reviews.user_id
    JOIN oa_roles
    ON oa_roles.id = oa_reviews.user_role_id
    WHERE
      oa_reviews.game_id = $1
    AND
      oa_reviews.user_role_id = 2
    ORDER BY oa_reviews.created_at DESC
    LIMIT 5;
  `;

  const response = await db.query(query, [game_id]);
  return response.rows;
};

export const getVerifiedReviews = async (game_id) => {
  const query = `
    SELECT
      oa_users.username,
      oa_roles.role_name,
      oa_reviews.star_rating,
      oa_reviews.comment,
      oa_reviews.created_at,
      oa_reviews.updated_at
    FROM oa_reviews
    JOIN oa_users
    ON oa_users.id = oa_reviews.user_id
    JOIN oa_roles
    ON oa_roles.id = oa_reviews.user_role_id
    WHERE
      oa_reviews.game_id = $1
    AND
      oa_reviews.user_role_id = 3
    ORDER BY oa_reviews.created_at DESC
    LIMIT 5;
  `;

  const response = await db.query(query, [game_id]);
  return response.rows;
};

export const getUserReviews = async (game_id) => {
  const query = `
    SELECT
      oa_users.username,
      oa_roles.role_name,
      oa_reviews.star_rating,
      oa_reviews.comment,
      oa_reviews.created_at,
      oa_reviews.updated_at
    FROM oa_reviews
    JOIN oa_users
    ON oa_users.id = oa_reviews.user_id
    JOIN oa_roles
    ON oa_roles.id = oa_reviews.user_role_id
    WHERE
      oa_reviews.game_id = $1
    AND
      oa_reviews.user_role_id = 4
    ORDER BY oa_reviews.created_at DESC
    LIMIT 10;
  `;

  const response = await db.query(query, [game_id]);
  return response.rows;
};

export const getStarRatings = async (game_id) => {
  const query = `
    SELECT
      user_role_id AS role_id,
      AVG(star_rating)
    FROM oa_reviews
    WHERE
      user_role_id IN (2, 3, 4)
    AND
      game_id = $1
    GROUP BY role_id
    ORDER BY role_id;
  `;

  const response = await db.query(query, [game_id]);

  const averages = {};

  response.rows.forEach((row) => {
    averages[row.role_id] = Number(row.avg);
  });

  return averages;
};
