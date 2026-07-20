/**
 * Middleware to require authentication for protected routes
 * Redirects to login page if user is not authenticated
 * Sets res.locals.user = user for authenticated requests
 */
export const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect('/login');
  }
};

/**
 * Require a given role before allowing the user to visit route
 * Redirects to home if user does not have permission
 * @param {Array<string>} roleList - The list of allowed roles
 */
export const requireRole = (roleList) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      req.flash('error', 'You must be logged in to access this page');
      return res.redirect('/login');
    }

    if (!roleList.includes(req.session.user.role_name)) {
      req.flash('error', 'You do not have permission to access this page');
      return res.redirect('/');
    }

    next();
  };
};
