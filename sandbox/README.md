# Sandbox: longevity-adjusted Monte Carlo

A complete, standalone copy of the extension with the longevity feature added.
**Nothing in the production extension has been modified.** When you are happy
with this, the changes get integrated back as a reviewed diff.

---

## First, one bit of tidying

Delete `sandbox/node_modules`. It is a symlink I created while testing and it
points at a temporary location, so it will dangle on your machine. If you want
to run the automated tests, remove it and run `npm install` instead.

---

## Testing it, easiest first

### 1. The browser harness (no Chrome extension, no Voyant login)

Open `test/harness.html` in any browser.

It builds a copy of the sample plan's chart structure, runs the real parsing and
survival code against it, and shows you three things side by side: the curves,
a year-by-year table, and a live preview of the sidebar. Rows shaded orange are
past the ONS data limit.

This is where to sanity-check the numbers by hand. Nothing here is mocked except
the chart markup itself.

### 2. The automated checks

```
cd sandbox
npm install
npm test
```

61 checks covering the ONS data, the chart parsing, the survival maths and the
sidebar. Among other things it verifies our reconstructed cohort tables against
ONS's own published life expectancy at 65, checks survival never increases with
age, and checks the adjusted line never rises above Voyant's own.

### 3. In Chrome, against the real thing

1. **Disable the live Shackademy extension first.** Both target the same site
   and use the same DOM element IDs, so running them together will produce a
   mess.
2. `chrome://extensions` → Developer mode → Load unpacked → select this
   `sandbox` folder.
3. Open a plan's Monte Carlo chart. The panel should open with a **Longevity**
   tab.
4. Set a gender for each person. The lines appear automatically.

The extension is titled **"Shackademy - Voyant Help (SANDBOX)"** in the
toolbar so you can tell them apart.

**This is the only step I could not test myself**, since it needs a Voyant
login. In particular, the MAIN-world Highcharts injection is unverified against
the live page. If the lines do not draw, the sidebar will say so and the numbers
will still be correct.

---

## What is here

| File | Purpose |
|---|---|
| `mortality-data.js` | ONS cohort survival, generated. 360KB. Do not hand-edit. |
| `longevity.js` | Chart parsing and survival maths. No DOM writing, no storage. |
| `longevity-ui.js` | The Longevity sidebar tab and the bridge to the chart. |
| `chart-inject.js` | Runs in the page's own world to add the series to Highcharts. |
| `tools/build-mortality-data.py` | Regenerates `mortality-data.js` from the ONS workbooks. |
| `test/harness.html` | Visual harness. |
| `test/run-tests.js` | Automated checks. |
| `test/fixture.js` | Rebuilds the sample chart's DOM structure. |

Changes to `content.js` are deliberately tiny: a nav button, a container div,
a `mount()` call, a `maybeRefresh()` call, a `teardown()` call, and one line so
the panel stays open on the chart page. `styles.css` is appended to, not altered.

---

## Regenerating the ONS data

When ONS publishes a new edition:

```
pip install openpyxl
python3 tools/build-mortality-data.py
```

It reads the five workbooks from `../ONS data/` and refuses to emit anything if
its internal validation fails.

---

## How the numbers work

**Cohort, not period.** Cohort tables allow for projected future improvements in
mortality, so they are the right basis for someone alive today looking decades
ahead. At age 65 the difference is about 1.3 years of life expectancy, and it
grows the younger the person is.

**Reconstructed, not invented.** ONS publishes cohort tables keyed by year of
birth 1981 onwards, which does not cover your clients. Every workbook also
carries period lx by age and calendar year, and walking its diagonal (age 56 in
2026, 57 in 2027, and so on) is the definition of a cohort table. The build
script proves this reproduces ONS's published cohort columns to within 1.3e-06,
which is their own rounding. No modelling of ours is involved.

**Last survivor.** The money must last until the second death, so the adjusted
line is weighted by the chance *at least one* person is alive. The chance both
are alive is a different, much lower number, shown in the sidebar because it is
worth knowing but is not what the plan has to survive.

**No extrapolation.** ONS stops at age 100. Above that, a person is treated as
no longer living, which is what the plan already assumes. In the sample plan
this costs 1.03 percentage points of survival at the crossover, visible as a
small step down in the survival line and explained in the sidebar.

**Headline figure.** The longevity-weighted probability of success integrates
the success probability over when the household actually ends, so it answers
"will the plan last as long as we do" rather than reading the adjusted line at
an arbitrary age.

---

## Known limitations

- **Independence.** The two lives are treated as independent. Real couples'
  mortality is correlated, so true joint survival is slightly lower than shown.
  Stated in the sidebar.
- **Consistency.** Voyant treats plan death ages as certainties; this overlay
  treats them as probabilities. The two are not perfectly reconciled.
- **Coverage gap.** For births 1975 to 1980 the period table's 2074 horizon
  bites before age 100, so data runs out between ages 94 and 99. Everyone else
  reaches 100.
- **Fragility.** The feature reads Voyant's aria-labels and Highcharts
  internals. If Voyant changes either, the lines disappear. It fails quietly and
  never interferes with the existing help functionality.
- **No SVG fallback yet.** If MAIN-world injection is blocked, the sidebar
  reports it rather than falling back to drawing paths by hand. Worth building
  only if the injection turns out not to work.

---

Survival data: ONS, *Past and projected period and cohort life tables:
2024-based, UK, 1981 to 2074*, released 15 May 2026. Contains public sector
information licensed under the Open Government Licence v3.0.
