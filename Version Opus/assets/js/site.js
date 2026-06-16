/* =========================================================================
   site.js — Ossature commune du site (header, footer, thème, navigation)
   Injecté en JS pour rester DRY sans étape de build et sans fetch
   (fonctionne donc directement en file://).
   ========================================================================= */
(function () {
  "use strict";

  // Détermine la racine relative selon la profondeur de la page courante.
  var dansPages = /\/pages\//.test(location.pathname) || /[\\/]pages[\\/]/.test(location.href);
  var base = dansPages ? "../" : "./";

  // Structure de navigation centralisée — un seul endroit à maintenir.
  var nav = [
    { href: "index.html", label: "Accueil", racine: true },
    { href: "pages/concepts.html", label: "Concepts" },
    { href: "pages/pourquoi.html", label: "Pourquoi" },
    { href: "pages/operationnaliser.html", label: "Mise en œuvre" },
    { href: "pages/cycle-de-vie.html", label: "Cycle de vie" },
    { href: "pages/exampleco.html", label: "Chez ExampleCo" },
    {
      label: "Formation", menu: [
        { href: "pages/parcours-dev.html", label: "Parcours Développeurs", desc: "Mettre en place un toggle techniquement" },
        { href: "pages/parcours-metier.html", label: "Parcours Métier / PO", desc: "Activer et piloter un toggle en toute sécurité" },
        { href: "pages/toggle-ready.html", label: "Être « Toggle Ready »", desc: "Bonnes pratiques & gating" },
        { href: "pages/sandbox.html", label: "Bac à sable interactif", desc: "Simuler un déploiement progressif" },
        { href: "pages/glossaire.html", label: "Glossaire", desc: "Le vocabulaire essentiel" }
      ]
    }
  ];

  var pageCourante = document.body.getAttribute("data-page") || "";

  function lien(item) {
    var actif = item.href && hrefBase(item.href) === pageCourante ? ' class="actif"' : "";
    return '<a href="' + base + item.href + '"' + actif + '>' + item.label + "</a>";
  }
  function hrefBase(h) { return h.split("/").pop().replace(".html", ""); }

  function construireNav() {
    var html = "";
    nav.forEach(function (item) {
      if (item.menu) {
        html += '<div class="has-menu"><a href="#" class="menu-parent">' + item.label + " ▾</a>";
        html += '<div class="dropdown">';
        item.menu.forEach(function (sub) {
          html += '<a href="' + base + sub.href + '">' + sub.label +
            (sub.desc ? "<small>" + sub.desc + "</small>" : "") + "</a>";
        });
        html += "</div></div>";
      } else {
        html += lien(item);
      }
    });
    return html;
  }

  var header =
    '<a class="skip-link" href="#contenu">Aller au contenu</a>' +
    '<header class="site-header"><nav class="nav" aria-label="Navigation principale">' +
      '<a class="brand" href="' + base + 'index.html">' +
        '<span class="logo" aria-hidden="true">FF</span>' +
        '<span>Feature Flags<small>LaunchDarkly · ExampleCo</small></span>' +
      '</a>' +
      '<button class="nav-btn menu-toggle" id="menuToggle" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>' +
      '<div class="nav-links" id="navLinks">' + construireNav() + '</div>' +
      '<button class="nav-btn" id="themeToggle" aria-label="Basculer le thème" title="Thème clair / sombre">🌓</button>' +
    '</nav></header>';

  var annee = new Date().getFullYear();
  var footer =
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
        '<div>' +
          '<h4>Formation Feature Flags</h4>' +
          '<p style="opacity:.9;font-size:.92rem;max-width:38ch">Référence documentaire et parcours de formation interactif sur l\'usage des Feature Toggles avec LaunchDarkly, adapté au contexte de gouvernance de ExampleCo.</p>' +
        '</div>' +
        '<div><h4>Comprendre</h4><ul>' +
          '<li><a href="' + base + 'pages/concepts.html">Concepts</a></li>' +
          '<li><a href="' + base + 'pages/pourquoi.html">Pourquoi un toggle</a></li>' +
          '<li><a href="' + base + 'pages/operationnaliser.html">Mise en œuvre</a></li>' +
          '<li><a href="' + base + 'pages/cycle-de-vie.html">Cycle de vie</a></li>' +
        '</ul></div>' +
        '<div><h4>Se former</h4><ul>' +
          '<li><a href="' + base + 'pages/parcours-dev.html">Parcours Développeurs</a></li>' +
          '<li><a href="' + base + 'pages/parcours-metier.html">Parcours Métier / PO</a></li>' +
          '<li><a href="' + base + 'pages/toggle-ready.html">Toggle Ready</a></li>' +
          '<li><a href="' + base + 'pages/sandbox.html">Bac à sable</a></li>' +
          '<li><a href="' + base + 'pages/glossaire.html">Glossaire</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bas">' +
        '<span>© ' + annee + ' · Document de formation interne. Usage pédagogique.</span>' +
        '<span>Ton : gouvernance · conformité · gestion du risque</span>' +
      '</div>' +
    '</div></footer>';

  // Injection
  var slotHeader = document.getElementById("site-header");
  var slotFooter = document.getElementById("site-footer");
  if (slotHeader) slotHeader.outerHTML = header;
  if (slotFooter) slotFooter.outerHTML = footer;

  // ---- Thème clair / sombre ----
  function appliquerTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("ff-theme", t); } catch (e) {}
  }
  var themePref = "clair";
  try { themePref = localStorage.getItem("ff-theme") || "clair"; } catch (e) {}
  appliquerTheme(themePref);

  // ---- Interactions (après injection) ----
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("#themeToggle") : null;
    if (t) {
      var actuel = document.documentElement.getAttribute("data-theme");
      appliquerTheme(actuel === "sombre" ? "clair" : "sombre");
    }
    var mt = e.target.closest ? e.target.closest("#menuToggle") : null;
    if (mt) {
      var links = document.getElementById("navLinks");
      var ouvert = links.classList.toggle("ouvert");
      mt.setAttribute("aria-expanded", ouvert ? "true" : "false");
    }
    var mp = e.target.closest ? e.target.closest(".menu-parent") : null;
    if (mp) {
      e.preventDefault();
      mp.parentElement.classList.toggle("ouvert");
    }
    // Onglets génériques : .tabs-nav button[data-tab] -> .tab-panel[data-panel]
    var tabBtn = e.target.closest ? e.target.closest(".tabs-nav button[data-tab]") : null;
    if (tabBtn) {
      var conteneur = tabBtn.closest(".tabs");
      var cible = tabBtn.getAttribute("data-tab");
      conteneur.querySelectorAll(".tabs-nav button").forEach(function (x) { x.classList.remove("actif"); });
      conteneur.querySelectorAll(".tab-panel").forEach(function (x) { x.classList.remove("actif"); });
      tabBtn.classList.add("actif");
      var panneau = conteneur.querySelector('.tab-panel[data-panel="' + cible + '"]');
      if (panneau) panneau.classList.add("actif");
    }
  });

  // Expose un petit utilitaire de progression réutilisable par les parcours.
  window.FF = window.FF || {};
  window.FF.progres = {
    cle: function (parcours) { return "ff-progres-" + parcours; },
    lire: function (parcours) {
      try { return JSON.parse(localStorage.getItem(this.cle(parcours)) || "{}"); }
      catch (e) { return {}; }
    },
    marquer: function (parcours, moduleId, fait) {
      var etat = this.lire(parcours);
      etat[moduleId] = !!fait;
      try { localStorage.setItem(this.cle(parcours), JSON.stringify(etat)); } catch (e) {}
      return etat;
    },
    reinitialiser: function (parcours) {
      try { localStorage.removeItem(this.cle(parcours)); } catch (e) {}
    }
  };

  window.FF.toast = function (msg) {
    var el = document.createElement("div");
    el.className = "toast"; el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("visible"); });
    setTimeout(function () {
      el.classList.remove("visible");
      setTimeout(function () { el.remove(); }, 350);
    }, 2600);
  };
})();
