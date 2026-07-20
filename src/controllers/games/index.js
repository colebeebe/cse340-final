import { getGameById } from '../../models/games/games.js';
import {
  getCurrentUserReview,
  getCriticReviews,
  getVerifiedReviews,
  getUserReviews,
  getStarRatings,
} from '../../models/reviews/reviews.js';

/**
 * Get a game using an id
 *
 * @route GET /games/:id
 */
export const getGame = async (req, res) => {
  const id = req.params.id;
  const game = await getGameById(id);
  const user_id = res.locals.user.id;

  const currentUserReview = await getCurrentUserReview(user_id, id);
  const criticReviews = await getCriticReviews(id);
  const verifiedReviews = await getVerifiedReviews(id);

  const starRatings = await getStarRatings(id);

  const userReviews = await getUserReviews(id);
  res.render(`games/info`, {
    title: `${game.title} | Oasis Games`,
    game,
    currentUserReview,
    criticReviews,
    verifiedReviews,
    userReviews,
    starRatings,
  });
};

/**
 * Edit a game's information
 *
 * @route GET /games/:id/edit
 */
export const editGame = async (req, res) => {
  const id = req.params.id;
  const game = await getGameById(id);
  res.render(`games/edit`, {
    title: `${game.title} | Edit`,
    game,
  });
};

/**
 * Create a review for a game
 *
 * @route GET /games/:id/review
 */
export const reviewGame = async (req, res) => {
  const id = req.params.id;
  const game = await getGameById(id);
  res.render('forms/review/form', {
    title: `${game.title} | Review`,
    game,
  });
};

/**
 * Create a game resource
 *
 * @route GET /games/new
 */
export const createNewGame = async (req, res) => {
  res.render('games/new', {
    title: 'New Game | Oasis Games',
  });
};
