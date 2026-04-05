const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get config
  router.get('/', (req, res) => {
    try {
      const rows = db.prepare('SELECT * FROM config').all();
      const config = {};
      rows.forEach(row => {
        config[row.cle] = row.valeur;
      });
      res.json(config);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update config
  router.post('/', (req, res) => {
    try {
      const data = req.body;
      const upsert = db.prepare('INSERT OR REPLACE INTO config (cle, valeur) VALUES (?, ?)');
      
      const transaction = db.transaction((configData) => {
        for (const [cle, valeur] of Object.entries(configData)) {
          upsert.run(cle, String(valeur));
        }
      });

      transaction(data);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
