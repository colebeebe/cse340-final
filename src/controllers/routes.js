import { Router } from 'express';

import { homePage } from './index.js';
import loginRoutes, { processLogout } from './forms/login.js';
import registrationRoutes from './forms/register.js';

const router = Router();

router.get('/', homePage);

router.use('/login', loginRoutes);
router.use('/register', registrationRoutes);

router.get('/logout', processLogout);

export default router;
