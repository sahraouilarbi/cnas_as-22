const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Search assures
  router.get('/', (req, res) => {
    try {
      const { q } = req.query;
      let query = 'SELECT * FROM assures ORDER BY nom_prenom ASC';
      let params = [];

      if (q) {
        query = `
          SELECT * FROM assures 
          WHERE nom_prenom LIKE ? 
          OR num_immatriculation LIKE ? 
          LIMIT 10`;
        params = [`%${q}%`, `%${q}%`];
      }

      const rows = db.prepare(query).all(params);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
