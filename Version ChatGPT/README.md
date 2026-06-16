# Formation LaunchDarkly

Site statique de référence et de formation interactive sur l'utilisation des Feature Flags avec LaunchDarkly chez ExampleCo.

## Structure

```text
.
├── GOAL.md
├── README.md
├── BACKLOG.md
├── index.html
├── assets/
│   └── feature-governance-hero.png
├── css/
│   └── styles.css
└── js/
    ├── app.js
    └── data.js
```

## Plan d'implémentation

1. Créer une base HTML5 statique, responsive et sans dépendances externes.
2. Structurer le contenu documentaire en sections de référence : pratique des toggles, réflexion Affaires/Architecture, code, LaunchDarkly, cycle de vie et posture Toggle Ready.
3. Intégrer les spécificités ExampleCo : SOC2, PR automatique, approbation séparée, catalogue central et types de switches.
4. Construire deux parcours interactifs : développeurs et Product Owners/utilisateurs métier.
5. Ajouter une sandbox de simulation d'activation pour relier type de switch, exposition, audience, risque et processus recommandé.
6. Identifier les sections à compléter avec le placeholder requis lorsque les informations internes manquent.
7. Vérifier que le site fonctionne localement en ouvrant `index.html`.

## Informations à compléter

Les sections suivantes contiennent volontairement le placeholder demandé dans `GOAL.md` :

- Conventions et captures d'écran internes de création LaunchDarkly.
- Détails du catalogue central de toggle switches.
- Procédure ServiceNow exacte pour les changements standards.
- Mécanisme sur mesure de livraison progressive et critères de Mise en Production.
- Exemples concrets ExampleCo, preuves d'audit et modèles de communication.

## Utilisation locale

Ouvrir `index.html` dans un navigateur. Aucun serveur ni gestionnaire de paquets n'est requis.

## Actif visuel

Le fichier `assets/feature-governance-hero.png` a été généré avec l'outil intégré `image_gen` à partir d'un prompt orienté gouvernance, conformité, livraison progressive et contrôle du risque. L'image source originale reste dans le dossier généré par Codex.
