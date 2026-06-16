/* =========================================================================
   quiz-data.js — Banque de questions des quiz (français)
   Note : les questions sont indicatives et alignées sur le contenu pédagogique.
   À compléter / valider avec les références internes ExampleCo.
   ========================================================================= */
window.FF_QUIZ = {

  "dev-1": {
    titre: "Développeurs · Concepts",
    questions: [
      {
        q: "Quel est l'intérêt principal de découpler le déploiement du code de l'activation d'une fonctionnalité ?",
        options: [
          "Réduire la taille du binaire livré",
          "Pouvoir livrer du code en production sans l'exposer, et contrôler l'activation indépendamment",
          "Éviter d'écrire des tests automatisés",
          "Supprimer le besoin de revue de code"
        ],
        bonne: 1,
        explication: "Le feature toggle permet de livrer du code « dormant » et d'en piloter l'exposition (qui, quand, combien) sans nouveau déploiement."
      },
      {
        q: "Un toggle de type « release » (livraison progressive) sert surtout à :",
        options: [
          "Configurer des préférences utilisateur permanentes",
          "Activer une nouvelle fonctionnalité graduellement (canari, %, segments) puis le retirer",
          "Stocker des secrets applicatifs",
          "Remplacer la gestion de configuration d'environnement"
        ],
        bonne: 1,
        explication: "Un toggle de release est temporaire : on l'utilise le temps du déploiement progressif, puis on le retire (cleanup)."
      },
      {
        q: "Quelle est la bonne valeur par défaut (fallback) lorsqu'on évalue un flag ?",
        options: [
          "Toujours « activé » pour tester en production",
          "La valeur qui correspond au comportement sûr et existant si le service de flags est indisponible",
          "Une valeur aléatoire",
          "Peu importe, le SDK gère tout"
        ],
        bonne: 1,
        explication: "Le code doit toujours fournir une valeur par défaut sécuritaire : en cas d'indisponibilité, l'application reste dans un état connu et stable."
      },
      {
        q: "Pourquoi éviter d'imbriquer trop de toggles les uns dans les autres ?",
        options: [
          "Cela ralentit le compilateur",
          "L'explosion combinatoire rend les états difficiles à tester et à raisonner",
          "LaunchDarkly l'interdit techniquement",
          "Cela double les coûts de licence"
        ],
        bonne: 1,
        explication: "Chaque toggle multiplie les chemins d'exécution. Trop d'imbrication = combinaisons ingérables et risque de régression."
      },
      {
        q: "Que signifie « Toggle Ready » pour une équipe de développement ?",
        options: [
          "Avoir installé le SDK uniquement",
          "Concevoir, nommer, tester, gater et planifier le retrait des toggles de façon disciplinée",
          "Activer tous les flags en production",
          "Ne jamais retirer un toggle"
        ],
        bonne: 1,
        explication: "Être Toggle Ready, c'est intégrer le cycle de vie complet : convention de nommage, valeur par défaut, tests des deux états, propriétaire et date de retrait."
      }
    ]
  },

  "metier-1": {
    titre: "Métier / PO · Pilotage",
    questions: [
      {
        q: "En tant que Product Owner, quel est votre rôle principal vis-à-vis d'un feature toggle ?",
        options: [
          "Écrire le code d'évaluation du flag",
          "Décider quand et pour qui la fonctionnalité est exposée, selon la valeur d'affaires et le risque",
          "Gérer l'infrastructure serveur",
          "Approuver techniquement la Pull Request"
        ],
        bonne: 1,
        explication: "Le PO porte la décision d'activation (timing, audience, critères de succès). La mise en œuvre technique reste à l'équipe de développement."
      },
      {
        q: "Chez ExampleCo, que se passe-t-il automatiquement lorsqu'un flag est modifié ?",
        options: [
          "Rien, le changement est instantané et silencieux",
          "Une Pull Request est créée automatiquement et doit être approuvée par une autre personne (SOC2)",
          "Le serveur redémarre",
          "Le flag est supprimé après 24 h"
        ],
        bonne: 1,
        explication: "Exigence SOC2 : chaque modification de flag génère une PR qui doit être approuvée par une personne différente de l'auteur (séparation des tâches)."
      },
      {
        q: "Une « switch informationnelle » (ex. changement de message ou de date) correspond à :",
        options: [
          "Une livraison progressive exigeant une mise en production",
          "Un changement standard via ServiceNow",
          "Un changement qui n'exige pas de demande de changement formelle",
          "Une suppression de fonctionnalité"
        ],
        bonne: 2,
        explication: "Les switches informationnelles (message, date d'affichage…) sont à faible risque et ne nécessitent pas de demande de changement."
      },
      {
        q: "Pour une activation à risque, quelle est la meilleure pratique de pilotage ?",
        options: [
          "Activer à 100 % immédiatement pour tous les membres",
          "Procéder par déploiement progressif (ex. 1 % → 10 % → 50 % → 100 %) en surveillant les indicateurs",
          "Activer seulement la nuit sans surveillance",
          "Demander au développeur de tester en production sans suivi"
        ],
        bonne: 1,
        explication: "Le déploiement progressif limite le rayon d'impact : on augmente l'exposition par paliers en surveillant erreurs et métriques d'affaires, prêt à revenir en arrière (kill switch)."
      },
      {
        q: "Qu'est-ce qu'un « kill switch » du point de vue métier ?",
        options: [
          "Un bouton pour supprimer définitivement le code",
          "La capacité de désactiver rapidement une fonctionnalité problématique sans redéploiement",
          "Un test de charge",
          "Une fonctionnalité réservée aux administrateurs système"
        ],
        bonne: 1,
        explication: "Le kill switch permet de couper instantanément une fonctionnalité défaillante, réduisant le temps de réaction en cas d'incident."
      }
    ]
  },

  "exampleco-1": {
    titre: "Spécificités ExampleCo",
    questions: [
      {
        q: "Les trois types de switches du catalogue sont :",
        options: [
          "Bleu, vert, rouge",
          "Informationnelle · changement standard (ServiceNow) · livraison progressive (mise en production)",
          "Local, régional, national",
          "Test, staging, production"
        ],
        bonne: 1,
        explication: "Le catalogue distingue : switches informationnelles, switches via changement standard ServiceNow, et switches de livraison progressive (système sur mesure)."
      },
      {
        q: "Pourquoi les livraisons progressives utilisent-elles un système sur mesure plutôt que ServiceNow ?",
        options: [
          "Parce que ServiceNow est trop cher",
          "Parce que ServiceNow n'est pas conçu pour gérer un déploiement progressif exigeant une mise en production",
          "Parce que ServiceNow est interdit",
          "Parce que personne ne sait l'utiliser"
        ],
        bonne: 1,
        explication: "ServiceNow couvre bien le changement standard, mais la mécanique d'une livraison progressive (paliers, MEP) requiert un outillage adapté."
      },
      {
        q: "Le catalogue central de toggle switches sert principalement à :",
        options: [
          "Stocker les mots de passe",
          "Recenser, classer et gouverner l'ensemble des switches de l'organisation",
          "Remplacer LaunchDarkly",
          "Générer du code automatiquement"
        ],
        bonne: 1,
        explication: "Le catalogue central offre une vue unique pour gouverner les switches : type, propriétaire, statut, conformité."
      }
    ]
  },

  "go-toggle-1": {
    titre: "Parcours Go Toggle",
    questions: [
      {
        q: "Quel est le prérequis obligatoire pour obtenir l'accès à LaunchDarkly chez ExampleCo ?",
        options: [
          "Avoir créé au moins un flag",
          "Compléter la formation CTI-4120",
          "Être Product Owner",
          "Avoir approuvé une Pull Request"
        ],
        bonne: 1,
        explication: "La formation CTI-4120 est obligatoire pour obtenir l'accès à LaunchDarkly : c'est la porte d'entrée du parcours Go Toggle."
      },
      {
        q: "Sur quoi repose le ciblage d'un flag ?",
        options: [
          "Uniquement sur le numéro de version de l'application",
          "Sur les règles de ciblage (target rules), les segments et les contextes",
          "Sur la taille du fichier déployé",
          "Sur l'ordre alphabétique des membres"
        ],
        bonne: 1,
        explication: "Le ciblage combine le contexte (attributs de l'entité évaluée), les segments (groupes réutilisables) et les règles de ciblage qui décident quelle variation servir."
      },
      {
        q: "À quoi servent les environnements (ex. Test, Production) dans LaunchDarkly ?",
        options: [
          "À stocker le code source",
          "À donner au même flag des valeurs, règles et clés SDK distinctes selon l'environnement",
          "À remplacer les segments",
          "À supprimer automatiquement les flags obsolètes"
        ],
        bonne: 1,
        explication: "Chaque environnement possède sa propre clé SDK et ses propres valeurs/règles : un flag peut être « on » en Test et « off » en Production."
      },
      {
        q: "Au moment de la mise en production, dans quel état déploie-t-on le flag ?",
        options: [
          "Activé à 100 % pour tous",
          "« Off » — le code part en production sans être exposé (déployer ≠ exposer)",
          "Supprimé",
          "Peu importe, la MEP l'active automatiquement"
        ],
        bonne: 1,
        explication: "On déploie le code « éteint », sur sa valeur par défaut sûre. L'exposition est ensuite pilotée séparément, sans nouvelle MEP."
      },
      {
        q: "Parmi les capsules optionnelles, laquelle n'est pas attendue avant 2027 ?",
        options: [
          "Le test A/B",
          "L'activation progressive",
          "Le kill switch",
          "Le guarded rollout"
        ],
        bonne: 3,
        explication: "Le guarded rollout (déploiement progressif automatisé et encadré par des garde-fous) n'est pas attendu avant 2027 chez ExampleCo."
      }
    ]
  }
};
