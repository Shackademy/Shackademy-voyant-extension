// longevity.js
// Reads Voyant's Monte Carlo chart, applies ONS cohort survival, and produces
// the longevity-adjusted probability of success.
//
// Runs in the extension's isolated world. Pure logic and DOM reading only:
// no rendering, no storage. Rendering lives in chart-inject.js, storage and UI
// in content.js. Kept separate so the maths can be unit-tested offline by
// test/harness.html without a browser extension or a Voyant login.

(() => {
  const M = () => window.SHACKADEMY_MORTALITY;

  // ---------------------------------------------------------------------------
  // Mortality lookups
  // ---------------------------------------------------------------------------

  // lx for a cohort at a given age, or null if outside published data.
  // Each stored record is [startAge, lx@startAge, lx@startAge+1, ...].
  function lx(nation, sex, birthYear, age) {
    const rec = M()?.lx?.[nation]?.[sex]?.[String(birthYear)];
    if (!rec) return null;
    const i = age - rec[0] + 1;
    return i >= 1 && i < rec.length ? rec[i] : null;
  }

  // Highest age ONS covers for this cohort. Below 100 only for births 1975-1980,
  // where the period table's 2074 horizon bites before age 100 does.
  function dataLimit(nation, sex, birthYear) {
    const rec = M()?.lx?.[nation]?.[sex]?.[String(birthYear)];
    return rec ? rec[0] + rec.length - 2 : null;
  }

  // P(alive at `age` | alive at `fromAge`) for one person.
  // Returns null when `age` is beyond published data - the caller decides what
  // that means. We never extrapolate.
  function survival(nation, sex, birthYear, fromAge, age) {
    const base = lx(nation, sex, birthYear, fromAge);
    const now = lx(nation, sex, birthYear, age);
    if (!base || now === null) return null;
    return now / base;
  }

  // ---------------------------------------------------------------------------
  // Chart parsing
  // ---------------------------------------------------------------------------

  // Voyant labels each point like:
  //   "John's Age 56, Jane's Age 40, Probability of Success, £100"
  // The currency prefix is a Voyant formatting quirk; the value is a percentage.
  const POINT_RE =
    /^(.+?)'s Age (\d+),\s*(?:(.+?)'s Age (\d+),\s*)?Probability of Success,\s*[^\d-]*(-?[\d,]+(?:\.\d+)?)$/;

  function findChartRoot(doc) {
    return (
      doc.querySelector("#letsseeChartSingle .chart-container") ||
      doc.querySelector(".single-chart .chart-container") ||
      doc.querySelector(".chart-container[data-highcharts-chart]") ||
      null
    );
  }

  // Pull the x pixel coordinate out of a marker path such as
  // "M 9.5 35.9 A 2 2 0 1 1 ... Z". Highcharts offsets circle markers by the
  // radius, but we only ever use x differences, so the offset cancels.
  function pathX(el) {
    const d = el.getAttribute("d") || "";
    const m = d.match(/^M\s*(-?[\d.]+)/);
    return m ? parseFloat(m[1]) : null;
  }

  // Map "text-person-0" style classes to the names on the y-axis title.
  function readPersonNames(root) {
    const names = {};
    root
      .querySelectorAll('[class*="text-person-"][aria-label]')
      .forEach((el) => {
        const idx = (el.className.baseVal || el.className || "")
          .toString()
          .match(/text-person-(\d+)/);
        const label = el.getAttribute("aria-label") || "";
        const name = label.match(/^(.+?)'s Age$/);
        if (idx && name) names[Number(idx[1])] = name[1];
      });
    return names;
  }

  // Plan events, including mortality. The SVG carries position but no person;
  // the parallel HTML label divs carry the person colour class but an offset
  // position. Both are generated from the same series in the same order, so we
  // pair them by index.
  function readEvents(root, xToStep) {
    const svgMarkers = Array.from(
      root.querySelectorAll("g.event-timeline image.event-indicators"),
    );
    const htmlLabels = Array.from(
      root.querySelectorAll("div.event-timeline .highcharts-label"),
    );

    return svgMarkers.map((img, i) => {
      const label = (img.getAttribute("aria-label") || "").replace(
        /^Event marker:\s*/,
        "",
      ).replace(/\.\s*Press enter.*$/, "");
      const x = parseFloat(img.getAttribute("x"));
      const icon = htmlLabels[i]?.querySelector('[class*="icon-"]');
      const cls = icon ? icon.className.toString() : "";
      const personMatch = cls.match(/text-person-(\d+)/);
      return {
        label: label.trim(),
        step: xToStep(x),
        person: personMatch ? Number(personMatch[1]) : null,
        isMortality: /icon-timeline_mortality/.test(cls),
      };
    });
  }

  /**
   * Read everything we need off the rendered chart.
   * Returns null if the Monte Carlo chart is not on screen.
   */
  function parseChart(doc) {
    doc = doc || document;
    const root = findChartRoot(doc);
    if (!root) return null;

    const points = [];
    root.querySelectorAll(".highcharts-point[aria-label]").forEach((el) => {
      const m = (el.getAttribute("aria-label") || "").match(POINT_RE);
      if (!m) return;
      const x = pathX(el);
      if (x === null) return;
      const ages = [Number(m[2])];
      if (m[4] !== undefined) ages.push(Number(m[4]));
      points.push({
        x,
        ages,
        pos: parseFloat(m[5].replace(/,/g, "")),
      });
    });

    if (points.length < 2) return null;
    points.sort((a, b) => a.x - b.x);

    // Uniform spacing, so a linear map from pixels to time step is exact.
    const x0 = points[0].x;
    const dx =
      (points[points.length - 1].x - x0) / (points.length - 1) || 1;
    const xToStep = (x) => Math.round((x - x0) / dx);

    const names = readPersonNames(root);
    const nPeople = points[0].ages.length;
    const people = [];
    for (let i = 0; i < nPeople; i++) {
      people.push({
        index: i,
        name: names[i] || `Person ${i + 1}`,
        startAge: points[0].ages[i],
      });
    }

    const events = readEvents(root, xToStep);
    events
      .filter((e) => e.isMortality && e.person !== null)
      .forEach((e) => {
        const p = people[e.person];
        if (p && points[e.step]) p.planMortalityAge = points[e.step].ages[e.person];
      });
    // Anyone without an explicit marker dies at the end of the plan: Voyant
    // clips the marker on the final point.
    const last = points[points.length - 1];
    people.forEach((p) => {
      if (p.planMortalityAge == null) p.planMortalityAge = last.ages[p.index];
    });

    return { people, points, events, root };
  }

  // ---------------------------------------------------------------------------
  // Survival maths
  // ---------------------------------------------------------------------------

  /**
   * @param chart    result of parseChart
   * @param settings { nation: 'uk', genders: {0:'m',1:'f'}, currentYear }
   *
   * Survival is capped, never extrapolated. Where ONS publishes nothing above
   * age 100 we set that person's survival to zero, which defers to the plan's
   * own mortality assumption. The combined line continues on whoever remains
   * inside the data, which in practice is the younger person.
   */
  function computeSurvival(chart, settings) {
    const nation = settings.nation || "uk";
    const year = settings.currentYear || new Date().getFullYear();
    const genders = settings.genders || {};

    const people = chart.people.map((p) => {
      const sex = genders[p.index];
      const birthYear = year - p.startAge;
      return {
        ...p,
        sex,
        birthYear,
        limit: sex ? dataLimit(nation, sex, birthYear) : null,
      };
    });

    if (people.some((p) => !p.sex)) {
      return { ok: false, reason: "missing-gender", people };
    }
    if (people.some((p) => p.limit === null)) {
      return { ok: false, reason: "no-data", people };
    }

    const series = chart.points.map((pt, t) => {
      const each = people.map((p) => {
        const age = p.startAge + t;
        const s = survival(nation, p.sex, p.birthYear, p.startAge, age);
        return { age, s, capped: s === null };
      });
      // Capped people are treated as certainly dead, per the decision not to
      // extrapolate beyond ONS's published range.
      const eff = each.map((e) => e.s ?? 0);
      const noneAlive = eff.reduce((acc, s) => acc * (1 - s), 1);
      const bothAlive = eff.reduce((acc, s) => acc * s, 1);
      return {
        t,
        ages: pt.ages,
        pos: pt.pos,
        each,
        lastSurvivor: 1 - noneAlive,
        bothAlive,
        noneAlive,
        adjusted: (pt.pos * (1 - noneAlive)),
        anyCapped: each.some((e) => e.capped),
      };
    });

    // First step where published data runs out for anyone.
    const boundary = series.find((s) => s.anyCapped) || null;

    return { ok: true, people, series, boundary, nation };
  }

  /**
   * Longevity-weighted probability of success.
   *
   * Weights the success probability at each point by the chance the household
   * actually ends in that year, so it answers "will the plan last as long as we
   * do" rather than reading the adjusted line at an arbitrary age. Weights sum
   * to 1 by construction, the final term covering survival to plan end.
   */
  function summarise(result) {
    if (!result.ok) return null;
    const s = result.series;
    let weighted = 0;
    for (let t = 1; t < s.length; t++) {
      weighted += s[t].pos * (s[t - 1].lastSurvivor - s[t].lastSurvivor);
    }
    const finalLS = s[s.length - 1].lastSurvivor;
    weighted += s[s.length - 1].pos * finalLS;

    const milestone = (target) => {
      const hit = s.find((row) => row.lastSurvivor <= target);
      return hit ? { ages: hit.ages, lastSurvivor: hit.lastSurvivor } : null;
    };

    return {
      weighted,
      unadjustedFinal: s[s.length - 1].pos,
      milestones: {
        p50: milestone(0.5),
        p25: milestone(0.25),
        p10: milestone(0.1),
      },
      boundary: result.boundary ? describeBoundary(result) : null,
    };
  }

  /**
   * Quantify what happens where ONS data runs out.
   *
   * The raw year-on-year fall at the boundary mixes two things: the genuine
   * mortality everyone experiences that year, and the artificial loss from
   * zeroing the capped person. Only the second is an artefact of our data
   * limit, so we isolate it. `artefact` is the honest measure of what
   * refusing to extrapolate costs; `drop` is the total fall, which is what a
   * reader actually sees on the chart.
   */
  function describeBoundary(result) {
    const s = result.series;
    const t = result.boundary.t;
    const prev = t > 0 ? s[t - 1] : null;

    let artefact = 0;
    if (prev) {
      // Who still had data at the last good step but not at this one?
      const cappedNow = result.boundary.each.map((e, i) => e.capped && !prev.each[i].capped);
      // Last survivor at the previous step, recomputed as if those people were
      // already gone. The gap is the discontinuity our cap introduces.
      const without = prev.each.reduce(
        (acc, e, i) => acc * (1 - (cappedNow[i] ? 0 : (e.s ?? 0))),
        1,
      );
      artefact = prev.lastSurvivor - (1 - without);
    }

    return {
      ages: result.boundary.ages,
      step: t,
      drop: prev ? prev.lastSurvivor - result.boundary.lastSurvivor : 0,
      artefact,
      cappedNames: result.people
        .filter((p, i) => result.boundary.each[i].capped)
        .map((p) => p.name),
    };
  }

  // Stats at one point in time, for the sidebar readout.
  function statsAt(result, step) {
    if (!result.ok) return null;
    const row = result.series[step];
    if (!row) return null;
    return {
      ages: row.ages,
      atLeastOne: row.lastSurvivor,
      both: row.bothAlive,
      neither: row.noneAlive,
      pos: row.pos,
      adjusted: row.adjusted,
      capped: row.each.map((e) => e.capped),
    };
  }

  window.SHACKADEMY_LONGEVITY = {
    parseChart,
    computeSurvival,
    summarise,
    statsAt,
    // exposed for the offline harness
    _internal: { lx, survival, dataLimit, POINT_RE },
  };
})();
