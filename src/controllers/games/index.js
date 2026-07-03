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
 *
 */
export const editGame = async (req, res) => {
  const id = req.params.id;
  const game = await getGameById(id);
  res.render(`games/edit`, {
    title: `${game.title} | Edit`,
    game,
  });
};
