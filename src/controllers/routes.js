import { Router } from 'express';

import { homePage } from './index.js';
import { requireLogin } from '../middleware/auth.js';

import loginRoutes, { processLogout, showAccount } from './forms/login.js';
import registrationRoutes from './forms/register.js';
import searchRoutes from './search.js';

const router = Router();

router.get('/', homePage);
router.get('/account', requireLogin, showAccount);
router.get('/logout', processLogout);

router.use('/search', searchRoutes);
router.use('/login', loginRoutes);
router.use('/register', registrationRoutes);

export default router;
