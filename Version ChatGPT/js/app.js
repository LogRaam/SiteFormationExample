(function () {
  const data = window.LAUNCHDARKLY_TRAINING_DATA;
  const state = {
    role: "dev",
    moduleIndex: 0,
    completed: JSON.parse(localStorage.getItem("ld-training-progress") || "{}")
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function saveProgress() {
    localStorage.setItem("ld-training-progress", JSON.stringify(state.completed));
  }

  function placeholder() {
    return `<div class="placeholder-note"><strong>Note :</strong> ${data.placeholder.replace("Note : ", "")}</div>`;
  }

  function tags(items) {
    return `<div class="tag-list">${items.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`;
  }

  function renderReference() {
    $("#reference-grid").innerHTML = data.reference
      .map(
        (item) => `
          <article class="info-card">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
            ${tags(item.tags)}
            ${item.needsPlaceholder ? placeholder() : ""}
          </article>
        `
      )
      .join("");
  }

  function renderGovernance() {
    $("#governance-list").innerHTML = data.governance
      .map(
        (item, index) => `
          <article class="governance-item" data-step="${index + 1}">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
            ${tags(item.tags)}
            ${item.needsPlaceholder ? placeholder() : ""}
          </article>
        `
      )
      .join("");
  }

  function renderLifecycle() {
    $("#lifecycle-grid").innerHTML = data.lifecycle
      .map(
        (item) => `
          <article class="lifecycle-card">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
      )
      .join("");
  }

  function renderReadiness() {
    $("#readiness-checklist").innerHTML = data.readiness
      .map(
        (item, index) => `
          <label class="ready-item">
            <input type="checkbox" data-ready="${index}">
            <span>${item}</span>
          </label>
        `
      )
      .join("");
  }

  function roleProgress(role) {
    const modules = data.roles[role].modules;
    const done = modules.filter((module) => state.completed[module.id]).length;
    return Math.round((done / modules.length) * 100);
  }

  function renderModuleList() {
    const modules = data.roles[state.role].modules;
    $("#module-list").innerHTML = modules
      .map(
        (module, index) => `
          <button class="module-button ${index === state.moduleIndex ? "active" : ""} ${
          state.completed[module.id] ? "done" : ""
        }" type="button" data-module-index="${index}">
            <strong>${module.title}</strong>
            <span>${module.summary}</span>
            <span class="module-status">${state.completed[module.id] ? "Terminé" : "À compléter"}</span>
          </button>
        `
      )
      .join("");

    $$(".module-button").forEach((button) => {
      button.addEventListener("click", () => {
        state.moduleIndex = Number(button.dataset.moduleIndex);
        renderTraining();
      });
    });

    const progress = roleProgress(state.role);
    $("#progress-label").textContent = `${progress} %`;
    $("#progress-bar").style.width = `${progress}%`;
  }

  function renderModulePanel() {
    const module = data.roles[state.role].modules[state.moduleIndex];
    $("#module-panel").innerHTML = `
      <p class="eyebrow">${data.roles[state.role].label}</p>
      <h3>${module.title}</h3>
      <p>${module.content}</p>
      <ul>${module.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
      <div class="scenario">
        <strong>Mise en situation</strong>
        <p>${module.scenario}</p>
      </div>
      <div class="quiz-card">
        <strong>Quiz</strong>
        <p>${module.quiz.question}</p>
        <div class="quiz-options">
          ${module.quiz.options
            .map(
              (option, index) => `
                <button class="quiz-option" type="button" data-answer="${index}">
                  <span aria-hidden="true">${String.fromCharCode(65 + index)}.</span>
                  <span>${option}</span>
                </button>
              `
            )
            .join("")}
        </div>
        <div class="feedback" id="quiz-feedback" aria-live="polite"></div>
      </div>
      ${module.needsPlaceholder ? placeholder() : ""}
      <button class="button module-complete" type="button" id="complete-module">
        Marquer le module comme terminé
      </button>
    `;

    $$(".quiz-option").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = Number(button.dataset.answer);
        const isCorrect = selected === module.quiz.answer;
        $$(".quiz-option").forEach((option) => {
          option.classList.remove("correct", "incorrect");
          option.disabled = true;
        });
        button.classList.add(isCorrect ? "correct" : "incorrect");
        if (!isCorrect) {
          $(`.quiz-option[data-answer="${module.quiz.answer}"]`).classList.add("correct");
        }
        $("#quiz-feedback").textContent = isCorrect
          ? module.quiz.feedback
          : `À corriger. ${module.quiz.feedback}`;
      });
    });

    $("#complete-module").addEventListener("click", () => {
      state.completed[module.id] = true;
      saveProgress();
      renderTraining();
    });
  }

  function renderTraining() {
    $$(".role-tab").forEach((tab) => {
      const active = tab.dataset.role === state.role;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderModuleList();
    renderModulePanel();
  }

  function riskFromForm(form) {
    const type = form.type.value;
    const rollout = Number(form.rollout.value);
    const audience = form.audience.value;
    let score = Math.round(rollout / 10);

    if (type === "standard") score += 15;
    if (type === "progressif") score += 30;
    if (audience === "pilote") score += 10;
    if (audience === "membres") score += 25;
    if (!form.rollback.checked) score += 20;
    if (!form.monitoring.checked) score += 15;

    return Math.min(100, Math.max(5, score));
  }

  function renderSandbox() {
    const form = $("#flag-sandbox");
    const result = $("#sandbox-result");
    $("#rollout-value").textContent = `${form.rollout.value} %`;
    const risk = riskFromForm(form);
    const level = risk < 35 ? "Faible" : risk < 70 ? "Modéré" : "Élevé";
    const className = risk < 35 ? "risk-low" : risk < 70 ? "risk-medium" : "risk-high";
    const process =
      form.type.value === "informationnel"
        ? "Validation documentaire et entrée au catalogue central."
        : form.type.value === "standard"
          ? "Changement standard ServiceNow avec approbation selon le processus applicable."
          : "Mise en Production, progression contrôlée et mécanisme sur mesure hors ServiceNow.";

    result.innerHTML = `
      <h3>Évaluation simulée</h3>
      <div class="risk-meter">
        <strong>Risque ${level}</strong>
        <div class="risk-track" aria-hidden="true"><span class="${className}" style="width: ${risk}%"></span></div>
      </div>
      <p><strong>Processus recommandé :</strong> ${process}</p>
      <p><strong>Contrôles à confirmer :</strong> PR automatique approuvée par une autre personne, propriétaire dans le catalogue, seuil de retour arrière et preuve d'observation après activation.</p>
      ${form.type.value === "progressif" ? placeholder() : ""}
    `;
  }

  function bindNavigation() {
    const toggle = $(".nav-toggle");
    const links = $("#main-nav");
    toggle.addEventListener("click", () => {
      const open = !links.classList.contains("open");
      links.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#main-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function bindTraining() {
    $$(".role-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.role = tab.dataset.role;
        state.moduleIndex = 0;
        renderTraining();
      });
    });
  }

  function bindSandbox() {
    const form = $("#flag-sandbox");
    form.addEventListener("input", renderSandbox);
    form.addEventListener("change", renderSandbox);
  }

  function init() {
    renderReference();
    renderGovernance();
    renderLifecycle();
    renderReadiness();
    bindNavigation();
    bindTraining();
    bindSandbox();
    renderTraining();
    renderSandbox();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
