import { Router } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import {
  saveUser,
  emailExists,
  usernameExists,
} from '../../models/forms/registration.js';
import { registrationValidation } from '../../middleware/validation/forms.js';

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      // TODO: Create flash message
      console.error('Validation Error:', error.msg);
    });
    return res.redirect('/register');
  }

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
router.post('/', registrationValidation, processRegistration);

export default router;
