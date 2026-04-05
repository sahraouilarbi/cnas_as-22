const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../../data/database.sqlite');

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath, { verbose: console.log });

const schema = `
-- Table des dossiers de prise en charge
CREATE TABLE IF NOT EXISTS dossiers (
  id                        INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at                DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at                DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Zone 1 : Assuré Social
  assure_nom_prenom         TEXT NOT NULL,
  assure_date_naissance     TEXT,
  assure_lieu_naissance     TEXT,
  assure_telephone          TEXT,
  assure_adresse            TEXT,
  assure_agence             TEXT,
  assure_num_immatriculation TEXT NOT NULL,

  -- Zone 2 : Établissement de Soins
  etablissement_nom         TEXT,
  etablissement_raison_sociale TEXT,
  convention_numero         TEXT,
  convention_date_du        TEXT,
  
  type_demande              TEXT CHECK(type_demande IN ('hospitalisation','soins','sejour')),
  
  patient_nom               TEXT,
  patient_date_naissance    TEXT,
  patient_lien              TEXT CHECK(patient_lien IN ('assure','conjoint','enfant','ascendant','autre')),
  patient_lien_autre        TEXT,
  
  -- Hospitalisation
  hosp_type_chirurgie       TEXT,
  hosp_type_chirurgie_autre TEXT,
  hosp_date_debut           TEXT,
  hosp_type_sejour          TEXT CHECK(hosp_type_sejour IN ('initial','prolongation')),
  hosp_duree_jours          INTEGER,
  hosp_actes_prevus         TEXT,
  
  -- Soins Hémodialyse
  soins_nb_seances          INTEGER,
  soins_periode_du          TEXT,
  soins_periode_au          TEXT,
  soins_type_pec            TEXT CHECK(soins_type_pec IN ('initiale','prolongation')),
  soins_forfait_numero      TEXT,
  soins_type_malade         TEXT CHECK(soins_type_malade IN ('permanent','temporaire')),
  
  -- Signature Établissement
  sign_ville                TEXT,
  sign_date                 TEXT,
  
  -- Zone 3 : Administration Caisse (réservé à l'opérateur si déjà accordé)
  caisse_frais              TEXT,
  caisse_taux               REAL,
  caisse_actes              TEXT,
  caisse_forfait_hemodialyse TEXT,
  caisse_periode_du         TEXT,
  caisse_periode_au         TEXT,
  caisse_nb_seances         INTEGER,
  caisse_fait_a             TEXT,
  caisse_fait_le            TEXT,
  validite_du               TEXT,
  validite_au               TEXT,
  
  -- Métadonnées
  statut                    TEXT DEFAULT 'brouillon' CHECK(statut IN ('brouillon','imprime'))
);

-- Table des assurés (répertoire)
CREATE TABLE IF NOT EXISTS assures (
  id                        INTEGER PRIMARY KEY AUTOINCREMENT,
  nom_prenom                TEXT NOT NULL,
  date_naissance            TEXT,
  lieu_naissance            TEXT,
  telephone                 TEXT,
  adresse                   TEXT,
  agence                    TEXT,
  num_immatriculation       TEXT UNIQUE NOT NULL,
  created_at                DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table de configuration de l'application
CREATE TABLE IF NOT EXISTS config (
  cle     TEXT PRIMARY KEY,
  valeur  TEXT
);

-- Valeurs par défaut de configuration (Insérées seulement si elles n'existent pas)
INSERT OR IGNORE INTO config (cle, valeur) VALUES 
('etablissement_nom', ''),
('etablissement_raison_sociale', ''),
('convention_numero', ''),
('convention_date_du', ''),
('ville_defaut', ''),
('sauvegarde_auto', 'oui'),
('langue', 'fr');

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_dossiers_nom         ON dossiers(assure_nom_prenom);
CREATE INDEX IF NOT EXISTS idx_dossiers_immat       ON dossiers(assure_num_immatriculation);
CREATE INDEX IF NOT EXISTS idx_dossiers_created     ON dossiers(created_at);
CREATE INDEX IF NOT EXISTS idx_assures_immat        ON assures(num_immatriculation);
`;

db.exec(schema);
console.log('Database schema successfully initialized.');
db.close();
