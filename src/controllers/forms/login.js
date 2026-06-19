import { Router } from 'express';

import { findUserByEmail, verifyPassword } from '../../models/forms/login.js';

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
  // TODO: Create validation
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      // TODO: Create flash message middleware
      console.log('Invalid email or password');
      return res.redirect('/login');
    }

    if (!(await verifyPassword(password, user.password))) {
      console.log('Invalid email or password');
      return res.redirect('/login');
    }

    delete user.password;

    req.session.user = user;
    return res.redirect('/');
  } catch (error) {
    console.error('Error finding user:', error);
    return res.redirect('/login');
  }
};

/**
 * Handle user logout
 */
export const processLogout = (req, res) => {
  if (!req.session) {
    return res.redirect('/');
  }

  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.clearCookie('connect.sid');
      return res.redirect('/');
    }
  });
  
  res.clearCookie('connect.sid');
  res.redirect('/');
};

router.get('/', showLoginForm);
router.post('/', processLogin);

export default router;
