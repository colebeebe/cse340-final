import { Router } from 'express';
import { getGameById } from '../../models/games/games.js';

const router = Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const game = await getGameById(id);
  res.render('game', {
    title: 'Game',
    game,
  });
});

export default router;
