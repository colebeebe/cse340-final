import { Router } from 'express';

import db from '../models/db.js';

const router = Router();

const performSearch = async (req, res) => {
  const query = req.query.q?.trim();

  if (!query || query.length < 2) {
    return res.json([]);
  }

  const games = await db.query(
    `
    SELECT id, title FROM oa_games
    WHERE unaccent(title) ILIKE unaccent($1)
    LIMIT 10;
    `,
    [`%${query}%`],
  );

  res.json(games.rows);
};

router.get('/', performSearch);

export default router;
