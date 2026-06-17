import { Router } from 'express';

import { homePage } from './index.js';
import loginRoutes from './forms/login.js';

const router = Router();

router.get('/', homePage);

router.use('/login', loginRoutes);

export default router;
