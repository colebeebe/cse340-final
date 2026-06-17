import { Router } from 'express';

const router = Router();

router.use('/', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/accountForm.css" />');
  next();
});

/**
 * @description Render the login form
 * @route GET /login
 */
const showLoginForm = (req, res) => {
  res.render('forms/login/form', { title: 'User Login' });
};

/**
 * @description Process user login
 * @route POST /login
 */
const processLogin = async (req, res) => {
  // TODO: Create login proceess
  console.log('Logging in...');
  res.redirect('/');
};

router.get('/', showLoginForm);
router.post('/', processLogin);

export default router;
