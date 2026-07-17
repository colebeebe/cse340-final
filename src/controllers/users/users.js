import { Router } from 'express';

import { deleteUserRoute } from './index.js';

const router = Router();

router.delete('/:id', deleteUserRoute);

export default router;
