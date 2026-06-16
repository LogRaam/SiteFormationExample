# Proposition de projet — Site de référence et de formation : Feature Flags avec LaunchDarkly

**Destinataire :** Product Owner
**Objet :** Validation et priorisation d'un site interne de référence et de formation sur l'usage des Feature Toggles
**Statut :** Prototype fonctionnel livré — en attente de contenu interne pour finalisation

---

## 1. En une phrase

Un site web interne, à la fois **référence documentaire** et **parcours de formation interactif**, qui explique comment **comprendre, mettre en œuvre et gouverner les Feature Flags** avec LaunchDarkly, dans le respect des exigences de conformité et de gestion du risque d'ExampleCo.

---

## 2. Le problème à résoudre

Les Feature Flags (ou *feature toggles*) sont un levier puissant : ils permettent de **livrer du code sans l'exposer** et de **piloter l'activation d'une fonctionnalité indépendamment du déploiement**. Mais mal utilisés, ils créent de la dette technique, des risques opérationnels et des angles morts de conformité.

Aujourd'hui, plusieurs constats :

- **Connaissances inégales** entre les équipes : certains savent créer un flag, peu en maîtrisent le cycle de vie complet.
- **Deux publics, deux besoins** : les développeurs (mise en place technique) et le métier / Product Owners (décision d'activation) n'ont pas les mêmes questions.
- **Spécificités ExampleCo peu documentées** : processus SOC2, catalogue central, types de switches — des règles propres à l'organisation qui doivent être comprises de tous.
- **Risque de « dette de toggle »** : des flags jamais retirés qui fragilisent les applications.

**Besoin :** un point d'entrée unique, clair et pédagogique, qui aligne tout le monde sur les bonnes pratiques et le cadre de gouvernance.

---

## 3. Objectifs

| Objectif | Résultat attendu |
|---|---|
| **Diffuser une compréhension commune** | Vocabulaire et concepts partagés entre dev et métier |
| **Réduire le risque** | Bonnes pratiques de déploiement progressif, kill switch, tests des deux états |
| **Ancrer la gouvernance ExampleCo** | SOC2, catalogue, types de switches compris et appliqués |
| **Accélérer la montée en compétence** | Deux parcours de formation autonomes et interactifs |
| **Limiter la dette de toggle** | Sensibilisation au cycle de vie et au retrait planifié |

---

## 4. Publics cibles

Le site adresse explicitement **deux audiences**, avec un parcours dédié à chacune :

- **👩‍💻 Développeurs** — mise en place technique : SDK, évaluation, valeur par défaut, gating, tests, retrait.
- **🧭 Métier / Product Owners** — pilotage : valeur d'affaires, audiences, déploiement progressif, processus SOC2, choix du type de switch.

Un troisième public bénéficie indirectement : **architectes et responsables conformité**, via les sections de gouvernance.

---

## 5. Contenu et sujets abordés

Le site est organisé en **pages de référence** + **deux parcours de formation** + **outils interactifs**.

### 5.1 Référence documentaire

| Section | Sujets couverts |
|---|---|
| **Concepts** | Définition d'un feature toggle ; séparer déploiement et exposition ; les 4 grands types (release, expérimentation, opérationnel, permission) ; ce qu'un toggle n'est *pas*. |
| **Pourquoi (et quand)** | Réflexion conjointe **Affaires + Architecture** ; bonnes et mauvaises raisons d'utiliser un toggle ; arbre de décision. |
| **Mise en œuvre** | Créer un flag dans LaunchDarkly ; évaluer un flag dans le code (exemples JavaScript, Java, C#, Python) ; patrons recommandés ; du commit à l'activation. |
| **Cycle de vie** | Les étapes (création → déploiement progressif → généralisation → retrait) ; états d'un toggle ; **dette de toggle** et stale flags. |
| **Toggle Ready** | Liste de vérification avant fusion ; gating ; conventions de nommage ; tester les deux états ; anti-patrons fréquents. |
| **Chez ExampleCo** | **SOC2** (PR automatique + approbation par un pair) ; **catalogue central** de switches ; **les 3 types de switches** (informationnelle / changement standard ServiceNow / livraison progressive sur mesure). |
| **Glossaire** | Vocabulaire essentiel, filtrable (toggle, rollout, kill switch, bucketing, gating, SOC2, etc.). |

### 5.2 Spécificités ExampleCo intégrées

Le cadre de gouvernance interne est traité comme un sujet de premier plan :

- **SOC2 / séparation des tâches** — toute modification de flag crée automatiquement une **Pull Request** qui doit être **approuvée par une personne différente de l'auteur**.
- **Catalogue central** — recenser, classer et gouverner l'ensemble des switches.
- **Trois types de switches** :
  1. **Informationnelle** (message, date) — sans demande de changement ;
  2. **Changement standard** — via ServiceNow ;
  3. **Livraison progressive** (exige une MEP) — système sur mesure, car ServiceNow n'est pas conçu pour ça.

---

## 6. Approche pédagogique : l'interactivité

Le site ne se contente pas de texte. Il met l'apprenant **en situation** :

- **Deux parcours de formation** structurés en modules, avec **progression mémorisée** (l'apprenant retrouve où il s'est arrêté).
- **Quiz notés** à la fin des sections clés, avec explications.
- **Mises en situation** (ex. « Vous êtes PO, que faites-vous ? »).
- **Bac à sable interactif** : un **simulateur de déploiement progressif** où l'on active un flag, ajuste le palier (1 % → 100 %), cible une audience (bêta, interne) et déclenche un **kill switch**. Le simulateur reproduit fidèlement le flux ExampleCo : un changement est d'abord **proposé** (en attente d'approbation), puis devient **effectif** une fois la **PR approuvée** — rendant la règle SOC2 tangible.
- **Démonstrations en direct** (basculer un toggle et voir l'interface changer).

---

## 7. Bénéfices attendus

- **Autonomie** : formation en libre-service, sans mobiliser de formateur.
- **Alignement** : un référentiel unique, même langage pour dev et métier.
- **Réduction du risque** : meilleures pratiques de rollout et de retour arrière intégrées.
- **Conformité renforcée** : le « pourquoi » du processus SOC2 est compris, pas seulement subi.
- **Onboarding accéléré** : un nouveau membre monte en compétence rapidement.

---

## 8. État actuel et ce qui reste à faire

**Livré (prototype fonctionnel) :**

- Site complet, responsive, fonctionnant localement, sans dépendance externe.
- Toutes les sections de référence + les deux parcours interactifs + le bac à sable.
- Spécificités ExampleCo intégrées (SOC2, catalogue, 3 types de switches).

**À compléter avec le contenu interne (marqué par des encadrés « Note » dans le site) :**

- Captures d'écran réelles de la console LaunchDarkly et du catalogue central.
- Conventions de nommage officielles et métadonnées obligatoires.
- Détails du processus de PR (outil, délais, rôles habilités à approuver).
- Critères précis de classification entre les trois types de switches, nom du système sur mesure.
- Exemples de code propres à la stack ExampleCo.

> Le détail des éléments manquants est tenu à jour dans le fichier `BACKLOG.md`.

---

## 9. Décisions attendues du PO

1. **Validation de la pertinence** et du périmètre du site.
2. **Priorisation** : est-ce un sujet à embarquer dans un prochain incrément ?
3. **Désignation des contributeurs** pour fournir le contenu interne manquant (captures, conventions, exemples).
4. **Choix de l'hébergement** (intranet, portail interne, etc.) en vue d'un déploiement.
5. **Public pilote** éventuel pour recueillir un premier retour.

---

## 10. Prochaines étapes proposées

1. Revue de la proposition avec le PO et arbitrage de priorité.
2. Atelier court avec un dev + un PO référents pour collecter le contenu interne.
3. Intégration du contenu et remplacement des placeholders.
4. Test auprès d'un groupe pilote, ajustements.
5. Mise en ligne sur le canal interne retenu et communication.

---

*Document de présentation — basé sur le prototype de site déjà réalisé. Tout le contenu est en français, avec un ton orienté gouvernance, conformité et gestion du risque.*
