// longevity-ui.js
// The Longevity tab in the side panel: inputs, headline stats, explanatory
// text, and the bridge to the MAIN-world chart injector.
//
// Deliberately self-contained so that integrating this feature into the live
// extension touches content.js as little as possible. content.js only needs to
// render the tab button, provide a container, and call mount() and refresh().

(() => {
  const STORAGE_KEY = "shackademyLongevity";
  const REQUEST = "shackademy-longevity-render";
  const REPLY = "shackademy-longevity-status";

  // Chosen to sit clearly apart from Voyant's own blue (#026FC1) and green,
  // so nobody mistakes these lines for something Voyant produced.
  const COLOUR_ADJUSTED = "#C2185B";
  const COLOUR_SURVIVAL = "#7B8794";

  const NATIONS = [
    ["uk", "United Kingdom"],
    ["en", "England"],
    ["wa", "Wales"],
    ["sc", "Scotland"],
    ["ni", "Northern Ireland"],
  ];

  let settings = { nation: "uk", genders: {}, showSurvival: true };
  let lastChart = null;
  let lastResult = null;
  let injectStatus = { ok: null, reason: null };
  let container = null;

  // ---------------------------------------------------------------------------
  // Storage
  // ---------------------------------------------------------------------------

  function load(cb) {
    try {
      chrome.storage.local.get(STORAGE_KEY, (res) => {
        if (res && res[STORAGE_KEY]) {
          settings = { ...settings, ...res[STORAGE_KEY] };
        }
        cb && cb();
      });
    } catch {
      cb && cb();
    }
  }

  function save() {
    try {
      chrome.storage.local.set({ [STORAGE_KEY]: settings });
    } catch {
      /* storage unavailable; settings stay in memory for this session */
    }
  }

  // ---------------------------------------------------------------------------
  // Chart bridge
  // ---------------------------------------------------------------------------

  window.addEventListener(REPLY, (e) => {
    injectStatus = e.detail || { ok: false };
    render();
  });

  function pushToChart(result) {
    const series = [];
    if (result && result.ok) {
      series.push({
        name: "Shackademy: longevity-adjusted",
        color: COLOUR_ADJUSTED,
        data: result.series.map((r) => r.adjusted),
        lineWidth: 3,
      });
      if (settings.showSurvival) {
        series.push({
          name: "Shackademy: chance either is alive",
          color: COLOUR_SURVIVAL,
          dashStyle: "ShortDash",
          data: result.series.map((r) => r.lastSurvivor * 100),
          lineWidth: 2,
        });
      }
    }
    window.dispatchEvent(new CustomEvent(REQUEST, { detail: { series } }));
  }

  // ---------------------------------------------------------------------------
  // Compute
  // ---------------------------------------------------------------------------

  function recompute() {
    const L = window.SHACKADEMY_LONGEVITY;
    if (!L) return null;
    lastChart = L.parseChart(document);
    if (!lastChart) {
      lastResult = null;
      return null;
    }
    lastResult = L.computeSurvival(lastChart, {
      nation: settings.nation,
      genders: settings.genders,
      currentYear: new Date().getFullYear(),
    });
    return lastResult;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const pct = (v, dp) => (v * 100).toFixed(dp === undefined ? 1 : dp) + "%";
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );

  function agesLabel(people, ages) {
    return people.map((p, i) => `${esc(p.name)} ${ages[i]}`).join(", ");
  }

  function renderInputs(people) {
    const genderRows = people
      .map(
        (p) => `
      <div class="shk-lng-row">
        <label class="shk-lng-label">${esc(p.name)}</label>
        <div class="shk-lng-seg" data-person="${p.index}">
          <button data-sex="m" class="${settings.genders[p.index] === "m" ? "active" : ""}">Male</button>
          <button data-sex="f" class="${settings.genders[p.index] === "f" ? "active" : ""}">Female</button>
        </div>
      </div>`,
      )
      .join("");

    return `
      <div class="shk-lng-section">
        <div class="shk-lng-section-title">Details</div>
        ${genderRows}
        <div class="shk-lng-row">
          <label class="shk-lng-label" for="shk-lng-nation">Nation</label>
          <select id="shk-lng-nation" class="shk-lng-select">
            ${NATIONS.map(
              ([k, name]) =>
                `<option value="${k}"${settings.nation === k ? " selected" : ""}>${name}</option>`,
            ).join("")}
          </select>
        </div>
        <label class="shk-lng-check">
          <input type="checkbox" id="shk-lng-show-survival" ${settings.showSurvival ? "checked" : ""}>
          Show survival curve on chart
        </label>
      </div>`;
  }

  function renderStats(result) {
    const L = window.SHACKADEMY_LONGEVITY;
    const s = L.summarise(result);
    const people = result.people;
    const end = result.series[result.series.length - 1];

    const milestone = (m, label) =>
      m
        ? `<li><strong>${label}</strong> at ${agesLabel(people, m.ages)}</li>`
        : `<li><strong>${label}</strong> not reached within the plan</li>`;

    const boundary = s.boundary
      ? `<div class="shk-lng-note">
           ONS publishes no data beyond age 100. From
           ${agesLabel(people, s.boundary.ages)},
           ${esc(s.boundary.cappedNames.join(" and "))}
           ${s.boundary.cappedNames.length > 1 ? "are" : "is"} treated as no longer living,
           which is what the plan already assumes. That accounts for
           ${(s.boundary.artefact * 100).toFixed(1)} percentage points of the step
           down you can see in the survival line at that point.
         </div>`
      : "";

    return `
      <div class="shk-lng-headline">
        <div class="shk-lng-headline-value">${s.weighted.toFixed(1)}%</div>
        <div class="shk-lng-headline-label">Longevity-weighted probability of success</div>
        <div class="shk-lng-headline-sub">
          Voyant's figure at the end of the plan: ${s.unadjustedFinal}%
        </div>
      </div>

      <div class="shk-lng-section">
        <div class="shk-lng-section-title">At the end of the plan
          (${agesLabel(people, end.ages)})</div>
        <ul class="shk-lng-stats">
          <li>Chance at least one of you is alive: <strong>${pct(end.lastSurvivor)}</strong></li>
          <li>Chance you are both alive: <strong>${pct(end.bothAlive)}</strong></li>
          <li>Chance neither is: <strong>${pct(end.noneAlive)}</strong></li>
        </ul>
      </div>

      <div class="shk-lng-section">
        <div class="shk-lng-section-title">Survival milestones</div>
        <ul class="shk-lng-stats">
          ${milestone(s.milestones.p50, "50% chance")}
          ${milestone(s.milestones.p25, "25% chance")}
          ${milestone(s.milestones.p10, "10% chance")}
        </ul>
        <div class="shk-lng-hint">Chance that at least one of you is still alive.</div>
      </div>

      ${boundary}`;
  }

  function renderExplainer(result) {
    const names = result?.people?.map((p) => esc(p.name)) || [];
    const pair = names.length === 2 ? `${names[0]} and ${names[1]}` : "you";
    return `
      <details class="shk-lng-details">
        <summary>What this actually shows</summary>
        <p>Voyant's own line answers a conditional question: <em>if you are still
        alive at this age, what share of simulations still have money?</em> It
        assumes you live to the end of the plan.</p>

        <p>The adjusted line multiplies that by the chance ${pair}
        ${names.length === 2 ? "are" : "is"} actually still here, using ONS cohort
        mortality. Cohort tables allow for projected future improvements in
        mortality, so they are the appropriate basis for someone alive today
        looking decades ahead.</p>

        <p><strong>Why "at least one of you".</strong> The money has to last until
        the second death, so that is the right weight. The chance you are
        <em>both</em> alive is a different and much lower number, shown above
        because it is worth knowing, but it is not what the plan has to survive.</p>

        <p><strong>Where the data stops.</strong> ONS publishes cohort mortality
        only to age 100 and describes older ages as too uncertain to publish.
        We do not extrapolate beyond that.</p>

        <p><strong>Two caveats worth stating.</strong> This assumes the two lives
        are independent; in reality couples' mortality is correlated, so true
        joint survival is a little lower than shown. And Voyant treats the plan's
        death ages as certainties while this overlay treats them as
        probabilities, so the two are not perfectly consistent.</p>

        <p class="shk-lng-attrib">
          Survival data: ONS, Past and projected period and cohort life tables,
          2024-based, principal projection. Contains public sector information
          licensed under the Open Government Licence v3.0. These lines are
          calculated by Shackademy and are not produced by Voyant.
        </p>
      </details>`;
  }

  function render() {
    if (!container) return;

    if (!window.SHACKADEMY_MORTALITY) {
      container.innerHTML = `<p class="shackademy-panel-empty">Mortality data failed to load.</p>`;
      return;
    }
    if (!lastChart) {
      container.innerHTML = `
        <p class="shackademy-panel-empty">
          Open a plan's Monte Carlo chart to see longevity-adjusted analysis here.
        </p>`;
      return;
    }

    let body = renderInputs(lastChart.people);

    if (!lastResult || !lastResult.ok) {
      const reason = lastResult?.reason;
      body += `<p class="shackademy-panel-empty">${
        reason === "missing-gender"
          ? "Choose a gender for each person to calculate survival."
          : reason === "no-data"
            ? "No ONS data available for these dates of birth."
            : "Could not read the chart."
      }</p>`;
    } else {
      body += renderStats(lastResult);
      if (injectStatus.ok === false) {
        body += `<div class="shk-lng-warn">
          The chart lines could not be drawn (${esc(injectStatus.reason || "unknown")}).
          The figures above are still correct.
        </div>`;
      }
    }

    body += renderExplainer(lastResult);
    container.innerHTML = body;
    wire();
  }

  function wire() {
    container.querySelectorAll(".shk-lng-seg button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const person = btn.closest(".shk-lng-seg").dataset.person;
        settings.genders[person] = btn.dataset.sex;
        save();
        refresh();
      });
    });

    const nation = container.querySelector("#shk-lng-nation");
    nation?.addEventListener("change", () => {
      settings.nation = nation.value;
      save();
      refresh();
    });

    const show = container.querySelector("#shk-lng-show-survival");
    show?.addEventListener("change", () => {
      settings.showSurvival = show.checked;
      save();
      refresh();
    });
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  function refresh() {
    const result = recompute();
    pushToChart(result);
    render();
    lastSignature = signature();
  }

  // Voyant mutates the DOM constantly, and reparsing 60 chart points on every
  // mutation would be wasteful. This is a cheap fingerprint of the things we
  // actually care about, so we only recompute when the chart really changed.
  let lastSignature = null;
  function signature() {
    const pts = document.querySelectorAll(
      '.highcharts-point[aria-label*="Probability of Success"]',
    );
    if (!pts.length) return "none";
    return (
      pts.length +
      "|" +
      pts[0].getAttribute("aria-label") +
      "|" +
      pts[pts.length - 1].getAttribute("aria-label")
    );
  }

  function maybeRefresh() {
    if (!container) return;
    if (signature() !== lastSignature) refresh();
  }

  function mount(el) {
    container = el;
    load(() => refresh());
  }

  // The panel normally closes itself when no help fields are on screen. The
  // Monte Carlo chart has none, so it needs to stay open on that page.
  function hasChart() {
    return !!window.SHACKADEMY_LONGEVITY?.parseChart(document);
  }

  function teardown() {
    window.dispatchEvent(new CustomEvent(REQUEST, { detail: { series: [] } }));
    container = null;
    lastChart = null;
    lastResult = null;
  }

  window.SHACKADEMY_LONGEVITY_UI = {
    mount,
    refresh,
    maybeRefresh,
    hasChart,
    teardown,
  };
})();
