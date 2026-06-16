/* =========================================================================
   quiz.js — Moteur de quiz pédagogique réutilisable
   Usage : <div class="quiz" data-quiz="dev-1"></div>  + données dans window.FF_QUIZ
   ========================================================================= */
(function () {
  "use strict";

  function lettre(i) { return String.fromCharCode(65 + i); }

  function rendreQuestion(hote, jeu, idx, etat) {
    var q = jeu.questions[idx];
    var total = jeu.questions.length;
    var pct = Math.round((idx) / total * 100);

    hote.innerHTML =
      '<div class="quiz-tete">' +
        '<span class="tag">' + (jeu.titre || "Quiz") + '</span>' +
        '<span class="quiz-progress">Question ' + (idx + 1) + ' / ' + total + '</span>' +
      '</div>' +
      '<div class="barre"><span style="width:' + pct + '%"></span></div>' +
      '<div class="quiz-q">' + q.q + '</div>' +
      '<div class="quiz-options" role="group"></div>' +
      '<div class="quiz-explication" id="expl"></div>' +
      '<div class="quiz-pied">' +
        '<span class="muted" id="indice"></span>' +
        '<button class="btn btn-primaire" id="suivant" disabled>' +
          (idx + 1 === total ? "Voir le résultat" : "Question suivante") + " →</button>" +
      "</div>";

    var optWrap = hote.querySelector(".quiz-options");
    q.options.forEach(function (txt, i) {
      var b = document.createElement("button");
      b.className = "quiz-opt";
      b.innerHTML = '<span class="lettre">' + lettre(i) + "</span><span>" + txt + "</span>";
      b.addEventListener("click", function () { repondre(i); });
      optWrap.appendChild(b);
    });

    var repondu = false;
    function repondre(choix) {
      if (repondu) return;
      repondu = true;
      var boutons = optWrap.querySelectorAll(".quiz-opt");
      boutons.forEach(function (b, i) {
        b.disabled = true;
        if (i === q.bonne) b.classList.add("bon");
        if (i === choix && choix !== q.bonne) b.classList.add("mauvais");
      });
      var juste = choix === q.bonne;
      if (juste) etat.score++;
      var expl = hote.querySelector("#expl");
      expl.innerHTML = (juste ? "<strong>✔ Exact. </strong>" : "<strong>Réponse : " + lettre(q.bonne) + ". </strong>") + (q.explication || "");
      expl.classList.add("visible");
      hote.querySelector("#suivant").disabled = false;
      hote.querySelector("#indice").textContent = juste ? "Bonne réponse" : "À revoir";
    }

    hote.querySelector("#suivant").addEventListener("click", function () {
      if (idx + 1 < total) rendreQuestion(hote, jeu, idx + 1, etat);
      else rendreResultat(hote, jeu, etat);
    });
  }

  function rendreResultat(hote, jeu, etat) {
    var total = jeu.questions.length;
    var pct = Math.round(etat.score / total * 100);
    var msg = pct >= 80 ? "Excellent — vous maîtrisez le sujet."
      : pct >= 50 ? "Bon début. Revoyez les points manqués."
      : "À consolider. Reprenez la section avant de poursuivre.";
    hote.innerHTML =
      '<div class="quiz-resultat">' +
        '<div class="quiz-score">' + pct + '%<br><small>' + etat.score + " / " + total + " bonnes réponses</small></div>" +
        "<p class=\"mt-1\">" + msg + "</p>" +
        '<button class="btn btn-secondaire" id="rejouer">↻ Recommencer</button>' +
      "</div>";
    hote.querySelector("#rejouer").addEventListener("click", function () {
      etat.score = 0; rendreQuestion(hote, jeu, 0, etat);
    });
    hote.dispatchEvent(new CustomEvent("quiz:termine", { bubbles: true, detail: { pct: pct, score: etat.score, total: total } }));
  }

  function init() {
    var hotes = document.querySelectorAll(".quiz[data-quiz]");
    hotes.forEach(function (hote) {
      var id = hote.getAttribute("data-quiz");
      var jeu = (window.FF_QUIZ || {})[id];
      if (!jeu) { hote.innerHTML = '<p class="muted">Quiz indisponible (' + id + ").</p>"; return; }
      rendreQuestion(hote, jeu, 0, { score: 0 });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
