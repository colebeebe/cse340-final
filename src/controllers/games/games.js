import { Router } from 'express';
import { getGameById } from '../../models/games/games.js';

const router = Router();

router.use('/', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/gameInfo.css" />');
  next();
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const game = await getGameById(id);
  res.render('game', {
    title: `${game.title} | Oasis Games`,
    game,
  });
});

export default router;
