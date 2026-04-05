# Spécification de Conception : Application CNAS - Engagement de Prise en Charge

| Métadonnée | Détail |
| :--- | :--- |
| **Projet** | Application de Gestion du Formulaire CNAS |
| **Date** | 05 Avril 2026 |
| **Statut** | Validé |
| **Référence DRP** | DRP-CNAS-EPC-2026-001 |

---

## 1. Vue d'Ensemble du Projet

### 1.1 Objectif
Développer une application web locale (Windows) pour automatiser la saisie, l'archivage et l'impression du formulaire d'engagement de prise en charge CNAS (référence IMF CNAS 11-2022 - AS.22).

### 1.2 Public Cible
Opérateurs administratifs des établissements de soins conventionnés (cliniques, centres d'hémodialyse).

---

## 2. Architecture Technique

### 2.1 Stack Technologique
- **Frontend :** React 18 (Vite) + Tailwind CSS (pour le style administratif épuré).
- **Backend :** Node.js + Express.js.
- **Base de Données :** SQLite (via `better-sqlite3`) pour une persistance locale simplifiée.
- **Impression :** CSS `@media print` natif pour un rendu A4 fidèle sans dépendances externes.

### 2.2 Structure des Données (SQLite)
- **Table `dossiers` :** Stockage complet des formulaires (Données Assuré, Établissement, Type de demande, Caisse).
- **Table `assures` :** Répertoire des assurés pour auto-complétion par n° d'immatriculation.
- **Table `config` :** Paramètres de l'établissement par défaut (Nom, Raison sociale, Convention n°).

---

## 3. Interface Utilisateur (UI/UX)

### 3.1 Agencement (Layout)
- **Navigation :** Menu supérieur (Top Navbar) pour maximiser l'espace de saisie.
- **Style :** Médical & Administratif épuré (Dominante Blanc/Bleu institutionnel).
- **Saisie :** Page unique défilante avec sections claires.

### 3.2 Logique Conditionnelle du Formulaire
Le formulaire s'adapte dynamiquement selon le `Type de demande` sélectionné :
- **Hospitalisation/Séjour :** Affiche les champs de chirurgie, durée et actes.
- **Soins (Hémodialyse) :** Affiche le nombre de séances, la période et le forfait.

---

## 4. Spécifications de l'Impression

### 4.1 Rendu A4
- Utilisation de polices standard Windows (Arial/Helvetica).
- Marges strictes pour correspondance avec le formulaire papier.
- En-tête bilingue (Français/Arabe) reproduit en SVG ou HTML/CSS.
- Cases à cocher graphiques (☑/☐).

---

## 5. Plan de Développement (Phases)

1. **Phase 1 : Socle Technique** (Setup React/Vite + Express + SQLite).
2. **Phase 2 : Formulaire de Saisie** (Logique React + Validation).
3. **Phase 3 : Moteur d'Impression** (CSS Print + Template HTML).
4. **Phase 4 : Gestion des Données** (Historique, Recherche, Répertoire Assurés).
5. **Phase 5 : Paramètres & Déploiement** (Config, Script `.bat` de lancement).

---
*Document de conception finalisé sur la base du brainstorming du 05/04/2026.*
