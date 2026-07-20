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
