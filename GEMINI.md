# Context de l'Agent Gemini : CNAS-PEC Manager

Ce fichier fournit le contexte et les instructions pour les interactions futures avec ce projet.

## 1. Vue d'ensemble du Projet
L'application **CNAS-PEC Manager** est un outil web local conçu pour les établissements de soins conventionnés (hémodialyse, cliniques) afin d'automatiser la saisie, l'archivage et l'impression du formulaire officiel de la CNAS : **"Engagement de Prise en Charge"** (IMF CNAS 11-2022 - AS.22).

### Technologies clés
- **Frontend :** React 18 (Vite), Tailwind CSS, React Hook Form, TanStack Query (React Query).
- **Backend :** Node.js (Express), `better-sqlite3`.
- **Base de données :** SQLite (fichier local dans `data/database.sqlite`).
- **Impression :** Rendu A4 haute fidélité via CSS `@media print`.

### Architecture
- `client/` : Application Single Page (SPA) frontend.
- `server/` : API REST backend et logique d'accès aux données.
- `data/` : Stockage de la base de données SQLite (non versionné).
- `docs/` : Spécifications de conception et documentation technique.
- `ressources/` : Documents de référence originaux (DRP, logos).

---

## 2. Commandes de Construction et d'Exécution

### Installation initiale
```bash
npm run install-all
```
Cette commande installe les dépendances à la racine, dans le dossier client et serveur, puis initialise le schéma de la base de données.

### Lancement en Développement
```bash
npm run dev
```
Ou pour tester la version desktop :
```bash
npm run electron:dev
```

### Génération du logiciel (.exe)
```bash
npm run electron:build
```

### Lancement sous Windows (Utilisateur)
Double-cliquer sur `lancer.bat` à la racine du projet ou installer le `.exe` généré.

---

## 3. Conventions de Développement

### Style de Code
- **React :** Utiliser des composants fonctionnels avec Hooks. Privilégier les icônes de `lucide-react`.
- **Styling :** Utiliser Tailwind CSS exclusivement. Les styles d'impression sont isolés dans le composant `PrintTemplate.jsx`.
- **API :** Les appels API doivent être centralisés dans `client/src/api/index.js` et gérés par React Query côté composants.
- **Base de données :** Le schéma SQLite est défini dans `server/db/init.js`. Respecter les contraintes de types et les index.

### Formulaire CNAS
Toute modification du formulaire doit garantir la compatibilité avec le rendu A4. Le composant `PrintTemplate` est le garant de la fidélité visuelle par rapport au document papier officiel.

---

## 4. Maintenance
- **TREE.md :** Toujours mettre à jour ce fichier après l'ajout de nouveaux fichiers ou dossiers importants.
- **Tests :** Valider les modifications du formulaire en vérifiant le rendu d'impression (Print Preview) dans le navigateur.
