const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get all dossiers
  router.get('/', (req, res) => {
    try {
      const { search } = req.query;
      let query = 'SELECT * FROM dossiers ORDER BY created_at DESC';
      let params = [];

      if (search) {
        query = `
          SELECT * FROM dossiers 
          WHERE assure_nom_prenom LIKE ? 
          OR assure_num_immatriculation LIKE ? 
          ORDER BY created_at DESC`;
        params = [`%${search}%`, `%${search}%`];
      }

      const rows = db.prepare(query).all(params);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get single dossier
  router.get('/:id', (req, res) => {
    try {
      const row = db.prepare('SELECT * FROM dossiers WHERE id = ?').get(req.params.id);
      if (!row) return res.status(404).json({ error: 'Dossier non trouvé' });
      res.json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Create dossier
  router.post('/', (req, res) => {
    try {
      const data = req.body;
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);

      const stmt = db.prepare(`INSERT INTO dossiers (${columns}) VALUES (${placeholders})`);
      const info = stmt.run(values);

      // Also upsert into assures table for auto-completion
      if (data.assure_num_immatriculation) {
        const upsertAssure = db.prepare(`
          INSERT INTO assures (nom_prenom, date_naissance, lieu_naissance, telephone, adresse, agence, num_immatriculation)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(num_immatriculation) DO UPDATE SET
            nom_prenom=excluded.nom_prenom,
            date_naissance=excluded.date_naissance,
            lieu_naissance=excluded.lieu_naissance,
            telephone=excluded.telephone,
            adresse=excluded.adresse,
            agence=excluded.agence
        `);
        upsertAssure.run(
          data.assure_nom_prenom,
          data.assure_date_naissance,
          data.assure_lieu_naissance,
          data.assure_telephone,
          data.assure_adresse,
          data.assure_agence,
          data.assure_num_immatriculation
        );
      }

      res.status(201).json({ id: info.lastInsertRowid, ...data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update dossier
  router.put('/:id', (req, res) => {
    try {
      const data = req.body;
      const sets = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), req.params.id];

      const stmt = db.prepare(`UPDATE dossiers SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
      stmt.run(values);

      res.json({ id: req.params.id, ...data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete dossier
  router.delete('/:id', (req, res) => {
    try {
      db.prepare('DELETE FROM dossiers WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
