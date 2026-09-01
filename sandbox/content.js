// content.js
// Orchestrates field enhancement, modal, and side panel.
// Loaded automatically on planwithvoyant.co.uk via content_scripts.
// Checks chrome.storage.local on load to decide whether to activate.

(() => {
  if (window.__shackademyInitialised) return;
  window.__shackademyInitialised = true;

  const STORAGE_KEY = "shackademyEnabled";

  // Check storage on load — activate immediately if enabled
  chrome.storage.local.get(STORAGE_KEY, (result) => {
    if (result[STORAGE_KEY] === true) {
      init();
    }
  });

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------
  const ENHANCED_ATTR = "data-shackademy-enhanced";
  const MODAL_ID = "shackademy-modal";
  const BACKDROP_ID = "shackademy-backdrop";
  const PANEL_ID = "shackademy-panel";
  const BADGE_CLASS = "shackademy-badge";
  const KEEP_PANEL_OPEN_WITHOUT_FIELDS_TABS = new Set(
    Object.keys(window.TAB_LABELS || {}),
  );

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------
  const fieldMap = new Map(
    (window.SHACKADEMY_FIELDS || []).map((f) => [f.key, f]),
  );
  const lessonMap = window.SHACKADEMY_LESSONS || {};
  const sectionMap = window.SHACKADEMY_SECTIONS || {};

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  let userClosedPanel = false;
  let isPinned = false;
  let disclaimerShownOnce = false; // tracks if shown at least once this session
  let currentSectionKey = null;
  let currentTabKey = null;
  let currentItemId = null;
  let userOpenedEmptyPanel = false;
  const visibleFields = new Map(); // key -> { field, el }

  // ---------------------------------------------------------------------------
  // Pin / unpin helpers
  // ---------------------------------------------------------------------------

  function applyPinned() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) return;
    document.body.style.setProperty("margin-right", "260px", "important");
    document.body.style.setProperty("overflow-x", "hidden", "important");
    panel.classList.add("shackademy-pinned");
    panel.classList.remove("shackademy-floating");
    isPinned = true;
    const pinBtn = panel.querySelector("#shackademy-pin-btn");
    if (pinBtn) pinBtn.title = "Unpin panel";
    if (pinBtn) pinBtn.innerHTML = "📌";
    // Adjust footer to not overlap sidebar
    document
      .getElementById(DISCLAIMER_ID)
      ?.classList.add("shackademy-disclaimer--pinned");
  }

  function applyFloating() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) return;
    document.body.style.removeProperty("margin-right");
    document.body.style.removeProperty("overflow-x");
    panel.classList.remove("shackademy-pinned");
    panel.classList.add("shackademy-floating");
    isPinned = false;
    const pinBtn = panel.querySelector("#shackademy-pin-btn");
    if (pinBtn) pinBtn.title = "Pin panel";
    if (pinBtn) pinBtn.innerHTML = "📍";
    // Restore footer to full width
    document
      .getElementById(DISCLAIMER_ID)
      ?.classList.remove("shackademy-disclaimer--pinned");
  }

  function clearPinState() {
    document.body.style.removeProperty("margin-right");
    document.body.style.removeProperty("overflow-x");
    document
      .getElementById(DISCLAIMER_ID)
      ?.classList.remove("shackademy-disclaimer--pinned");
    isPinned = false;
  }

  // ---------------------------------------------------------------------------
  // Disclaimer footer
  // ---------------------------------------------------------------------------

  const DISCLAIMER_ID = "shackademy-disclaimer";
  const DISCLAIMER_PARA =
    "Shackademy accepts no responsibility for the accuracy of any tax calculations, assumptions, or models produced by Voyant. All tips, guides, and content within the Shackademy extension are provided for information purposes only and do not constitute personal financial advice. Prevailing tax rates and reliefs depend on individual circumstances and may change. Shackademy does not provide tax advice. <strong>Capital at risk.</strong>";
  const DISCLAIMER_POINTS = [
    "Shackademy accepts no responsibility for the accuracy of any tax calculations, assumptions, or models produced by Voyant. All tips, guides, and content within the Shackademy extension are provided for information purposes only and do not constitute personal financial advice.",
    "Prevailing tax rates and reliefs depend on individual circumstances and may change. Shackademy does not provide tax advice.",
    "<strong>Capital at risk.</strong>",
  ];

  function createDisclaimerFooter() {
    if (document.getElementById(DISCLAIMER_ID)) return;

    const footer = document.createElement("div");
    footer.id = DISCLAIMER_ID;
    footer.className = "shackademy-disclaimer";
    footer.innerHTML = `
      <div class="shackademy-disclaimer-full">
        <div class="shackademy-disclaimer-text">${DISCLAIMER_PARA}</div>
      </div>
    `;

    document.body.appendChild(footer);
    updateBodyPadding();
  }

  function showDisclaimerFooter() {
    const footer = document.getElementById(DISCLAIMER_ID);
    if (!footer) {
      createDisclaimerFooter();
      return;
    }
    footer.hidden = false;
    updateBodyPadding();
  }

  function hideDisclaimerFooter() {
    const footer = document.getElementById(DISCLAIMER_ID);
    if (footer) {
      footer.hidden = true;
      updateBodyPadding();
    }
  }

  function updateBodyPadding() {
    const footer = document.getElementById(DISCLAIMER_ID);
    if (!footer || footer.hidden) {
      document.body.style.removeProperty("padding-bottom");
      return;
    }
    const height = footer.offsetHeight;
    document.body.style.setProperty(
      "padding-bottom",
      height + "px",
      "important",
    );
  }

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------

  function getLabelKey(labelEl) {
    return labelEl.getAttribute("for") || labelEl.getAttribute("id") || null;
  }

  // Column header targets are matched by their own text combined with the
  // aria-label of the ancestor role="table" wrapper, since Voyant gives each
  // Year View variant (Investment Details, Pension Details, etc.) its own
  // aria-label, and the header divs themselves carry no id/for.
  function getColumnHeaderKey(el) {
    const table = el.closest('[role="table"][aria-label]');
    if (!table) return null;
    const tableLabel = table.getAttribute("aria-label");
    const text = el.textContent.trim().replace(/\s+/g, " ");
    const match = (window.SHACKADEMY_COLUMN_HEADERS || []).find(
      (c) => c.tableLabel === tableLabel && c.columnText === text,
    );
    return match ? match.key : null;
  }

  function getTargetKey(el) {
    if (el.tagName === "LABEL") {
      return getLabelKey(el);
    }
    if (el.getAttribute("role") === "columnheader") {
      return getColumnHeaderKey(el);
    }
    return null;
  }

  // Reads the tax year off Voyant's year selector (data-test-year) and
  // returns tokens for substitution into help text. Returns null if not found.
  function getCurrentTaxYear() {
    const el = document.querySelector("[data-test-year]");
    if (!el) return null;
    const year = parseInt(el.getAttribute("data-test-year"), 10);
    return Number.isNaN(year) ? null : year;
  }

  function interpolateHelpText(html) {
    const year = getCurrentTaxYear();
    if (year === null) return html;
    const nextYearShort = String(year + 1).slice(-2);
    return html
      .replace(/\{\{TAX_YEAR\}\}/g, year)
      .replace(/\{\{TAX_YEAR_RANGE\}\}/g, `${year}/${nextYearShort}`);
  }

  // Rewrites Voyant's year dropdown label (e.g. "2026") to a tax year range
  // (e.g. "2026/27"), based on the data-test-year attribute. Re-run on every
  // enhancement pass so it stays correct if the user changes year.
  function updateYearLabels() {
    document.querySelectorAll("[data-test-year]").forEach((wrapper) => {
      const year = parseInt(wrapper.getAttribute("data-test-year"), 10);
      if (Number.isNaN(year)) return;

      const label = wrapper.querySelector(
        "button[data-dropdown-button] > span",
      );
      if (!label) return;

      const nextYearShort = String(year + 1).slice(-2);
      const expected = `${year}/${nextYearShort}`;

      if (label.textContent.trim() !== expected) {
        label.textContent = expected;
      }
    });
  }

  function toEmbedUrl(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      let id = null;
      if (u.hostname.includes("youtu.be")) {
        id = u.pathname.slice(1);
      } else if (u.pathname.startsWith("/embed/")) {
        return url;
      } else {
        id = u.searchParams.get("v");
      }
      return id ? `https://www.youtube.com/embed/${id}` : null;
    } catch {
      return null;
    }
  }

  // Extract segments from Voyant's hash URL
  // Hash format: #/userId/planId/edit/itemId/tab
  // Year View has its own shorter route: #/userId/planId/year-view
  function parseHash() {
    const parts = window.location.hash.split("/");
    if (parts[3] === "year-view") {
      return { itemId: null, tab: null, isYearView: true };
    }
    return {
      itemId: parts.length >= 5 ? parts[4] : null,
      tab: parts.length >= 6 ? parts[5].toLowerCase() : null,
      isYearView: false,
    };
  }

  // ---------------------------------------------------------------------------
  // Context detection
  // ---------------------------------------------------------------------------

  function detectPageContext() {
    const { itemId: newItemId, tab: newTab, isYearView } = parseHash();

    if (isYearView) {
      currentItemId = null;
      currentTabKey = null;
      currentSectionKey = "yearView";
      updateContextPanel();
      return;
    }

    // Tab changed within same item - update tab key and re-render, keep section
    if (newItemId && newItemId === currentItemId && currentSectionKey) {
      currentTabKey = newTab;
      updateContextPanel();
      return;
    }

    // ItemId changed - scan DOM for a new type indicator
    currentItemId = newItemId;
    currentTabKey = newTab;
    currentSectionKey = null;

    for (const [sectionKey, config] of Object.entries(sectionMap)) {
      if (config.typeIndicator) {
        const el = document.querySelector(
          `label[for="${config.typeIndicator}"], label[id="${config.typeIndicator}"]`,
        );
        if (el) {
          currentSectionKey = sectionKey;
          break;
        }
      }
    }

    updateContextPanel();
  }

  function getCurrentTabConfig() {
    const section = currentSectionKey ? sectionMap[currentSectionKey] : null;
    if (!section) return null;

    const tabKey = currentTabKey || "basics";
    return section.tabs?.[tabKey] || section.tabs?.["basics"] || null;
  }

  function keepPanelOpenWithoutFields() {
    // The Monte Carlo chart page has no help fields of its own, but the
    // Longevity tab is the whole point of being there, so keep the panel open.
    if (window.SHACKADEMY_LONGEVITY_UI?.hasChart()) return true;

    const section = currentSectionKey ? sectionMap[currentSectionKey] : null;
    if (!section) return false;

    const tabConfig = getCurrentTabConfig();
    const tabKey = currentTabKey || "basics";

    return (
      KEEP_PANEL_OPEN_WITHOUT_FIELDS_TABS.has(tabKey) ||
      section?.keepPanelOpenWithoutFields === true ||
      tabConfig?.keepPanelOpenWithoutFields === true
    );
  }

  function closePanelAndClearPadding() {
    const panel = document.getElementById(PANEL_ID);
    userOpenedEmptyPanel = false;
    clearPinState();
    panel?.classList.add("hidden");
    hideDisclaimerFooter();
  }

  // ---------------------------------------------------------------------------
  // Field enhancement
  // ---------------------------------------------------------------------------

  function findTargets() {
    const labels = Array.from(document.querySelectorAll("label")).filter(
      (el) => {
        const key = getTargetKey(el);
        return key && fieldMap.has(key);
      },
    );
    const columnHeaders = Array.from(
      document.querySelectorAll('div[role="columnheader"]'),
    ).filter((el) => {
      const key = getTargetKey(el);
      return key && fieldMap.has(key);
    });
    return [...labels, ...columnHeaders];
  }

  function enhanceTarget(targetEl) {
    if (targetEl.getAttribute(ENHANCED_ATTR) === "true") return;

    const key = getTargetKey(targetEl);
    const field = fieldMap.get(key);
    if (!field) return;

    targetEl.setAttribute(ENHANCED_ATTR, "true");
    targetEl.classList.add("shackademy-enhanced");
    targetEl.setAttribute("tabindex", "0");
    targetEl.setAttribute("aria-haspopup", "dialog");
    targetEl.setAttribute(
      "aria-label",
      `Open Shackademy help for ${field.label}`,
    );

    // Only labels get role="button", we don't want to overwrite Voyant's own
    // role="columnheader" on the Year View table headers.
    if (targetEl.tagName === "LABEL") {
      targetEl.setAttribute("role", "button");
    }

    if (!targetEl.querySelector(`.${BADGE_CLASS}`)) {
      const badge = document.createElement("span");
      badge.className = BADGE_CLASS;
      badge.textContent = "?";
      badge.setAttribute("aria-hidden", "true");
      targetEl.appendChild(badge);
    }

    targetEl.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal(field);
    });

    targetEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(field);
      }
    });

    visibleFields.set(key, { field, el: targetEl });
    return true;
  }

  function runEnhancement() {
    const anyNew = findTargets().map(enhanceTarget).some(Boolean);
    updateYearLabels();
    if (anyNew) {
      updateFieldsPanel();
      updateContextPanel();
      nudgeToggle();
    }
  }

  function runCleanup() {
    let changed = false;
    visibleFields.forEach(({ el }, key) => {
      if (!document.body.contains(el)) {
        visibleFields.delete(key);
        changed = true;
      }
    });
    if (changed) updateFieldsPanel();
  }

  // ---------------------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------------------

  function closeModal() {
    document.getElementById(MODAL_ID)?.remove();
    document.getElementById(BACKDROP_ID)?.remove();
    document.removeEventListener("keydown", onEscape);
  }

  function onEscape(e) {
    if (e.key === "Escape") closeModal();
  }

  function switchTab(tabName, modal) {
    modal.querySelectorAll(".shackademy-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tab === tabName);
      tab.setAttribute("aria-selected", tab.dataset.tab === tabName);
    });
    modal.querySelectorAll(".shackademy-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === tabName);
    });
  }

  function openModal(field) {
    if (document.getElementById(MODAL_ID)) closeModal();

    const hasLesson = !!field.lessonUrl;
    const embedUrl = toEmbedUrl(field.videoUrl);
    const hasVideo = !!embedUrl;

    const lessonButtonHTML = hasLesson
      ? `
      <div class="shackademy-links">
        <a href="${field.lessonUrl}" target="_blank" rel="noopener noreferrer">
          Open full lesson on Shackademy ↗
        </a>
      </div>`
      : "";

    const tabsHTML = hasVideo
      ? `
      <div id="shackademy-tabs" role="tablist">
        <button class="shackademy-tab active" data-tab="details"
          role="tab" aria-selected="true">Details</button>
        <button class="shackademy-tab" data-tab="video"
          role="tab" aria-selected="false">Video</button>
      </div>`
      : "";

    const videoPanelHTML = hasVideo
      ? `
      <div class="shackademy-panel" data-panel="video" role="tabpanel">
        <iframe src="${embedUrl}" title="${field.label} help video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>`
      : "";

    const backdrop = document.createElement("div");
    backdrop.id = BACKDROP_ID;
    backdrop.addEventListener("click", closeModal);

    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "shackademy-modal-title");

    modal.innerHTML = `
      <div id="shackademy-modal-header">
        <div id="shackademy-modal-eyebrow">Shackademy Help</div>
        <h2 id="shackademy-modal-title">${field.label}</h2>
        <button id="shackademy-modal-close" aria-label="Close help">&times;</button>
      </div>
      ${tabsHTML}
      <div id="shackademy-modal-body">
        <div class="shackademy-panel active" data-panel="details" role="tabpanel">
          <div class="shackademy-help-content">${interpolateHelpText(field.helpText)}</div>
          ${lessonButtonHTML}
        </div>
        ${videoPanelHTML}
      </div>
      <div id="shackademy-modal-disclaimer">
        <ul>${DISCLAIMER_POINTS.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    modal
      .querySelector("#shackademy-modal-close")
      ?.addEventListener("click", closeModal);
    modal.querySelectorAll(".shackademy-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab, modal));
    });

    document.addEventListener("keydown", onEscape);
    setTimeout(
      () => modal.querySelector("#shackademy-modal-close")?.focus(),
      50,
    );
  }

  // ---------------------------------------------------------------------------
  // Panel shell
  // ---------------------------------------------------------------------------

  function createPanel() {
    if (document.getElementById(PANEL_ID)) return;

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.setAttribute("role", "complementary");
    panel.setAttribute("aria-label", "Shackademy field guide");
    panel.classList.add("hidden");

    panel.innerHTML = `
      <button id="shackademy-panel-tab" aria-label="Toggle Shackademy panel">
        <span>S</span>
      </button>
      <div id="shackademy-panel-header">
        <div id="shackademy-panel-logo">
          <span id="shackademy-panel-logo-mark">S</span>
          <span>Shackademy</span>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <button id="shackademy-pin-btn" aria-label="Unpin panel" title="Unpin panel">📌</button>
          <button id="shackademy-panel-close" aria-label="Close panel">&times;</button>
        </div>
      </div>
      <div id="shackademy-panel-nav">
        <button class="shackademy-panel-nav-btn active" data-view="guide">
          Guide
        </button>
        <button class="shackademy-panel-nav-btn" data-view="fields">
          Fields
        </button>
        <button class="shackademy-panel-nav-btn" data-view="longevity">
          Longevity
        </button>
      </div>

      <div id="shackademy-panel-views">
        <div class="shackademy-panel-view active" data-view="guide">
          <div id="shackademy-guide-content"></div>
        </div>
        <div class="shackademy-panel-view" data-view="fields">
          <ul id="shackademy-panel-list" role="list"></ul>
        </div>
        <div class="shackademy-panel-view" data-view="longevity">
          <div id="shackademy-longevity-content"></div>
        </div>
      </div>

      <div id="shackademy-panel-footer">
        <a href="https://shackademy.com" target="_blank" rel="noopener noreferrer">
          Visit Shackademy ↗
        </a>
      </div>
    `;

    document.body.appendChild(panel);

    // Tab toggle
    panel
      .querySelector("#shackademy-panel-tab")
      ?.addEventListener("click", () => {
        const isHidden = panel.classList.contains("hidden");
        if (isHidden) {
          userClosedPanel = false;
          userOpenedEmptyPanel =
            visibleFields.size === 0 && !keepPanelOpenWithoutFields();
          panel.classList.remove("hidden");
          updateContextPanel();
          applyPinned();
          showDisclaimerFooter();
        } else {
          userClosedPanel = true;
          clearPinState();
          panel.classList.add("hidden");
          hideDisclaimerFooter();
        }
      });

    // Close button
    panel
      .querySelector("#shackademy-panel-close")
      ?.addEventListener("click", () => {
        userClosedPanel = true;
        clearPinState();
        panel.classList.add("hidden");
        hideDisclaimerFooter();
      });

    panel
      .querySelector("#shackademy-pin-btn")
      ?.addEventListener("click", () => {
        if (isPinned) {
          applyFloating();
        } else {
          applyPinned();
        }
      });

    // Panel nav (Guide / Fields)
    panel.querySelectorAll(".shackademy-panel-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        panel
          .querySelectorAll(".shackademy-panel-nav-btn")
          .forEach((b) => b.classList.remove("active"));
        panel
          .querySelectorAll(".shackademy-panel-view")
          .forEach((v) => v.classList.remove("active"));
        btn.classList.add("active");
        panel
          .querySelector(
            `.shackademy-panel-view[data-view="${btn.dataset.view}"]`,
          )
          ?.classList.add("active");
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Glossary panel
  // ---------------------------------------------------------------------------

  function updateContextPanel() {
    const container = document.getElementById("shackademy-guide-content");
    if (!container) return;

    container.innerHTML = "";

    const section = currentSectionKey ? sectionMap[currentSectionKey] : null;

    if (!section) {
      container.innerHTML = `
        <p class="shackademy-panel-empty">
          Navigate to a Voyant section to see guidance and lessons here.
        </p>`;
      return;
    }
    // Build tab title - use TAB_LABELS lookup, fall back to capitalised key
    const tabKey = currentTabKey || "basics";
    const tabConfig = section.tabs?.[tabKey] || section.tabs?.["basics"];
    const labelMap = window.TAB_LABELS || {};
    const tabLabel =
      labelMap[tabKey] || tabKey.charAt(0).toUpperCase() + tabKey.slice(1);
    const title = `${section.name} - ${tabLabel}`;

    // Section title header
    const titleEl = document.createElement("div");
    titleEl.className = "shackademy-context-title";
    titleEl.textContent = title;
    container.appendChild(titleEl);

    // Tab description
    if (tabConfig?.description) {
      const descEl = document.createElement("div");
      descEl.className =
        "shackademy-context-description shackademy-help-content";
      descEl.innerHTML = tabConfig.description;
      container.appendChild(descEl);
    }

    // Lessons section
    const lessons = (section.lessons || [])
      .map((k) => lessonMap[k])
      .filter(Boolean);

    if (lessons.length > 0) {
      const lessonsSection = document.createElement("div");
      lessonsSection.className = "shackademy-guide-section";
      lessonsSection.innerHTML = `<div class="shackademy-guide-section-title shackademy-section-title--lessons">Shackademy Lessons</div>`;

      lessons.forEach((lesson) => {
        const link = document.createElement("a");
        link.className = "shackademy-lesson-link";
        link.href = lesson.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = `
          <span class="shackademy-lesson-icon">▶</span>
          <span class="shackademy-lesson-title">${lesson.title}</span>
          <span class="shackademy-lesson-arrow">↗</span>
        `;
        lessonsSection.appendChild(link);
      });

      container.appendChild(lessonsSection);
    }
  }

  // ---------------------------------------------------------------------------
  // Fields panel
  // ---------------------------------------------------------------------------

  function updateFieldsPanel() {
    const panel = document.getElementById(PANEL_ID);
    const list = document.getElementById("shackademy-panel-list");
    if (!list || !panel) return;

    list.innerHTML = "";

    if (visibleFields.size === 0) {
      if (!keepPanelOpenWithoutFields() && !userOpenedEmptyPanel) {
        closePanelAndClearPadding();
      }
      return;
    }

    // Pin when fields are present and panel is open
    if (!panel.classList.contains("hidden")) applyPinned();

    visibleFields.forEach(({ field }) => {
      const li = document.createElement("li");
      li.className = "shackademy-panel-item";

      li.innerHTML = `
        <button class="shackademy-panel-field-btn"
          aria-label="Open help for ${field.label}">
          <span class="shackademy-panel-field-name">${field.label}</span>
          <span class="shackademy-panel-field-badges">
            ${field.lessonUrl ? '<span class="spf-badge spf-badge--lesson">Lesson</span>' : ""}
            ${field.videoUrl ? '<span class="spf-badge spf-badge--video">Video</span>' : ""}
          </span>
        </button>
      `;

      li.querySelector(".shackademy-panel-field-btn").addEventListener(
        "click",
        () => {
          openModal(field);
          const entry = visibleFields.get(field.key);
          if (entry) {
            entry.el.scrollIntoView({ behavior: "smooth", block: "center" });
            entry.el.focus();
          }
        },
      );

      list.appendChild(li);
    });
  }

  // ---------------------------------------------------------------------------
  // Nudge toggle animation
  // ---------------------------------------------------------------------------

  function nudgeToggle() {
    const tab = document.getElementById("shackademy-panel-tab");
    if (!tab || tab.classList.contains("shackademy-nudge")) return;
    tab.classList.add("shackademy-nudge");
    tab.addEventListener(
      "animationend",
      () => {
        tab.classList.remove("shackademy-nudge");
      },
      { once: true },
    );
  }

  // ---------------------------------------------------------------------------
  // Teardown
  // ---------------------------------------------------------------------------

  function teardown() {
    closeModal();
    window.SHACKADEMY_LONGEVITY_UI?.teardown();
    document.getElementById(PANEL_ID)?.remove();

    document.querySelectorAll(`[${ENHANCED_ATTR}="true"]`).forEach((el) => {
      el.removeAttribute(ENHANCED_ATTR);
      el.classList.remove("shackademy-enhanced");
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
      el.removeAttribute("aria-haspopup");
      el.removeAttribute("aria-label");
      el.querySelector(`.${BADGE_CLASS}`)?.remove();
    });

    visibleFields.clear();
    currentSectionKey = null;
    currentTabKey = null;
    currentItemId = null;
    clearPinState();
    hideDisclaimerFooter();
    document.getElementById(DISCLAIMER_ID)?.remove();
    document.body.style.removeProperty("padding-bottom");
    window.__shackademyInitialised = false;
    window.__shackademyRunning = false;
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "SHACKADEMY_DISABLE") {
      teardown();
    } else if (message.type === "SHACKADEMY_ENABLE") {
      if (!window.__shackademyRunning) init();
    }
  });

  // ---------------------------------------------------------------------------
  // MutationObserver & init
  // ---------------------------------------------------------------------------

  function startObserver() {
    let debounceTimer = null;

    const observer = new MutationObserver(() => {
      // Debounce: wait for DOM to settle before running enhancement/cleanup
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        runEnhancement();
        runCleanup();
        // Cheap signature check inside; only recomputes if the chart changed.
        window.SHACKADEMY_LONGEVITY_UI?.maybeRefresh();
      }, 150);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.__shackademyObserver = observer;

    // Re-detect context and check for fields on every hash change
    window.addEventListener("hashchange", () => {
      userOpenedEmptyPanel = false;
      detectPageContext();

      setTimeout(() => {
        visibleFields.clear();

        findTargets().forEach((labelEl) => {
          const key = getTargetKey(labelEl);
          const field = fieldMap.get(key);

          if (field) {
            visibleFields.set(key, { field, el: labelEl });
          }
        });

        updateFieldsPanel();
        updateContextPanel();
      }, 400);
    });

    // Watch for Voyant's Done/Cancel buttons to clear section context
    document.body.addEventListener(
      "click",
      (e) => {
        const btn = e.target.closest(
          'button[data-test-model-save="true"], button[aria-label="Done"], button[data-test-model-cancel="true"], button[aria-label="Cancel"]',
        );
        if (btn) {
          currentSectionKey = null;
          currentItemId = null;
          currentTabKey = null;
          visibleFields.clear();
          updateFieldsPanel();
          updateContextPanel();
        }
      },
      true,
    );
  }

  function init() {
    if (window.__shackademyRunning) return;
    window.__shackademyRunning = true;
    createPanel();
    window.SHACKADEMY_LONGEVITY_UI?.mount(
      document.getElementById("shackademy-longevity-content"),
    );
    runEnhancement();
    detectPageContext();
    startObserver();
  }
})();
