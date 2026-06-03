export const addLocalVariables = (req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
  next();
};
