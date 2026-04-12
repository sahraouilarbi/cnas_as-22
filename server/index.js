const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// DB Connection
const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, '../data/database.sqlite');

// Ensure database initialization
const fs = require('fs');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Create tables if they don't exist (basic init)
db.exec(`
  CREATE TABLE IF NOT EXISTS dossiers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    assure_nom_prenom TEXT NOT NULL,
    assure_date_naissance TEXT,
    assure_lieu_naissance TEXT,
    assure_telephone TEXT,
    assure_adresse TEXT,
    assure_agence TEXT,
    assure_num_immatriculation TEXT NOT NULL,
    etablissement_nom TEXT,
    etablissement_raison_sociale TEXT,
    convention_numero TEXT,
    convention_date_du TEXT,
    type_demande TEXT,
    patient_nom TEXT,
    patient_date_naissance TEXT,
    patient_lien TEXT,
    patient_lien_autre TEXT,
    hosp_type_chirurgie TEXT,
    hosp_type_chirurgie_autre TEXT,
    hosp_date_debut TEXT,
    hosp_type_sejour TEXT,
    hosp_duree_jours INTEGER,
    hosp_actes_prevus TEXT,
    soins_nb_seances INTEGER,
    soins_periode_du TEXT,
    soins_periode_au TEXT,
    soins_type_pec TEXT,
    soins_forfait_numero TEXT,
    soins_type_malade TEXT,
    sign_ville TEXT,
    sign_date TEXT,
    caisse_frais TEXT,
    caisse_taux REAL,
    caisse_actes TEXT,
    caisse_forfait_hemodialyse TEXT,
    caisse_periode_du TEXT,
    caisse_periode_au TEXT,
    caisse_nb_seances INTEGER,
    caisse_fait_a TEXT,
    caisse_fait_le TEXT,
    validite_du TEXT,
    validite_au TEXT,
    statut TEXT DEFAULT 'brouillon'
  );

  CREATE TABLE IF NOT EXISTS assures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom_prenom TEXT NOT NULL,
    num_immatriculation TEXT UNIQUE NOT NULL,
    date_naissance TEXT,
    lieu_naissance TEXT,
    telephone TEXT,
    adresse TEXT,
    agence TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS config (
    cle TEXT PRIMARY KEY,
    valeur TEXT
  );

  INSERT OR IGNORE INTO config (cle, valeur) VALUES 
  ('etablissement_nom', ''),
  ('etablissement_raison_sociale', ''),
  ('convention_numero', ''),
  ('convention_date_du', ''),
  ('ville_defaut', ''),
  ('sauvegarde_auto', 'oui'),
  ('langue', 'fr');
`);

// Routes
const dossiersRouter = require('./routes/dossiers')(db);
const assuresRouter = require('./routes/assures')(db);
const configRouter = require('./routes/config')(db);

app.use('/api/dossiers', dossiersRouter);
app.use('/api/assures', assuresRouter);
app.use('/api/config', configRouter);

// Serve Static Frontend (Production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
