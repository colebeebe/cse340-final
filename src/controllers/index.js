import {
  getLatestReviews,
  getNewReleases,
  getRecentlyAdded,
} from '../models/games/groups.js';
import { getAllUsers } from '../models/forms/registration.js';
import { deleteReviewById } from '../models/reviews/reviews.js';

export const homePage = async (req, res) => {
  const recentlyAdded = await getRecentlyAdded();
  const newReleases = await getNewReleases();
  const latestReviews = await getLatestReviews();

  res.render('home', {
    title: 'Home | Oasis Games',
    recentlyAdded,
    newReleases,
    latestReviews,
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

export const deleteReview = async (req, res) => {
  const gameId = req.params.gameid;
  const userId = req.params.userid;

  if (!res.locals.user) {
    req.flash('error', 'You must be logged in to access this resource');
    return res.redirect('/');
  }

  if (res.locals.user != userId && res.locals.user.role_name !== 'admin') {
    req.flash('error', 'You do not have access to this resource');
    return res.redirect(`/games/${gameId}`);
  }

  await deleteReviewById(userId, gameId);

  req.flash('success', 'Review deleted');
  res.redirect(`/games/${gameId}`);
};
