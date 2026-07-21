import { Router } from 'express';

import {
  homePage,
  homePageStyle,
  aboutPage,
  dashboardPage,
  deleteReview,
} from './index.js';

import accountRoutes from './account/account.js';
import gameRoutes from './games/games.js';
import loginRoutes, { processLogout } from './forms/login.js';
import registrationRoutes from './forms/register.js';
import searchRoutes from './search.js';
import userRoutes from './users/users.js';

import { requireLogin, requireRole } from '../middleware/auth.js';

const router = Router();

router.use('/about', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/about.css" />');
  next();
});

router.use('/dashboard', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/dashboard.css" />');
  next();
});

router.get('/', homePageStyle, homePage);

router.get('/about', aboutPage);
router.get('/dashboard', requireRole(['admin']), dashboardPage);

router.get('/logout', processLogout);

router.use('/account', requireLogin, accountRoutes);
router.use('/games', gameRoutes);
router.use('/search', searchRoutes);
router.use('/login', loginRoutes);
router.use('/register', registrationRoutes);
router.use('/users', requireRole(['admin']), userRoutes);

router.post('/review/delete/:gameid/:userid', requireLogin, deleteReview);

export default router;
