// run-tests.js
// Offline verification of the longevity maths and chart parsing.
//   node test/run-tests.js          (needs jsdom:  npm i jsdom)
//
// Same assertions the browser harness runs, so either entry point proves the
// same things. Exits non-zero on failure.

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const SANDBOX = path.join(__dirname, "..");
const dom = new JSDOM("<!doctype html><html><body></body></html>");

global.window = dom.window;
global.document = dom.window.document;
// Scripts loaded via new Function resolve globals from Node, not from the jsdom
// window, so the DOM constructors they use in a browser have to be hoisted.
global.CustomEvent = dom.window.CustomEvent;
global.Event = dom.window.Event;
// chrome.storage does not exist outside an extension.
dom.window.chrome = {
  storage: { local: { get: (k, cb) => cb({}), set: () => {} } },
};

// Load the real production files, not copies.
const loadInto = (file) =>
  new Function(fs.readFileSync(path.join(SANDBOX, file), "utf8")).call(dom.window);
loadInto("mortality-data.js");
loadInto("longevity.js");

const fixture = require("./fixture.js");
const L = dom.window.SHACKADEMY_LONGEVITY;
const M = dom.window.SHACKADEMY_MORTALITY;

let failures = 0;
const results = [];

function check(name, actual, expected, tol) {
  let ok;
  if (typeof expected === "number" && typeof actual === "number") {
    ok = Math.abs(actual - expected) <= (tol ?? 1e-9);
  } else {
    ok = JSON.stringify(actual) === JSON.stringify(expected);
  }
  if (!ok) failures++;
  results.push({ name, ok, actual, expected });
  return ok;
}

function note(name, value) {
  results.push({ name, ok: null, actual: value, expected: "" });
}

// ---------------------------------------------------------------------------
// 1. ONS data integrity
// ---------------------------------------------------------------------------
note("SECTION", "ONS data integrity");

check("mortality data present", !!M, true);
check("max age is 100 (no extrapolation)", M.meta.maxAge, 100);

// ONS published cohort life expectancy at 65 in 2024, UK: 20.0 male, 22.7 female.
// Ours truncates at 100, so it should land just below and never above.
function e65(sex) {
  const by = 2024 - 65;
  const base = L._internal.lx("uk", sex, by, 65);
  let e = 0.5;
  for (let a = 66; a <= 100; a++) {
    const v = L._internal.lx("uk", sex, by, a);
    if (v === null) break;
    e += v / base;
  }
  return e;
}
const eM = e65("m");
const eF = e65("f");
note("cohort e65 male (ONS 20.0)", eM.toFixed(2));
note("cohort e65 female (ONS 22.7)", eF.toFixed(2));
check("e65 male within 0.15y of ONS, and not above", 20.0 - eM, 0.075, 0.075);
check("e65 female within 0.25y of ONS, and not above", 22.7 - eF, 0.125, 0.125);

// Regional ordering ONS reports: England highest, Scotland lowest.
const s90 = (n) =>
  L._internal.lx(n, "m", 1960, 90) / L._internal.lx(n, "m", 1960, 65);
check("England survival > Scotland (ONS regional ordering)", s90("en") > s90("sc"), true);
check("UK sits between England and Scotland", s90("en") > s90("uk") && s90("uk") > s90("sc"), true);

// Females outlive males at every age we care about.
let femaleAlwaysHigher = true;
for (let a = 70; a <= 100; a++) {
  const m = L._internal.lx("uk", "m", 1960, a) / L._internal.lx("uk", "m", 1960, 60);
  const f = L._internal.lx("uk", "f", 1960, a) / L._internal.lx("uk", "f", 1960, 60);
  if (!(f > m)) femaleAlwaysHigher = false;
}
check("female survival exceeds male at every age 70-100", femaleAlwaysHigher, true);

// Survival must be monotonically decreasing. A rise would mean resurrection.
let monotonic = true;
for (const nation of ["uk", "en", "wa", "sc", "ni"]) {
  for (const sex of ["m", "f"]) {
    for (const by of [1935, 1950, 1970, 1985, 2005]) {
      let prev = Infinity;
      for (let a = 25; a <= 100; a++) {
        const v = L._internal.lx(nation, sex, by, a);
        if (v === null) continue;
        if (v > prev) monotonic = false;
        prev = v;
      }
    }
  }
}
check("survival monotonically decreasing across all cohorts", monotonic, true);

// The 1975-1980 coverage gap should be real but small, and nothing else short.
note("data limit, born 1974", L._internal.dataLimit("uk", "m", 1974));
note("data limit, born 1978", L._internal.dataLimit("uk", "m", 1978));
note("data limit, born 1981", L._internal.dataLimit("uk", "m", 1981));
check("born 1974 reaches age 100", L._internal.dataLimit("uk", "m", 1974), 100);
check("born 1981 reaches age 100", L._internal.dataLimit("uk", "m", 1981), 100);

// ---------------------------------------------------------------------------
// 2. Chart parsing
// ---------------------------------------------------------------------------
note("SECTION", "Chart parsing");

document.body.appendChild(fixture.build(document));
const chart = L.parseChart(document);

check("chart found", !!chart, true);
check("two people detected", chart.people.length, 2);
check("person 0 named from axis", chart.people[0].name, "John");
check("person 1 named from axis", chart.people[1].name, "Jane");
check("start ages read", [chart.people[0].startAge, chart.people[1].startAge], [56, 40]);
check("all 60 points parsed", chart.points.length, 60);
check("decoy timeline points ignored", chart.points.every((p) => p.pos > 0), true);
check("first point PoS", chart.points[0].pos, 100);
check("PoS steps down at John 92", chart.points[36].pos, 98);
check("PoS steps down at John 109", chart.points[53].pos, 96);

const mortality = chart.events.filter((e) => e.isMortality);
check("one mortality marker found", mortality.length, 1);
check("mortality attributed to John", mortality[0].person, 0);
check("John's plan mortality age is 100", chart.people[0].planMortalityAge, 100);
check("Jane falls back to plan end", chart.people[1].planMortalityAge, 99);
check("named events decoded", chart.events[4].label, "John Retirement");

// ---------------------------------------------------------------------------
// 3. Survival maths
// ---------------------------------------------------------------------------
note("SECTION", "Survival maths");

const settings = { nation: "uk", genders: { 0: "m", 1: "f" }, currentYear: 2026 };
const res = L.computeSurvival(chart, settings);

check("computation succeeded", res.ok, true);
check("survival starts at 1", res.series[0].lastSurvivor, 1, 1e-9);

// Last survivor must never be below either individual, nor below both-alive.
let lastSurvivorSane = true;
let bothBelowEither = true;
for (const row of res.series) {
  const [a, b] = row.each.map((e) => e.s ?? 0);
  if (row.lastSurvivor < Math.max(a, b) - 1e-12) lastSurvivorSane = false;
  if (row.bothAlive > Math.min(a, b) + 1e-12) bothBelowEither = false;
  const total = row.bothAlive + row.noneAlive;
  if (total > 1 + 1e-9) lastSurvivorSane = false;
}
check("last survivor >= each individual, always", lastSurvivorSane, true);
check("both-alive <= each individual, always", bothBelowEither, true);

// P(at least one) and P(neither) must be complements.
let complementary = true;
for (const row of res.series) {
  if (Math.abs(row.lastSurvivor + row.noneAlive - 1) > 1e-12) complementary = false;
}
check("P(at least one) + P(neither) = 1", complementary, true);

// The adjusted line can never exceed Voyant's own line.
let adjustedBelow = true;
for (const row of res.series) {
  if (row.adjusted > row.pos + 1e-9) adjustedBelow = false;
}
check("adjusted line never exceeds Voyant's line", adjustedBelow, true);

// The ONS boundary should bite on John at 100, not on Jane.
check("boundary detected", !!res.boundary, true);
check("boundary at John 101 / Jane 85", res.boundary.ages, [101, 85]);
check("only John capped at the boundary", res.boundary.each.map((e) => e.capped), [true, false]);

const summary = L.summarise(res);
// PoS arrives on a 0-100 scale, so the weighted figure is already a percentage.
note("longevity-weighted success", summary.weighted.toFixed(1) + "%");
note("Voyant final PoS", summary.unadjustedFinal + "%");
note("boundary: total fall", (summary.boundary.drop * 100).toFixed(2) + " pts");
note("boundary: capping artefact", (summary.boundary.artefact * 100).toFixed(2) + " pts");
note("boundary: capped person", summary.boundary.cappedNames.join(", "));
const ms = summary.milestones;
const show = (m) => (m ? JSON.stringify(m.ages) : "not reached within plan");
note("50% survival at", show(ms.p50));
note("25% survival at", show(ms.p25));
note("10% survival at", show(ms.p10));
note("last survivor at plan end",
  (res.series[res.series.length - 1].lastSurvivor * 100).toFixed(1) + "%");

check("weighted success lies between the plan's worst and best PoS",
  summary.weighted >= 96 && summary.weighted <= 100, true);
// The cost of refusing to extrapolate is the artefact, not the total fall.
// The total fall also contains a normal year of mortality, which is real.
check("capping artefact is under 2 points", summary.boundary.artefact < 0.02, true);
check("artefact is smaller than the total fall at the boundary",
  summary.boundary.artefact < summary.boundary.drop, true);
check("only the older person is capped", summary.boundary.cappedNames, ["John"]);

// Milestones must be ordered where they exist. A milestone the plan never
// reaches is a legitimate result, not a failure: here the household still has
// a ~13% chance of survival at the final point, so 10% is never crossed.
const reached = ["p50", "p25", "p10"].filter((k) => ms[k]);
let ordered = true;
for (let i = 1; i < reached.length; i++) {
  if (ms[reached[i - 1]].ages[0] >= ms[reached[i]].ages[0]) ordered = false;
}
check("milestones correctly ordered where reached", ordered, true);
check("unreached milestone returns null rather than a guess",
  ms.p10 === null && res.series[res.series.length - 1].lastSurvivor > 0.1, true);

// A single-person plan must work too.
const solo = {
  people: [{ index: 0, name: "Mary", startAge: 60, planMortalityAge: 99 }],
  points: Array.from({ length: 40 }, (_, t) => ({ x: t, ages: [60 + t], pos: 90 })),
  events: [],
};
const soloRes = L.computeSurvival(solo, { nation: "uk", genders: { 0: "f" }, currentYear: 2026 });
check("single-person plan computes", soloRes.ok, true);
check("single-person last survivor equals that person's survival",
  soloRes.series[20].lastSurvivor, soloRes.series[20].each[0].s, 1e-12);

// Missing gender must fail cleanly rather than guess.
const noGender = L.computeSurvival(chart, { nation: "uk", genders: {}, currentYear: 2026 });
check("missing gender refuses to compute", noGender.reason, "missing-gender");

// ---------------------------------------------------------------------------
// 4. Sidebar UI module
// ---------------------------------------------------------------------------
note("SECTION", "Sidebar UI");

const host = document.createElement("div");
host.id = "shackademy-longevity-content";
document.body.appendChild(host);

loadInto("longevity-ui.js");
const UI = dom.window.SHACKADEMY_LONGEVITY_UI;

let pushed = null;
dom.window.addEventListener("shackademy-longevity-render", (e) => {
  pushed = e.detail;
});

check("UI module exposes its API", typeof UI?.mount, "function");
check("panel stays open on the chart page", UI.hasChart(), true);

UI.mount(host);

// mount() reads storage asynchronously, so let the callback run.
setTimeout(() => {
  let html = host.innerHTML;
  check("prompts for gender before calculating", html.includes("Choose a gender"), true);
  check("renders a gender control per person", (html.match(/data-sex/g) || []).length, 4);
  check("renders the nation selector", html.includes("shk-lng-nation"), true);
  check("no chart series pushed without gender", pushed?.series.length, 0);

  document.querySelector('.shk-lng-seg[data-person="0"] button[data-sex=m]').click();
  document.querySelector('.shk-lng-seg[data-person="1"] button[data-sex=f]').click();

  html = host.innerHTML;
  const headline = (html.match(/headline-value">([^<]*)/) || [])[1];
  note("headline shown in sidebar", headline);
  check("headline renders a sensible percentage", /^9[0-9]\.[0-9]%$/.test(headline || ""), true);
  check("client names used in the copy", html.includes("John") && html.includes("Jane"), true);
  check("ONS boundary explained to the user",
    html.includes("ONS publishes no data beyond age 100"), true);
  check("explainer present", html.includes("What this actually shows"), true);
  check("OGL attribution present", html.includes("Open Government Licence"), true);
  check("states these are not Voyant's figures",
    html.includes("not produced by Voyant"), true);

  check("two series pushed to the chart", pushed?.series.length, 2);
  check("adjusted series is clearly labelled as ours",
    pushed.series[0].name.startsWith("Shackademy:"), true);
  check("adjusted series covers every point", pushed.series[0].data.length, 60);
  check("survival series sent as a percentage, not a fraction",
    pushed.series[1].data[0], 100, 1e-9);

  const cb = document.querySelector("#shk-lng-show-survival");
  cb.checked = false;
  cb.dispatchEvent(new dom.window.Event("change"));
  check("survival toggle removes only that series", pushed.series.length, 1);

  UI.teardown();
  check("teardown clears the chart", pushed.series.length, 0);

  report();
}, 50);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
function report() {
  const pad = (s, n) => String(s).padEnd(n);
  let passes = 0;
  console.log();
  for (const r of results) {
    if (r.name === "SECTION") {
      console.log("\n" + "-".repeat(74) + "\n  " + r.actual + "\n" + "-".repeat(74));
    } else if (r.ok === null) {
      console.log("       " + pad(r.name, 50) + r.actual);
    } else {
      if (r.ok) passes++;
      console.log(
        (r.ok ? "  PASS " : "  FAIL ") +
          pad(r.name, 50) +
          (r.ok ? "" : `got ${JSON.stringify(r.actual)}, expected ${JSON.stringify(r.expected)}`),
      );
    }
  }
  console.log();
  console.log(
    failures === 0
      ? `All ${passes} checks passed.`
      : `${failures} of ${passes + failures} checks FAILED.`,
  );
  process.exit(failures === 0 ? 0 : 1);
}
