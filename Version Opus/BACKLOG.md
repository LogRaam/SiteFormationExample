# Backlog — Sections à compléter

Ce fichier recense les contenus à enrichir avec les **informations internes ExampleCo**.
Chaque point correspond à un encadré « Note » ou un placeholder présent dans le site.

## Contenu manquant (placeholders dans le site)

| Page | Élément à compléter |
|------|----------------------|
| `concepts.html` | Conventions internes de classification des toggles, exemples concrets, captures du catalogue |
| `pourquoi.html` | Critères de décision internes, exemples réels d'arbitrages Affaires/Architecture, gabarit de fiche de toggle |
| `operationnaliser.html` | Captures réelles de la console LaunchDarkly, conventions de nommage internes, gabarit de fiche du catalogue |
| `cycle-de-vie.html` | Processus interne de revue des *stale flags* (fréquence, outillage, indicateurs) |
| `toggle-ready.html` | Convention de nommage officielle, métadonnées obligatoires du catalogue |
| `ExampleCo.html` | Outil de PR utilisé, délais/rôles d'approbation, accès et champs du catalogue, critères de classification des 3 types, nom du système sur mesure, SLA |
| `parcours-dev.html` | Exemples de code internes, captures LaunchDarkly, liens documentation interne |
| `parcours-metier.html` | Exemples concrets, captures d'écran, procédure interne d'activation, contacts/rôles |
| `sandbox.html` | Segments réels, métriques surveillées, intégration au catalogue |
| `glossaire.html` | Termes/acronymes propres au vocabulaire interne ExampleCo |

## Améliorations possibles (hors périmètre initial)

- [ ] Ajouter des captures d'écran réelles (anonymisées) de LaunchDarkly et du catalogue.
- [ ] Intégrer des exemples de code spécifiques à la stack ExampleCo.
- [ ] Ajouter une page « FAQ » et une page « Contacts / Support ».
- [ ] Export PDF des parcours pour formation hors-ligne.
- [ ] Internationalisation éventuelle (déjà 100 % FR).
- [ ] Page d'index des flags d'exemple reliée au catalogue.

## Done — déjà réalisé

- [x] Architecture statique modulaire, sans dépendance externe.
- [x] Pages de référence : concepts, pourquoi, mise en œuvre, cycle de vie, toggle-ready.
- [x] Page spécificités ExampleCo : SOC2, catalogue, 3 types de switches.
- [x] Deux parcours interactifs (Développeurs / Métier-PO) avec progression mémorisée.
- [x] Quiz notés réutilisables + mises en situation.
- [x] Bac à sable : simulateur de rollout, ciblage, kill switch, PR SOC2 simulée.
- [x] Glossaire filtrable, thème clair/sombre, responsive, accessibilité de base.
