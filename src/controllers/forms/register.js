import { Router } from 'express';
import bcrypt from 'bcrypt';

import {
  saveUser,
  emailExists,
  usernameExists,
} from '../../models/forms/registration.js';

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
  // TODO: Create form validation
  const {
    firstName,
    lastName,
    birthdate: rawBirthdate,
    username,
    email,
    password,
  } = req.body;

  const birthdate = rawBirthdate || null;

  try {
    if (await emailExists(email)) {
      // TODO: Create flash message instead of printing to console
      console.error('Email already taken');
    }

    if (await usernameExists(username)) {
      // TODO: Create flash message instead of printing to console
      console.error('Username already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    saveUser(firstName, lastName, birthdate, username, email, hashedPassword);

    res.redirect('/');
  } catch (error) {
    console.error('Error creating user:', error);
    res.redirect('/register');
  }
};

router.get('/', showRegistrationForm);
router.post('/', processRegistration);

export default router;
