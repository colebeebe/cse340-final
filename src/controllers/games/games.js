import { Router } from 'express';
import { editGame, getGame, reviewGame } from './index.js';

const router = Router();

router.use('/:id', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/gameInfo.css" />');
  next();
});

router.use('/:id/edit', (req, res, next) => {
  res.addScript('<script src="/js/editGame.js"></script>');
  next();
});

router.use('/:id/review', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/gameReview.css" />');
  res.addScript('<script src="/js/reviewGame.js"></script>');
  next();
});

router.get('/:id/edit', editGame);
router.get('/:id', getGame);
router.get('/:id/review', reviewGame);

export default router;
