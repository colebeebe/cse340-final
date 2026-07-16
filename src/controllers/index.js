import { getRecentlyAdded } from '../models/games/groups.js';

export const homePage = async (req, res) => {
  const recentlyAdded = await getRecentlyAdded();
  res.render('home', {
    title: 'Home',
    recentlyAdded,
  });
};
