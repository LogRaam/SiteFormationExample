/* =========================================================================
   sandbox.js — Bac à sable : simulateur de déploiement progressif
   Indépendant, sans réseau. Pilote l'interface de pages/sandbox.html.

   Modèle SOC2 : un changement de contrôle est d'abord PROPOSÉ (état en
   attente, cellules grises). Il ne devient EFFECTIF (cellules vertes) qu'une
   fois la PR approuvée. Exception : le kill switch est instantané (urgence).
   ========================================================================= */
(function () {
  "use strict";
  if (!document.getElementById("sandbox")) return;

  var POP = 40; // population simulée (40 « membres »)
  var membres = [];

  function configDefaut() { return { actif: false, rollout: 0, cible: "tous", kill: false }; }
  function cloner(c) { return { actif: c.actif, rollout: c.rollout, cible: c.cible, kill: c.kill }; }

  var effectif = configDefaut();   // ce qui est réellement appliqué (approuvé)
  var enAttente = configDefaut();   // ce que proposent les contrôles
  var prNum = null;                 // numéro de la PR ouverte (le cas échéant)

  var elGrille = document.getElementById("sb-membres");
  var elJournal = document.getElementById("sb-journal");
  var elActif = document.getElementById("sb-actif");
  var elRollout = document.getElementById("sb-rollout");
  var elRolloutVal = document.getElementById("sb-rollout-val");
  var elKill = document.getElementById("sb-kill");
  var elExposes = document.getElementById("sb-exposes");
  var elEtatTexte = document.getElementById("sb-etat-texte");
  var elPrPanel = document.getElementById("sb-pr");

  // Hash entier à bon brassage (avalanche) -> bucket 0-99.
  // Décorrélé de la structure d'index, pour que le % de rollout s'applique
  // uniformément y compris à l'intérieur d'un segment (bêta, interne).
  function bucketDe(i) {
    var n = (i + 1) | 0;
    n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
    n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
    n = n ^ (n >>> 16);
    return (n >>> 0) % 100;
  }

  // Génère une population stable avec attributs.
  function genererMembres() {
    membres = [];
    for (var i = 0; i < POP; i++) {
      membres.push({
        id: i,
        bucket: bucketDe(i),                   // hash déterministe 0-99 pour le bucketing
        beta: i % 5 === 0,                     // 20 % de bêta-testeurs
        interne: i % 9 === 0 && i % 5 !== 0    // employés internes, sans recouvrement avec les bêta
      });
    }
  }

  // Exposition d'un membre pour une configuration donnée.
  function exposeAu(m, c) {
    if (c.kill || !c.actif) return false;
    if (c.cible === "beta" && !m.beta) return false;
    if (c.cible === "interne" && !m.interne) return false;
    return m.bucket < c.rollout;
  }

  // Y a-t-il une modification proposée non encore approuvée ?
  function changementEnAttente() {
    return effectif.actif !== enAttente.actif ||
           effectif.rollout !== enAttente.rollout ||
           effectif.cible !== enAttente.cible;
  }

  function rendre() {
    var nLive = 0, nProp = 0;
    elGrille.innerHTML = "";
    membres.forEach(function (m) {
      var live = exposeAu(m, effectif);
      var prop = exposeAu(m, enAttente);
      if (live) nLive++;
      if (prop && !live) nProp++;        // ajout proposé
      if (live && !prop) nProp++;        // retrait proposé (aussi « en attente »)

      var style, titreEtat;
      if (live && prop) {                 // exposé et approuvé : stable
        style = "background:var(--vert-600);color:#fff;border:1px solid var(--vert-700);";
        titreEtat = "exposé (approuvé)";
      } else if (prop && !live) {         // proposé à l'exposition, pas encore approuvé
        style = "background:var(--gris-300);color:var(--gris-700);border:2px dashed var(--gris-500);";
        titreEtat = "exposition proposée — en attente d'approbation";
      } else if (live && !prop) {         // proposé au retrait, pas encore approuvé
        style = "background:var(--gris-300);color:var(--gris-700);border:2px dashed var(--gris-500);";
        titreEtat = "retrait proposé — en attente d'approbation";
      } else {                            // non exposé
        style = "background:var(--gris-100);color:var(--gris-500);border:1px solid var(--bordure);";
        titreEtat = "non exposé";
      }

      var d = document.createElement("div");
      d.title = "Membre #" + m.id + (m.beta ? " · bêta" : "") + (m.interne ? " · interne" : "") +
                " · bucket " + m.bucket + " — " + titreEtat;
      d.style.cssText =
        "width:100%;aspect-ratio:1;border-radius:7px;display:grid;place-items:center;" +
        "font-size:.7rem;font-weight:700;transition:.2s;" + style;
      d.textContent = m.beta ? "β" : (m.interne ? "i" : "");
      elGrille.appendChild(d);
    });

    var pct = Math.round(nLive / POP * 100);
    elExposes.innerHTML = "<strong>" + nLive + " / " + POP + " exposés (" + pct + " %)</strong>" +
      (nProp > 0 ? ' &nbsp;·&nbsp; <span style="color:var(--gris-600,#6b7780)">' + nProp +
        " en attente d'approbation</span>" : "");

    var txt;
    if (effectif.kill) txt = "🛑 KILL SWITCH activé — fonctionnalité coupée pour tous";
    else if (changementEnAttente()) txt = "🟡 Modification proposée — non appliquée tant que la PR n'est pas approuvée";
    else if (!effectif.actif) txt = "⏸ Flag désactivé — personne n'est exposé";
    else txt = "🟢 Flag actif — exposition « " + effectif.cible + " » à " + effectif.rollout + " %";
    elEtatTexte.textContent = txt;
  }

  var horoCompteur = 0;
  function journal(msg) {
    var t = new Date();
    var hh = String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0") + ":" + String(t.getSeconds()).padStart(2, "0");
    var d = document.createElement("div");
    d.innerHTML = '<span class="t">[' + hh + "] </span>" + msg;
    elJournal.prepend(d);
  }

  // Décrit le changement proposé (effectif -> enAttente) en une phrase.
  function decrireProposition() {
    var parts = [];
    if (effectif.actif !== enAttente.actif) parts.push(enAttente.actif ? "activation du flag" : "désactivation du flag");
    if (effectif.cible !== enAttente.cible) parts.push("audience « " + enAttente.cible + " »");
    if (effectif.rollout !== enAttente.rollout) parts.push("rollout à " + enAttente.rollout + " %");
    return parts.length ? parts.join(", ") : "aucun changement";
  }

  // Met à jour / affiche la PR en attente selon l'état proposé.
  function rafraichirPR() {
    if (!elPrPanel) return;
    if (!changementEnAttente()) {           // plus de différence : pas de PR ouverte
      elPrPanel.innerHTML = "";
      prNum = null;
      return;
    }
    if (prNum === null) prNum = 1000 + (horoCompteur++);
    elPrPanel.innerHTML =
      '<div class="callout soc2" style="margin:0">' +
        '<strong>🔀 PR #' + prNum + ' — changement proposé (SOC2)</strong><br>' +
        "Modification : <em>" + decrireProposition() + "</em><br>" +
        '<span class="muted">⏳ En attente d\'approbation par une personne autre que l\'auteur. ' +
        "L'exposition n'est <strong>pas</strong> encore appliquée.</span> " +
        '<button class="btn btn-primaire" id="sb-approuver" style="margin-top:.6rem">✔ Approuver (réviseur)</button>' +
      "</div>";
    document.getElementById("sb-approuver").addEventListener("click", approuver);
  }

  function approuver() {
    var resume = decrireProposition();
    effectif = cloner(enAttente);            // le changement devient effectif
    journal("PR #" + prNum + " <strong>approuvée</strong> — changement appliqué : " + resume + ".");
    prNum = null;
    elPrPanel.innerHTML = '<div class="callout succes" style="margin:0"><strong>✅ Changement appliqué.</strong> L\'exposition reflète maintenant l\'état approuvé.</div>';
    FF.toast && FF.toast("Changement approuvé et appliqué (SOC2)");
    rendre();
  }

  // Un contrôle a modifié l'état proposé.
  function proposer(msg) {
    if (msg) journal(msg + ' <span class="muted">(proposé — en attente d\'approbation)</span>');
    rafraichirPR();
    rendre();
  }

  // ---- Écouteurs ----
  elActif.addEventListener("change", function () {
    enAttente.actif = elActif.checked;
    proposer("Flag « nouvelle-page-virements » " + (enAttente.actif ? "<strong>activé</strong>" : "désactivé"));
  });

  elRollout.addEventListener("input", function () {
    enAttente.rollout = parseInt(elRollout.value, 10);
    elRolloutVal.textContent = enAttente.rollout + " %";
    rendre(); // aperçu « en attente » pendant le glissement
  });
  elRollout.addEventListener("change", function () {
    proposer("Palier de déploiement ajusté à <strong>" + enAttente.rollout + " %</strong>");
  });

  document.querySelectorAll("[data-cible]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-cible]").forEach(function (x) { x.classList.remove("actif"); });
      b.classList.add("actif");
      enAttente.cible = b.getAttribute("data-cible");
      proposer("Audience cible : <strong>" + enAttente.cible + "</strong>");
    });
  });

  // Kill switch : action d'urgence, instantanée (exception au flux d'approbation).
  elKill.addEventListener("click", function () {
    var nouvelEtat = !effectif.kill;
    effectif.kill = nouvelEtat;
    enAttente.kill = nouvelEtat;
    elKill.textContent = nouvelEtat ? "♻ Réarmer" : "🛑 Kill switch";
    elKill.classList.toggle("btn-fantome", nouvelEtat);
    journal(nouvelEtat
      ? "<strong style='color:#ff8a8a'>KILL SWITCH</strong> — coupure immédiate, sans approbation (action d'urgence)."
      : "Kill switch réarmé.");
    if (nouvelEtat) FF.toast && FF.toast("Kill switch : fonctionnalité coupée immédiatement");
    rendre();
  });

  var reset = document.getElementById("sb-reset");
  if (reset) reset.addEventListener("click", function () {
    effectif = configDefaut();
    enAttente = configDefaut();
    prNum = null;
    elActif.checked = false; elRollout.value = 0; elRolloutVal.textContent = "0 %";
    elKill.textContent = "🛑 Kill switch"; elKill.classList.remove("btn-fantome");
    document.querySelectorAll("[data-cible]").forEach(function (x) { x.classList.toggle("actif", x.getAttribute("data-cible") === "tous"); });
    elJournal.innerHTML = "";
    if (elPrPanel) elPrPanel.innerHTML = "";
    journal("Simulateur réinitialisé.");
    rendre();
  });

  genererMembres();
  journal("Simulateur prêt. Proposez un changement, puis approuvez la PR pour l'appliquer.");
  rendre();
})();
