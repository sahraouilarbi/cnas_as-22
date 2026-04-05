# Application de Gestion du Formulaire CNAS PEC

Application web locale pour l'automatisation de la saisie et de l'impression des formulaires d'Engagement de Prise en Charge CNAS (IMF CNAS 11-2022 - AS.22).

## Installation

1. Assurez-vous que [Node.js](https://nodejs.org/) (v20+) est installé sur votre ordinateur.
2. Ouvrez un terminal dans le dossier du projet.
3. Exécutez la commande suivante pour installer les dépendances :
   ```bash
   npm run install-all
   ```

## Utilisation

### Sous Windows
Double-cliquez sur le fichier `lancer.bat`. Cela va :
1. Démarrer le serveur backend.
2. Démarrer l'application frontend.
3. Ouvrir votre navigateur sur `http://localhost:5173`.

### Via le terminal
```bash
npm run dev
```

## Fonctionnalités
- **Saisie assistée :** Formulaire intelligent avec affichage conditionnel.
- **Répertoire :** Sauvegarde automatique des assurés pour auto-complétion.
- **Historique :** Recherche et modification des dossiers passés.
- **Impression :** Rendu A4 haute fidélité conforme aux normes CNAS.

---
*Développé pour les établissements de soins conventionnés.*
