**Goal :** Créer un site web de référence et de formation interactif sur l’utilisation des Feature Flags avec LaunchDarkly chez ExampleCo.

**Stratégie de modèles (Cost Optimization) :**
- **Planification, architecture, réflexion globale et contenu pédagogique** → **gpt-5.5 (current)**
- **Génération de contenu détaillé et documentation** → **gpt-5.5** ou **gpt-5.4**
- **Coding, HTML/CSS/JS, création de fichiers et itérations mineures** → **gpt-5.4-mini** (le plus économique)
- Utiliser la commande `/model` pour changer de modèle selon la phase.
- Codex doit proposer lui-même les changements de modèle quand c’est pertinent pour économiser des coûts.

**Effort Level recommandé :**
- Commencer avec **High** pour la phase de planification et d’architecture.
- Passer à **Medium** ou **Low** pendant les phases de coding et d’itérations.

**Objectif principal :**
Développer un site complet qui sert à la fois de **référence documentaire** et de **parcours de formation interactif** (HTML5) sur les Feature Toggles / Feature Flags.

**Contenu à couvrir :**
- La pratique des Feature Toggles
- La réflexion conceptuelle avec les Affaires et l’Architecture (pourquoi on utilise un Feature Toggle)
- Comment opérationaliser avec le code source et la création de toggles dans LaunchDarkly
- La gestion et le cycle de vie d’un Toggle
- Être "Toggle Ready" : bonnes pratiques de développement, gating, etc.
- Deux parcours de formation distincts :
  - a) Développeurs (mise en place technique du feature toggle)
  - b) Utilisateurs métier / Product Owners (activation / désactivation des toggles)

**Spécificités ExampleCo à intégrer :**
- SOC2 : Une Pull Request est automatiquement créée à chaque modification de flag. Une autre personne que le développeur doit approuver la PR.
- Catalogue central de toggle switches
- Types de switches :
  - Switches informationnelles (changement de message ou de date, pas de demande de changement)
  - Switches avec changement standard via ServiceNow
  - Switches de livraisons progressives (exigent une Mise en Production) → système sur mesure car ServiceNow n’est pas conçu pour ça

**Règle pour les sections incomplètes :**
Pour toute section où l’information est manquante ou incomplète, insérer le placeholder suivant :

> **Note :** Cette section doit être complétée avec les informations manquantes au moment de la création du site (contenu détaillé, captures d’écran, exemples concrets ExampleCo, etc.).

**Contexte technique attendu :**
- Site moderne, responsive, en HTML5 / CSS / JavaScript (framework léger autorisé si justifié, ex: pas de framework lourd)
- Parcours interactif avec mises en situation réalistes (simulations, quizzes, sandbox)
- Contenu clair, professionnel et pédagogique

**Contraintes :**
- Tout le contenu en français
- Ton professionnel, prudent, orienté gouvernance, conformité et risque (culture ExampleCo)
- Architecture propre, modulaire et facile à maintenir
- Minimiser les dépendances externes

**Done when :**
- Le site est fonctionnel localement (`index.html` ou `npm run dev`)
- Les deux parcours de formation sont implémentés et interactifs
- Toutes les sections sont présentes avec placeholders pour les parties manquantes
- Spécificités ExampleCo bien intégrées
- Site cohérent visuellement et prêt à être déployé

**Fichiers de référence :** @BACKLOG.md

**Instructions pour Codex :**
1. Commence par proposer une structure de projet claire (arborescence complète des dossiers/fichiers).
2. Présente un plan d’implémentation étape par étape.
3. Identifie les sections où de l’information supplémentaire est nécessaire.
4. Applique la stratégie de modèles et d’effort ci-dessus pour optimiser les coûts.
5. Une fois la structure validée, passe à la création des fichiers.