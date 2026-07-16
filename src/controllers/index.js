import { getRecentlyAdded } from '../models/games/groups.js';

export const homePage = async (req, res) => {
  const recentlyAdded = await getRecentlyAdded();
  res.render('home', {
    title: 'Home | Oasis Games',
    recentlyAdded,
  });
};

export const homePageStyle = (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/home.css" />');
  next();
};

export const aboutPage = (req, res) => {
  res.render('about', { title: 'About | Oasis Games' });
};
