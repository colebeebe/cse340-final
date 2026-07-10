import { Router } from 'express';

import { homePage } from './index.js';

import accountRoutes from './account/account.js';
import gameRoutes from './games/games.js';
import loginRoutes, { processLogout } from './forms/login.js';
import registrationRoutes from './forms/register.js';
import searchRoutes from './search.js';

const router = Router();

router.get('/', homePage);
router.get('/logout', processLogout);

router.use('/account', accountRoutes);
router.use('/games', gameRoutes);
router.use('/search', searchRoutes);
router.use('/login', loginRoutes);
router.use('/register', registrationRoutes);

export default router;
