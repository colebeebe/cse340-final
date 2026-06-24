import { Router } from 'express';

import { homePage } from './index.js';
import loginRoutes, { processLogout, showAccount } from './forms/login.js';
import registrationRoutes from './forms/register.js';
import { requireLogin } from '../middleware/auth.js';

const router = Router();

router.get('/', homePage);
router.get('/account', requireLogin, showAccount);
router.get('/logout', processLogout);

router.use('/login', loginRoutes);
router.use('/register', registrationRoutes);

export default router;
