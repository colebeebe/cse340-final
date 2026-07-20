import db from '../db.js';

export const postNewReview = async (review) => {
  const query = `
    INSERT INTO oa_reviews
    (user_id, game_id, user_role_id, star_rating, comment)
    VALUES
    ($1, $2, $3, $4, $5);
  `;

  const params = [
    review.user_id,
    review.game_id,
    review.user_role_id,
    review.star_rating,
    review.comment,
  ];

  const response = await db.query(query, params);
  return response.rows;
};
