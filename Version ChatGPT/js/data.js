window.LAUNCHDARKLY_TRAINING_DATA = {
  placeholder:
    "Note : Cette section doit être complétée avec les informations manquantes au moment de la création du site (contenu détaillé, captures d'écran, exemples concrets ExampleCo, etc.).",
  reference: [
    {
      title: "Pourquoi utiliser un Feature Toggle",
      body:
        "Un toggle sépare le déploiement technique de l'activation fonctionnelle. Il aide à réduire le risque de livraison, à contrôler l'exposition et à soutenir des décisions métier réversibles.",
      tags: ["Décision", "Risque", "Réversibilité"]
    },
    {
      title: "Réflexion Affaires et Architecture",
      body:
        "Avant de créer un flag, l'équipe doit clarifier le bénéfice, la population cible, les critères de succès, les impacts opérationnels et le scénario de retrait. L'architecture valide que le gating protège le bon comportement.",
      tags: ["Affaires", "Architecture", "Critères"]
    },
    {
      title: "Opérationaliser dans le code",
      body:
        "Le code doit encapsuler l'évaluation du flag, définir un comportement par défaut prudent, couvrir les chemins activé et désactivé, et éviter que la logique métier devienne dépendante de conditions dispersées.",
      tags: ["Code", "Tests", "Fallback"]
    },
    {
      title: "Créer le toggle dans LaunchDarkly",
      body:
        "La création doit préciser le nom, la description, le propriétaire, l'environnement, la stratégie de ciblage et la date de revue. Les captures d'écran et conventions internes doivent être ajoutées.",
      tags: ["LaunchDarkly", "Catalogue", "Propriétaire"],
      needsPlaceholder: true
    },
    {
      title: "Gérer le cycle de vie",
      body:
        "Chaque toggle doit avoir un propriétaire, une échéance de retrait et une preuve que le comportement final est stabilisé. Les flags permanents doivent être explicitement justifiés.",
      tags: ["Dette", "Retrait", "Audit"]
    },
    {
      title: "Être Toggle Ready",
      body:
        "Une équipe est prête lorsque le gating, les tests, la surveillance, le retour arrière, la documentation et les approbations sont établis avant l'exposition réelle.",
      tags: ["Préparation", "Gating", "Surveillance"]
    }
  ],
  governance: [
    {
      title: "Contrôle SOC2 sur les modifications de flag",
      body:
        "Chaque modification de flag crée automatiquement une Pull Request. Une personne différente du développeur doit l'approuver afin de préserver la séparation des tâches et la traçabilité.",
      tags: ["SOC2", "PR", "Approbation"]
    },
    {
      title: "Catalogue central de toggle switches",
      body:
        "Le catalogue central sert de source de référence : nom du toggle, propriétaire, justification, type, environnement, statut, échéance et lien vers les preuves de changement.",
      tags: ["Catalogue", "Inventaire", "Preuve"],
      needsPlaceholder: true
    },
    {
      title: "Switches informationnels",
      body:
        "Utilisés pour ajuster un message, une date ou une information sans demande de changement formelle. Le risque demeure faible si l'impact est strictement informatif et vérifié.",
      tags: ["Message", "Date", "Faible risque"]
    },
    {
      title: "Switches avec changement standard",
      body:
        "Les activations qui modifient le comportement attendu doivent passer par un changement standard ServiceNow lorsque le processus applicable le prévoit.",
      tags: ["ServiceNow", "Standard", "Contrôle"],
      needsPlaceholder: true
    },
    {
      title: "Switches de livraisons progressives",
      body:
        "Les déploiements progressifs exigent une Mise en Production et un système sur mesure, car ServiceNow n'est pas conçu pour gérer finement ce type d'exposition graduelle.",
      tags: ["Progressif", "MEP", "Sur mesure"],
      needsPlaceholder: true
    }
  ],
  lifecycle: [
    {
      title: "1. Intention",
      body:
        "Documenter la raison du toggle, la décision attendue, le risque contrôlé et le propriétaire métier ou technique."
    },
    {
      title: "2. Conception",
      body:
        "Choisir le type de switch, la stratégie de ciblage, le comportement par défaut et les critères de sortie."
    },
    {
      title: "3. Implantation",
      body:
        "Ajouter le gating dans le code, couvrir les deux chemins par des tests et préparer les observations nécessaires."
    },
    {
      title: "4. Approbation",
      body:
        "Valider la PR automatique liée au flag avec une approbation indépendante et conserver les preuves d'audit."
    },
    {
      title: "5. Activation",
      body:
        "Activer selon le plan : informationnel, changement standard ou livraison progressive avec surveillance active."
    },
    {
      title: "6. Retrait",
      body:
        "Stabiliser le comportement retenu, retirer le code mort, fermer le registre et archiver les décisions."
    }
  ],
  readiness: [
    "La justification métier ou de risque est écrite et comprise.",
    "Le type de switch est classé selon les règles ExampleCo.",
    "Le propriétaire, l'échéance de revue et le plan de retrait sont définis.",
    "Le comportement par défaut est prudent en cas d'erreur LaunchDarkly.",
    "Les tests couvrent les états activé et désactivé.",
    "Les métriques de surveillance et le plan de retour arrière sont prêts.",
    "La PR automatique est approuvée par une personne distincte du développeur.",
    "Le catalogue central contient les liens et preuves nécessaires."
  ],
  roles: {
    dev: {
      label: "Développeurs",
      modules: [
        {
          id: "dev-intention",
          title: "Qualifier le besoin avant de coder",
          summary: "Relier le flag à une décision explicite.",
          content:
            "Le développement commence seulement lorsque l'intention est claire : risque réduit, exposition contrôlée, expérimentation ou synchronisation avec une capacité métier. Sans cette intention, le flag risque de devenir une condition permanente difficile à retirer.",
          bullets: [
            "Valider le type de switch avec l'Architecture et les Affaires.",
            "Définir le comportement par défaut si LaunchDarkly est indisponible.",
            "Identifier le propriétaire et la date de retrait attendue."
          ],
          scenario:
            "Une équipe veut cacher une nouvelle étape d'inscription derrière un flag. Le bon réflexe est de confirmer si l'objectif est une livraison progressive, une activation métier à date fixe ou un simple mécanisme temporaire de mitigation.",
          quiz: {
            question: "Quel élément doit être décidé avant d'ajouter le flag au code ?",
            options: [
              "Le comportement par défaut et la stratégie de retrait.",
              "La couleur du bouton dans la console LaunchDarkly.",
              "Le nom de la branche Git seulement."
            ],
            answer: 0,
            feedback:
              "Correct. Le comportement par défaut et le retrait déterminent la sécurité opérationnelle du flag."
          }
        },
        {
          id: "dev-implementation",
          title: "Implanter un gating maintenable",
          summary: "Centraliser l'évaluation et tester les deux chemins.",
          content:
            "Le code doit limiter la propagation des conditions. Un service ou un adaptateur de feature management facilite les tests, les valeurs par défaut et le retrait futur.",
          bullets: [
            "Éviter les conditions LaunchDarkly directement dispersées dans les vues.",
            "Nommer le flag selon une convention stable et lisible.",
            "Ajouter des tests unitaires ou d'intégration pour les chemins on/off."
          ],
          scenario:
            "Si le flag protège une règle de calcul, l'évaluation doit se faire près de la règle et non dans plusieurs écrans. Le retrait sera alors plus simple lorsque la règle deviendra permanente.",
          quiz: {
            question: "Quelle pratique réduit le plus la dette technique liée aux flags ?",
            options: [
              "Centraliser l'évaluation et planifier le retrait.",
              "Créer un flag différent pour chaque composant visuel.",
              "Laisser le flag sans propriétaire pour éviter les dépendances."
            ],
            answer: 0,
            feedback:
              "Correct. La centralisation et le retrait planifié limitent les conditions oubliées."
          }
        },
        {
          id: "dev-controls",
          title: "Préparer les contrôles de livraison",
          summary: "Documenter PR, surveillance et retour arrière.",
          content:
            "Chez ExampleCo, la modification d'un flag entraîne une PR automatique qui doit être approuvée par une autre personne. Le développeur prépare les preuves et les observations nécessaires.",
          bullets: [
            "Lier le flag au catalogue central et aux artefacts de changement.",
            "Définir les métriques de santé, d'erreur et d'adoption.",
            "Documenter le retour arrière et le seuil d'arrêt."
          ],
          scenario:
            "Pour une livraison progressive, la PR seule ne suffit pas. L'équipe doit aussi avoir une Mise en Production, des seuils de surveillance et un mécanisme sur mesure adapté à l'exposition graduelle.",
          quiz: {
            question: "Qui doit approuver la PR automatique liée à une modification de flag ?",
            options: [
              "Une autre personne que le développeur.",
              "Le même développeur, si les tests passent.",
              "Personne, car le changement est dans LaunchDarkly."
            ],
            answer: 0,
            feedback:
              "Correct. La séparation des tâches soutient la conformité SOC2."
          },
          needsPlaceholder: true
        }
      ]
    },
    business: {
      label: "Product Owners et métiers",
      modules: [
        {
          id: "po-purpose",
          title: "Décider quand un toggle est justifié",
          summary: "Évaluer valeur, risque et responsabilité.",
          content:
            "Un toggle est justifié lorsqu'il permet une décision d'affaires contrôlée : activer à un moment précis, limiter l'exposition, réagir rapidement ou coordonner une communication.",
          bullets: [
            "Clarifier la population touchée et le résultat attendu.",
            "Confirmer si l'activation change l'expérience membre/client.",
            "Nommer la personne responsable de la décision d'activation."
          ],
          scenario:
            "Changer une date affichée dans un message peut être informationnel. Activer une nouvelle fonctionnalité à des membres exige un niveau de contrôle plus élevé.",
          quiz: {
            question: "Quel critère distingue souvent un switch informationnel ?",
            options: [
              "Il ajuste un message ou une date sans changer le comportement attendu.",
              "Il active automatiquement une nouvelle capacité transactionnelle.",
              "Il n'a jamais besoin d'être documenté."
            ],
            answer: 0,
            feedback:
              "Correct. Le switch informationnel reste limité à une information contrôlée."
          }
        },
        {
          id: "po-activation",
          title: "Activer ou désactiver avec prudence",
          summary: "Suivre le processus adapté au type de changement.",
          content:
            "L'activation doit respecter le type de switch. Un changement standard suit le chemin ServiceNow applicable. Une livraison progressive exige une Mise en Production et une surveillance plus serrée.",
          bullets: [
            "Vérifier l'approbation requise avant toute activation.",
            "Confirmer que les communications et le soutien sont prêts.",
            "Observer les indicateurs convenus après l'activation."
          ],
          scenario:
            "Un Product Owner souhaite passer de 10 % à 50 % d'exposition. Avant d'agir, il vérifie le plan de progression, le seuil d'arrêt et la preuve d'approbation.",
          quiz: {
            question: "Que faut-il vérifier avant d'augmenter une exposition progressive ?",
            options: [
              "Le plan de progression, les seuils et les approbations.",
              "Uniquement la disponibilité de la personne qui clique.",
              "Rien, car l'activation est réversible."
            ],
            answer: 0,
            feedback:
              "Correct. La réversibilité ne remplace pas le contrôle de changement."
          },
          needsPlaceholder: true
        },
        {
          id: "po-lifecycle",
          title: "Fermer la boucle après décision",
          summary: "Stabiliser, retirer et archiver.",
          content:
            "Une fois la décision prise, le toggle ne doit pas rester actif sans échéance. Le métier confirme le comportement final, puis l'équipe retire le code et ferme l'entrée de catalogue.",
          bullets: [
            "Confirmer le résultat final à conserver.",
            "Demander le retrait du flag lorsque le comportement est stabilisé.",
            "Conserver les décisions et preuves nécessaires à l'audit."
          ],
          scenario:
            "Après une activation complète sans incident, le Product Owner confirme que l'ancienne expérience n'est plus requise. L'équipe peut alors planifier le retrait technique.",
          quiz: {
            question: "Pourquoi retirer un toggle devenu permanent ?",
            options: [
              "Pour réduire la dette, les risques d'erreur et les ambiguïtés d'audit.",
              "Pour effacer toute trace de la décision.",
              "Parce que LaunchDarkly impose toujours un délai fixe."
            ],
            answer: 0,
            feedback:
              "Correct. Le retrait clarifie le système et ferme le cycle de gouvernance."
          }
        }
      ]
    }
  }
};
