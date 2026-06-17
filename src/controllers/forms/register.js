import { Router } from 'express';

const router = Router();

router.use('/', (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/accountForm.css" />');
  next();
});

/**
 * @description Render the registration form
 * @route GET /register
 */
const showRegistrationForm = (req, res) => {
  res.render('forms/register/form', { title: 'Registration' });
};

/**
 * @description Process account creation
 * @route POST /register
 */
const processRegistration = async (req, res) => {
  // TODO: Create registration logic
  console.log('Creating account...');
  res.redirect('/');
};

router.get('/', showRegistrationForm);
router.post('/', processRegistration);

export default router;
