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
  const KEY_ATTR = "data-shackademy-key";
  const GUIDE_BTN_CLASS = "shackademy-guide-btn";
  const KEEP_PANEL_OPEN_WITHOUT_FIELDS_TABS = new Set(
    Object.keys(window.TAB_LABELS || {}),
  );

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------
  // A key can have more than one entry when Voyant reuses the same field ID
  // on different forms (e.g. drawdownType). Entries with a `sections` array
  // only apply in those sections; an entry without one is the fallback.
  const fieldMap = new Map();
  (window.SHACKADEMY_FIELDS || []).forEach((f) => {
    if (!fieldMap.has(f.key)) fieldMap.set(f.key, []);
    fieldMap.get(f.key).push(f);
  });

  // Entries matched by label text rather than ID, for fields whose IDs
  // Voyant regenerates on every page load (e.g. Plan Settings > Fees).
  // match: { section, tab, group, text }
  const textMatchedFields = (window.SHACKADEMY_FIELDS || []).filter(
    (f) => f.match,
  );

  const lessonMap = window.SHACKADEMY_LESSONS || {};
  const sectionMap = window.SHACKADEMY_SECTIONS || {};

  // Sections identified by URL route (no edit form), e.g. Insights.
  // Longest route first so "insights/monte-carlo" beats "insights".
  const routeSections = Object.entries(sectionMap)
    .flatMap(([key, config]) =>
      [].concat(config.route || []).map((route) => ({ key, route })),
    )
    .sort((a, b) => b.route.length - a.route.length);

  function resolveField(key) {
    const entries = fieldMap.get(key);
    if (!entries) return null;
    return (
      entries.find(
        (f) =>
          Array.isArray(f.sections) && f.sections.includes(currentSectionKey),
      ) ||
      entries.find((f) => !Array.isArray(f.sections)) ||
      null
    );
  }

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
  let lastNudgedSectionKey = null; // pulse the S tab once per new section
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

  // The visible text of a label, without Voyant's hidden "More information
  // about" spans, our own badge, or a required-field asterisk.
  function getLabelText(labelEl) {
    const firstSpan = labelEl.querySelector("span:not(.visually-hidden)");
    const raw = firstSpan
      ? firstSpan.textContent
      : (labelEl.innerText || "").split("\n")[0];
    return raw.replace(/\*/g, "").replace(/\s+/g, " ").trim();
  }

  // The heading of the collapsible box a label sits in, e.g. "Product Fees".
  function getLabelGroup(labelEl) {
    const box = labelEl.closest(".collapsible-form-container");
    if (!box) return null;
    return (box.innerText || "").trim().split("\n")[0].trim();
  }

  function getTextMatchedKey(labelEl) {
    if (!textMatchedFields.length || !currentSectionKey) return null;
    const tab = currentTabKey || "basics";
    const text = getLabelText(labelEl);
    let group;
    const hit = textMatchedFields.find((f) => {
      const m = f.match;
      if (m.section !== currentSectionKey || m.tab !== tab) return false;
      if (m.text !== text) return false;
      if (m.group) {
        if (group === undefined) group = getLabelGroup(labelEl);
        if (m.group !== group) return false;
      }
      return true;
    });
    return hit ? hit.key : null;
  }

  function getTargetKey(el) {
    if (el.tagName === "LABEL") {
      const key = getLabelKey(el);
      if (key && fieldMap.has(key)) return key;
      return getTextMatchedKey(el) || key;
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
  // Edit forms:    #/userId/planId/edit/itemId/tab
  // Other screens: #/userId/planId/<route>, e.g. year-view, insights/monte-carlo
  // Query strings (e.g. ?selectedYear=2027) are ignored.
  function parseHash() {
    const parts = window.location.hash.split("?")[0].split("/");
    const routePath = parts.slice(3).join("/");
    if (parts[3] === "edit") {
      return {
        itemId: parts.length >= 5 ? parts[4] : null,
        tab: parts.length >= 6 ? parts[5].toLowerCase() : null,
        routePath,
        isEdit: true,
      };
    }
    return { itemId: null, tab: null, routePath, isEdit: false };
  }

  function findRouteSection(routePath) {
    if (!routePath) return null;
    // Year View opened from inside an insight (e.g. insights/market-crash/
    // year-view) gets the Year View guide, not the insight's.
    if (routePath.split("/").includes("year-view")) {
      const yv = routeSections.find(({ route }) => route === "year-view");
      if (yv) return yv.key;
    }
    const hit = routeSections.find(
      ({ route }) => routePath === route || routePath.startsWith(route + "/"),
    );
    return hit ? hit.key : null;
  }

  // Year View's tabs (Cash Flow, Taxes...) don't change the URL. The selected
  // one is the button[data-test-tab] with the "selected" class.
  function getYearViewTabKey() {
    const btn = document.querySelector("button[data-test-tab].selected");
    const key = btn?.getAttribute("data-test-tab");
    return key ? key.toLowerCase() : null;
  }

  function getRouteTabKey(sectionKey) {
    if (sectionMap[sectionKey]?.tabSource === "yearView") {
      return getYearViewTabKey();
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Context detection
  // ---------------------------------------------------------------------------

  function detectPageContext() {
    const { itemId: newItemId, tab: newTab, routePath, isEdit } = parseHash();

    // Screens without an edit form are matched by route first.
    if (!isEdit) {
      const routeSection = findRouteSection(routePath);
      if (routeSection) {
        currentItemId = null;
        currentSectionKey = routeSection;
        currentTabKey = getRouteTabKey(routeSection);
        updateContextPanel();
        updateHeadingButton();
        return;
      }
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

  // A target only counts if a tooltip applies to it in the current section,
  // so section-scoped entries never show a badge elsewhere.
  function hasFieldFor(el) {
    const key = getTargetKey(el);
    return !!(key && resolveField(key));
  }

  function findTargets() {
    const labels = Array.from(document.querySelectorAll("label")).filter(
      (el) => !el.closest(`#${PANEL_ID}`) && hasFieldFor(el),
    );
    const columnHeaders = Array.from(
      document.querySelectorAll('div[role="columnheader"]'),
    ).filter(hasFieldFor);
    return [...labels, ...columnHeaders];
  }

  // Resolve the tooltip when it's opened, not when the badge is added, so a
  // shared field ID shows the entry for the section the user is in now.
  function fieldForTarget(targetEl) {
    const key = targetEl.getAttribute(KEY_ATTR) || getTargetKey(targetEl);
    return resolveField(key);
  }

  function enhanceTarget(targetEl) {
    if (targetEl.getAttribute(ENHANCED_ATTR) === "true") return;

    const key = getTargetKey(targetEl);
    const field = resolveField(key);
    if (!field) return;
    targetEl.setAttribute(KEY_ATTR, key);

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
      const current = fieldForTarget(targetEl);
      if (current) openModal(current);
    });

    targetEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const current = fieldForTarget(targetEl);
        if (current) openModal(current);
      }
    });

    visibleFields.set(key, { field, el: targetEl });
    return true;
  }

  // Year View tabs change without a URL change, so check on every pass.
  function refreshRouteTab() {
    const section = currentSectionKey ? sectionMap[currentSectionKey] : null;
    if (!section || section.tabSource !== "yearView") return;
    const tabKey = getYearViewTabKey();
    if (tabKey && tabKey !== currentTabKey) {
      currentTabKey = tabKey;
      updateContextPanel();
    }
  }

  function runEnhancement() {
    const anyNew = findTargets().map(enhanceTarget).some(Boolean);
    updateYearLabels();
    refreshRouteTab();
    updateHeadingButton();
    if (anyNew) {
      updateFieldsPanel();
      updateContextPanel();
      nudgeToggle();
    }
  }

  // ---------------------------------------------------------------------------
  // Guide button on screen headings (e.g. each insight)
  // ---------------------------------------------------------------------------

  function getHeadingEl() {
    return Array.from(document.querySelectorAll("h1")).find(
      (h) => h.offsetParent !== null && !h.closest(`#${PANEL_ID}`),
    );
  }

  function updateHeadingButton() {
    const section = currentSectionKey ? sectionMap[currentSectionKey] : null;
    const existing = document.querySelectorAll(`.${GUIDE_BTN_CLASS}`);

    if (!section?.headingButton) {
      existing.forEach((b) => b.remove());
      return;
    }

    const heading = getHeadingEl();
    if (!heading) return;
    // Remove any button left on a heading that's no longer the current one.
    existing.forEach((b) => {
      if (!heading.contains(b)) b.remove();
    });
    if (heading.querySelector(`.${GUIDE_BTN_CLASS}`)) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = GUIDE_BTN_CLASS;
    btn.setAttribute("aria-label", "Open the Shackademy guide for this screen");
    btn.innerHTML = `<span class="shackademy-guide-btn-mark" aria-hidden="true">S</span><span>Guide</span>`;
    // Only this button responds, so Voyant's own help on the heading still works.
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openGuide();
    });
    heading.appendChild(btn);
  }

  // Opens the side panel on the Guide view and briefly highlights the guide.
  function openGuide() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) return;

    userClosedPanel = false;
    if (panel.classList.contains("hidden")) {
      userOpenedEmptyPanel = true;
      panel.classList.remove("hidden");
      applyPinned();
      showDisclaimerFooter();
    }

    panel
      .querySelectorAll(".shackademy-panel-nav-btn")
      .forEach((b) => b.classList.toggle("active", b.dataset.view === "guide"));
    panel
      .querySelectorAll(".shackademy-panel-view")
      .forEach((v) => v.classList.toggle("active", v.dataset.view === "guide"));

    updateContextPanel();

    const guide = document.getElementById("shackademy-guide-content");
    if (guide) {
      guide.classList.remove("shackademy-flash");
      void guide.offsetWidth; // restart the animation
      guide.classList.add("shackademy-flash");
      guide.addEventListener(
        "animationend",
        () => guide.classList.remove("shackademy-flash"),
        { once: true },
      );
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
      </div>

      <div id="shackademy-panel-views">
        <div class="shackademy-panel-view active" data-view="guide">
          <div id="shackademy-guide-content"></div>
        </div>
        <div class="shackademy-panel-view" data-view="fields">
          <ul id="shackademy-panel-list" role="list"></ul>
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
      lastNudgedSectionKey = null;
      container.innerHTML = `
        <p class="shackademy-panel-empty">
          Navigate to a Voyant section to see guidance and lessons here.
        </p>`;
      return;
    }
    // Pulse the S tab when a new section with guide text is detected, so
    // screens without field tooltips (e.g. Insights) still draw attention.
    if (currentSectionKey !== lastNudgedSectionKey) {
      lastNudgedSectionKey = currentSectionKey;
      nudgeToggle();
    }

    // Build tab title - use TAB_LABELS lookup, fall back to capitalised key
    const tabKey = currentTabKey || "basics";
    const tabConfig = section.tabs?.[tabKey] || section.tabs?.["basics"];
    const labelMap = window.TAB_LABELS || {};
    const tabLabel =
      labelMap[tabKey] || tabKey.charAt(0).toUpperCase() + tabKey.slice(1);
    // Single-screen sections (e.g. each insight) show just their name.
    const title = section.titleOnly
      ? section.name
      : `${section.name} - ${tabLabel}`;

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
    document.getElementById(PANEL_ID)?.remove();

    document.querySelectorAll(`[${ENHANCED_ATTR}="true"]`).forEach((el) => {
      el.removeAttribute(ENHANCED_ATTR);
      el.classList.remove("shackademy-enhanced");
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
      el.removeAttribute("aria-haspopup");
      el.removeAttribute("aria-label");
      el.removeAttribute(KEY_ATTR);
      el.querySelector(`.${BADGE_CLASS}`)?.remove();
    });
    document.querySelectorAll(`.${GUIDE_BTN_CLASS}`).forEach((b) => b.remove());

    // Stop watching the page, so nothing is re-added after switching off.
    window.__shackademyObserver?.disconnect();
    window.__shackademyObserver = null;
    if (window.__shackademyHashHandler) {
      window.removeEventListener("hashchange", window.__shackademyHashHandler);
      window.__shackademyHashHandler = null;
    }

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
      }, 150);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.__shackademyObserver = observer;

    // Re-detect context and check for fields on every hash change
    const onHashChange = () => {
      userOpenedEmptyPanel = false;
      detectPageContext();

      setTimeout(() => {
        visibleFields.clear();

        // Labels rendered before the section was known (e.g. a scoped
        // insight field, or Plan Settings fee labels matched by text) can
        // only be badged now.
        findTargets().forEach(enhanceTarget);

        findTargets().forEach((labelEl) => {
          const key = getTargetKey(labelEl);
          const field = resolveField(key);

          if (field) {
            visibleFields.set(key, { field, el: labelEl });
          }
        });

        updateFieldsPanel();
        updateContextPanel();
        updateHeadingButton();
      }, 400);
    };
    window.addEventListener("hashchange", onHashChange);
    window.__shackademyHashHandler = onHashChange;

    // Watch for Voyant's Done/Cancel buttons to clear section context
    document.body.addEventListener(
      "click",
      (e) => {
        const btn = e.target.closest(
          'button[data-test-model-save="true"], button[aria-label="Done"], button[data-test-model-cancel="true"], button[aria-label="Cancel"]',
        );
        // Only edit forms clear the context. Pop-ups on other screens (e.g.
        // the Accounts Using Asset Allocation window on an insight) have
        // their own Done/Cancel buttons, and the screen's guide should stay.
        if (btn && parseHash().isEdit) {
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
    runEnhancement();
    detectPageContext();
    startObserver();
  }
})();
