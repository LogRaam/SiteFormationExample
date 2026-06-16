# Formation Feature Flags · LaunchDarkly chez ExampleCo

Site web de **référence documentaire** et de **formation interactive** (en français)
sur l'usage des Feature Toggles / Feature Flags avec **LaunchDarkly**, dans le
contexte de gouvernance, de conformité et de gestion du risque de **ExampleCo**.

## Démarrage

Aucune dépendance, aucune étape de build. Deux options :

1. **Ouvrir directement** `index.html` dans un navigateur (fonctionne en `file://`).
2. **Servir localement** (recommandé pour un comportement identique à un déploiement) :

   ```bash
   # Python
   python -m http.server 8080
   # puis ouvrir http://localhost:8080

   # ou Node
   npx serve .
   ```

## Structure

```
.
├── index.html                  Accueil + vue d'ensemble
├── pages/
│   ├── concepts.html           La pratique des Feature Toggles (+ démo interactive)
│   ├── pourquoi.html           Réflexion Affaires & Architecture (+ quiz)
│   ├── operationnaliser.html   Code source & création dans LaunchDarkly
│   ├── cycle-de-vie.html       Gestion & cycle de vie (+ mini-audit)
│   ├── toggle-ready.html       Bonnes pratiques, gating (+ checklist)
│   ├── ExampleCo.html         SOC2, catalogue central, 3 types de switches (+ quiz)
│   ├── parcours-dev.html       Parcours formation Développeurs (interactif)
│   ├── parcours-metier.html    Parcours formation Métier / PO (interactif)
│   ├── sandbox.html            Simulateur de déploiement progressif + kill switch
│   └── glossaire.html          Glossaire filtrable
├── assets/
│   ├── css/{main,components}.css
│   └── js/
│       ├── site.js             Ossature commune (header/footer, thème, nav, onglets)
│       ├── quiz.js             Moteur de quiz réutilisable
│       ├── parcours.js         Progression des parcours (localStorage)
│       ├── sandbox.js          Simulateur interactif
│       └── data/quiz-data.js   Banque de questions
├── BACKLOG.md                  Sections à compléter (placeholders)
└── GOAL.md                     Objectif du projet
```

## Principes techniques

- **HTML5 / CSS / JavaScript vanilla**, zéro dépendance externe.
- **DRY sans build** : l'en-tête et le pied de page sont injectés par `site.js`
  (sans `fetch`, pour fonctionner en `file://`).
- **Accessibilité** : navigation au clavier, lien d'évitement, attributs ARIA, thème
  clair/sombre persistant, responsive.
- **Interactivité** : démos de toggle, quiz notés, parcours avec progression
  mémorisée, simulateur de rollout, glossaire filtrable.
- **Ton** : professionnel, prudent, orienté gouvernance / conformité / risque.

## Sections à compléter

Les zones marquées d'un encadré **« Note … »** ou d'un **placeholder** signalent du
contenu à compléter avec les informations internes ExampleCo (captures d'écran,
exemples concrets, conventions de nommage, noms d'outils, etc.).
Voir [`BACKLOG.md`](BACKLOG.md).

## Déploiement

Site 100 % statique : déployable tel quel sur n'importe quel hébergement statique
(serveur interne, stockage objet, pages statiques). Aucun traitement côté serveur.
