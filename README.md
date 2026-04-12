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

### Version Native (Windows .EXE)
Pour transformer l'application en un logiciel installable :
1. Générez le build :
   ```bash
   npm run electron:build
   ```
2. L'installeur sera généré dans le dossier `dist-electron/`.

## Fonctionnalités
- **Saisie assistée :** Formulaire intelligent avec affichage conditionnel.
- **Répertoire :** Sauvegarde automatique des assurés pour auto-complétion.
- **Historique :** Recherche et modification des dossiers passés.
- **Impression :** Rendu A4 haute fidélité conforme aux normes CNAS.

## Dépôt Code Source
Le code source est disponible et ouvert sur GitHub :  
🔗 [https://github.com/sahraouilarbi/cnas_as-22](https://github.com/sahraouilarbi/cnas_as-22)

## Licence
Ce projet est sous licence **GNU General Public License v3.0 (GPLv3)**. Vous êtes libre de l'utiliser, le modifier et le distribuer, tant que vous respectez les termes de la licence (voir le fichier [LICENSE](LICENSE)).

---
*Développé pour les établissements de soins conventionnés.*
