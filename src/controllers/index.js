import { getNewReleases, getRecentlyAdded } from '../models/games/groups.js';
import { getAllUsers } from '../models/forms/registration.js';

export const homePage = async (req, res) => {
  const recentlyAdded = await getRecentlyAdded();
  const newReleases = await getNewReleases();
  res.render('home', {
    title: 'Home | Oasis Games',
    recentlyAdded,
    newReleases,
  });
};

export const homePageStyle = (req, res, next) => {
  res.addStyle('<link rel="stylesheet" href="/css/home.css" />');
  next();
};

export const aboutPage = (req, res) => {
  res.render('about', { title: 'About | Oasis Games' });
};

export const dashboardPage = async (req, res) => {
  const users = await getAllUsers();
  res.render('dashboard', { title: 'Dashboard | Oasis Games', users });
};
