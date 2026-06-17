import { Router } from 'express';

import { homePage } from './index.js';
import loginRoutes from './forms/login.js';
import registrationRoutes from './forms/register.js';

const router = Router();

router.get('/', homePage);

router.use('/login', loginRoutes);
router.use('/register', registrationRoutes);

export default router;
