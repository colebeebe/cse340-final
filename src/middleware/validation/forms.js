import { body } from 'express-validator';

/**
 * Validation rules for login form
 */
export const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters'),
];

export const registrationValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 63 })
    .withMessage('First name must be between 2 and 63 characters')
    .isAlpha('en-US', { ignore: " -'" })
    .withMessage('First name must only contain letters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 63 })
    .withMessage('Last name must be between 2 and 63 characters')
    .isAlpha('en-US', { ignore: " -'" })
    .withMessage('Last name must only contain letters'),
  body('birthdate')
    .optional({ values: 'falsy' })
    .isISO8601()
    .withMessage('Birthdate must be a valid date')
    .toDate()
    .custom((value) => {
      const today = new Date();
      const min = new Date();
      min.setFullYear(today.getFullYear() - 120);

      if (value >= today) {
        throw new Error('Birthdate must be in the past');
      }

      if (value <= min) {
        throw new Error('Birthdate is unrealistically old');
      }

      return true;
    }),
  body('username')
    .trim()
    .matches(/^(?=.{3,20}$)[a-zA-Z0-9_](?:[a-zA-Z0-9._]*[a-zA-Z0-9_])$/)
    .withMessage('Username must be between 3-20 characters and must use letters, numbers, underscores, or dots'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
  body('confirmEmail')
    .notEmpty()
    .withMessage('Must confirm email')
    .trim()
    .normalizeEmail()
    .custom((value, { req }) => value === req.body.email)
    .withMessage('Email addresses must match'),
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*()_+\-+\[\]{};':"\\|,.<>\/?]/)
    .withMessage('Password must contain at least one special character'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Must confirm password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
];
