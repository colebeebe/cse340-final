import { getGameById } from '../../models/games/games.js';

/**
 * Get a game using an id
 *
 * @route GET /games/:id
 */
export const getGame = async (req, res) => {
  const id = req.params.id;
  const game = await getGameById(id);
  res.render(`games/info`, {
    title: `${game.title} | Oasis Games`,
    game,
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
