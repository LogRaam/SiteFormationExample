/* =========================================================================
   parcours.js — Logique commune des parcours de formation
   Progression persistée (localStorage), barre, état des modules, repli/dépli.
   Appeler FF.initParcours("dev") ou FF.initParcours("metier").
   ========================================================================= */
(function () {
  "use strict";
  window.FF = window.FF || {};

  FF.initParcours = function (nom) {
    var modules = document.querySelectorAll("#modules .module");
    if (!modules.length) return;
    var total = modules.length;
    var barre = document.getElementById("p-barre");
    var pct = document.getElementById("p-pct");
    var compte = document.getElementById("p-compte");
    var reset = document.getElementById("p-reset");
    var bravo = document.getElementById("p-bravo");

    var etat = FF.progres.lire(nom);

    function maj() {
      var faits = 0;
      modules.forEach(function (m) {
        var id = m.getAttribute("data-mod");
        var coche = m.querySelector("[data-fait]");
        var fait = !!etat[id];
        coche.checked = fait;
        m.classList.toggle("fait", fait);
        if (fait) faits++;
      });
      var p = Math.round(faits / total * 100);
      if (barre) barre.style.width = p + "%";
      if (pct) pct.textContent = p + " %";
      if (compte) compte.textContent = faits + " / " + total + " modules";
      if (bravo) bravo.style.display = faits === total ? "block" : "none";
    }

    modules.forEach(function (m) {
      var id = m.getAttribute("data-mod");
      var tete = m.querySelector(".module-tete");
      var corps = m.querySelector(".module-corps");
      var coche = m.querySelector("[data-fait]");

      // Repli / dépli au clic sur l'en-tête (hors interrupteur)
      corps.style.display = "none";
      tete.style.cursor = "pointer";
      tete.addEventListener("click", function (e) {
        if (e.target.closest(".switch")) return; // l'interrupteur ne replie pas
        var ouvert = corps.style.display !== "none";
        corps.style.display = ouvert ? "none" : "block";
      });

      coche.addEventListener("change", function () {
        etat = FF.progres.marquer(nom, id, coche.checked);
        maj();
        if (coche.checked) {
          corps.style.display = "none"; // on replie une fois validé
          FF.toast && FF.toast("Module validé ✔");
        }
      });
    });

    if (reset) reset.addEventListener("click", function () {
      FF.progres.reinitialiser(nom);
      etat = {};
      modules.forEach(function (m) { m.querySelector(".module-corps").style.display = "none"; });
      maj();
      FF.toast && FF.toast("Progression réinitialisée");
    });

    maj();
  };
})();
