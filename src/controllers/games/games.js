import { Router } from 'express';
import { editGame, getGame, reviewGame, createNewGame } from './index.js';
import { postGameChanges, postNewGame } from '../../models/forms/editGame.js';
import { postNewReview } from '../../models/forms/reviewGame.js';
import { requireLogin, requireRole } from '../../middleware/auth.js';

const router = Router();

router.use('/new', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/newGame.css" />');
  res.addScript('<script src="/js/newGame.js"></script>');
  next();
});

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

const submitEdits = async (req, res) => {
  const id = req.params.id;
  const data = {
    id,
    ...req.body,
  };
  await postGameChanges(data);
  res.redirect(`/games/${id}`);
};

const submitNewGame = async (req, res) => {
  const game = await postNewGame(req.body);
  res.redirect(`/games/${game.id}`);
};

const submitNewReview = async (req, res) => {
  const id = req.params.id;
  const review = {
    user_id: res.locals.user.id,
    game_id: id,
    user_role_id: res.locals.user.role_id,
    star_rating: req.body.starRating,
    comment: req.body.comment ?? null,
  };
  await postNewReview(review);
  res.redirect(`/games/${id}`);
};

router.get('/new', requireRole(['admin']), createNewGame);

router.get('/:id/edit', requireRole(['admin']), editGame);
router.get('/:id', getGame);
router.get('/:id/review', requireLogin, reviewGame);

router.post('/new', requireRole('admin'), submitNewGame);
router.post('/:id/edit', requireRole(['admin']), submitEdits);
router.post('/:id/review', requireLogin, submitNewReview);

export default router;
