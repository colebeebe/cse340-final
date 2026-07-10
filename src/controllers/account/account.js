import { Router } from 'express';

import { requireLogin } from '../../middleware/auth.js';

const router = Router();

router.use('/', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/account.css" />');
  next();
});

/**
 * Display protected account (dashboard)
 * Requires login
 */
const showAccount = (req, res) => {
  res.render('account', {
    title: 'User Account',
  });
};

/**
 * Display edit options for account
 * Requires login
 */
const showEditAccount = (req, res) => {
  res.render('account/edit', {
    title: 'Edit Account',
  });
};

router.get('/', requireLogin, showAccount);
router.get('/edit', requireLogin, showEditAccount);

export default router;
