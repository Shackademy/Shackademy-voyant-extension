# Longevity-adjusted Monte Carlo: implementation plan

Status: **awaiting approval. No extension files have been changed.**

Version target: 1.3.0

---

## 1. What the feature does

Voyant's "Probability of Success" line answers: *if you are alive at age X, what proportion of Monte Carlo runs still have money?*

It implicitly assumes you live to the end of the plan. This feature multiplies that line by the probability the household is actually still alive at age X, using ONS cohort mortality, and plots the result.

Three lines end up on the chart:

| Line | Meaning |
|---|---|
| Probability of Success (existing, Voyant) | P(plan solvent at age X, given alive) |
| Survival (new) | P(at least one person alive at age X) |
| Longevity-adjusted success (new) | product of the two |

Plus a headline summary in the sidebar.

---

## 2. Decisions already made

- **Survival basis:** last survivor. P(at least one alive), which matches a joint plan where spending continues after a first death.
- **Mortality basis:** cohort, not period. Accounts for projected future mortality improvement.
- **Region:** user-selectable UK nation.
- **Health/lifestyle adjustment:** out of scope for v1.
- **Inputs:** gender per person, region.
- **Outputs:** adjusted line, survival line, sidebar headline summary.

---

## 3. Data

### 3.1 Source

ONS **Past and projected period and cohort life tables: 2024-based, UK, 1981 to 2074**, released 15 May 2026. This is the current release and supersedes the 2022-based tables. Licensed under Open Government Licence v3.0, so embedding is permitted with attribution.

The specific dataset needed is **Numbers surviving at exact age x (lx), principal projection**, cohort basis. It is published separately for England, Wales, Scotland, Northern Ireland and the UK.

### 3.2 Why lx rather than qx

`lx` is the number of a notional 100,000 births surviving to exact age x. Conditional survival is then a single division:

```
P(alive at age b | alive at age a) = lx(b) / lx(a)
```

for the same birth cohort. Using `qx` instead would mean compounding 60 rounded probabilities, which accumulates error. One division is cleaner and exactly reproduces ONS's own numbers.

### 3.3 The age 100 ceiling — RESOLVED

ONS publishes cohort tables only to **age 100**. Expectations of life at older ages are described as "highly uncertain" and deliberately excluded. The Voyant sample chart runs to **age 115**.

**Decision: no extrapolation. Cap each person individually at 100 and let the combined last-survivor line continue on the younger person alone, running to plan end.**

Why this works. The chart's right-hand edge is set by the *younger* person reaching their plan mortality age, and advisers typically set that at 99 or 100, which is exactly where ONS stops. So the younger person is almost always inside the published data. Only the older person runs off the end, and only for the final stretch. In the sample plan, John crosses 100 at chart position 44 of 59; Jane never crosses it.

**Known cost.** At the crossover, the older person's survival probability is not zero (roughly 12 to 15% for John at 100 from a start age of 56). Zeroing it produces a **visible step down of around 5 percentage points** in the survival line. This is a data-availability artefact, not a real change in longevity, and it biases the line conservative.

**Mitigation.** Annotate the crossover point on the chart, and state it plainly in the sidebar: beyond this age ONS publishes no data, so we defer to the plan's own mortality assumption. This is defensible rather than invented, because Voyant already asserts a death at that age and its own PoS line beyond that point already models a single-person household.

### 3.4 Getting the files

I cannot download the ONS `.xlsx` files directly. **Ben to download these five 2024-based editions** and drop them in the repo folder, after which I convert them to compact JSON. Take the **cohort** sheets, not period.

| Nation | Dataset page | File |
|---|---|---|
| UK | `datasets/numberssurvivingatexactagelxprincipalprojectionunitedkingdom` | `ukppp24lx.xlsx` |
| England | `.../numberssurvivingatexactagelxprincipalprojectionengland` | `enppp24lx.xlsx` |
| Wales | `.../numberssurvivingatexactagelxprincipalprojectionwales` | |
| Scotland | `.../numberssurvivingatexactagelxprincipalprojectionscotland` | |
| Northern Ireland | `.../numberssurvivingatexactagelxprincipalprojectionnorthernireland` | |

All under `https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/`.

### 3.5 Output format

A new `mortality-data.js` exposing `window.SHACKADEMY_MORTALITY`:

```js
window.SHACKADEMY_MORTALITY = {
  meta: {
    source: "ONS, Past and projected period and cohort life tables: 2024-based, UK, 1981 to 2074",
    released: "2026-05-15",
    basis: "cohort, principal projection",
    licence: "OGL v3.0",
    ageMax: 100,            // ONS published range
    extrapolatedTo: 120     // Kannisto beyond ageMax
  },
  // lx normalised to 1.0 at birth, keyed by nation > sex > birth year > age
  lx: { uk: { m: { 1955: [ ... ] } } }
};
```

Trimmed to birth years that could plausibly appear in a plan (roughly 1930 to 2010) and ages 20 upward, this should land around 200 to 300KB. The extension is already 3.7MB, so this is not a constraint.

---

## 4. Maths

For each person *i* with current age `a_i` and birth year `b_i`:

```
S_i(t) = lx_i(a_i + t) / lx_i(a_i)
```

Last survivor, assuming independence:

```
S(t) = 1 - (1 - S_1(t)) * (1 - S_2(t))
```

Adjusted line:

```
adjusted(t) = PoS(t) * S(t)
```

**Caveat to be stated in the UI:** independence is a simplification. Couples' mortality is positively correlated (shared environment, shared habits, bereavement effect), so true last-survivor probability is slightly *lower* than this formula gives. The effect is modest but it makes the adjusted line marginally optimistic. Modelling the correlation properly needs a copula and inputs nobody has, so independence is the standard approach.

### Headline metric — RESOLVED

```
Longevity-weighted probability of success
  = sum over t of [ PoS(t) * P(household ends in year t) ]
```

The probability the plan holds up *for as long as the household actually lasts*, integrating over when the second death occurs. It answers "will this plan work", as opposed to reading the adjusted line at an arbitrary age.

Alongside it, survival milestones: the ages at which last-survivor probability hits 50%, 25% and 10%.

### Why last survivor, not both alive

The plan must keep paying until the **second** death, so "at least one alive" is the correct weight. Using "both alive" would collapse the adjusted line far too fast, writing off every year in which one spouse is supporting themselves alone.

"Both alive" answers a different, lifestyle question. It is still worth showing to a client, and costs nothing extra, so the sidebar will present all three at a selected age:

- P(at least one alive) — drives the adjusted line
- P(both alive) = `S_1(t) * S_2(t)`
- P(neither alive) = `(1 - S_1(t)) * (1 - S_2(t))`

---

## 5. Rendering

### Recommended: MAIN-world Highcharts injection

Add a second content script entry running in `world: "MAIN"` (Chrome 111+, which is well within range for MV3). It reaches Voyant's live `Highcharts.charts` array, finds the chart containing a "Probability of Success" series, and calls `chart.addSeries()`.

Why this over drawing SVG manually:

- Correct axis mapping for free, no reverse-engineering pixel scales
- Real legend entries, so the lines can be toggled like Voyant's own
- Tooltip integration
- Survives Voyant's own redraws, resizes and year changes

Communication between the isolated-world content script (which owns `chrome.storage` and the sidebar) and the main-world script is via `CustomEvent` on `window`.

### Fallback: SVG overlay

If Voyant's CSP or Highcharts version blocks injection, draw `<path>` elements into the existing SVG. I have already worked out the coordinate mapping from your sample: the y-axis runs 0 to 110% across the 373px plot area, so `y = 468.5 - value * 3.3909`, derivable at runtime from the `.highcharts-yaxis-grid` gridline positions rather than hard-coded. Workable, but brittle and no legend or tooltip.

---

## 6. Reading ages and probabilities off the chart

Each data point carries an `aria-label`:

```
John's Age 56, Jane's Age 40, Probability of Success, £100
```

(The `£` is a Voyant formatting quirk. The value is a percentage.)

I have tested a parser against your sample and it correctly handles two-person plans, single-person plans, decimal values, and rejects the event-marker and stage-timeline labels that share the same container:

```js
/^(.+?)'s Age (\d+),\s*(?:(.+?)'s Age (\d+),\s*)?Probability of Success,\s*[^\d\-]*(-?[\d,]+(?:\.\d+)?)$/
```

This also gives us the **person names for free**, so the sidebar can label the gender inputs "John" and "Jane" rather than "Person 1" and "Person 2".

Birth year is derived as `currentCalendarYear - currentAge`, which is accurate to within a year depending on birthday. Acceptable at this granularity.

Chart detection is by DOM (`#letsseeChartSingle` / `.single-chart`) rather than by hash route, since that is stable regardless of Voyant's routing.

### 6.1 Reading the death events — VERIFIED

Voyant renders plan events as a scatter series whose HTML data labels carry icon classes. The mortality event is identifiable and attributable to a person:

```
icon-timeline_mortality text-person-0
```

`text-person-0` and `text-person-1` map to the two people via the y-axis title, which carries `aria-label="John's Age"` and `aria-label="Jane's Age"` on matching `text-person-N` elements. Marker x-positions convert to ages via the same linear scale as the data points.

Decoded from the sample, the last three events are:

| Event | John | Jane | Person |
|---|---|---|---|
| Sell for care | 90 | 74 | John |
| Later life | 96 | 80 | John |
| Mortality | 100 | 84 | **John** |

This matches the plan as described. The younger person's mortality is not drawn as a marker because it falls on the final data point, where the scatter series is clipped; fall back to the axis end for that person.

Use of this: it gives us each person's plan mortality age, which bounds the survival calculation and confirms where Voyant itself assumes death.

---

## 7. UI

A third tab in the existing sidebar nav, alongside Guide and Fields:

```
Guide | Fields | Longevity
```

Contents:

- Gender selector per person, labelled with the names scraped from the chart
- Region selector (England / Wales / Scotland / Northern Ireland / UK)
- Show/hide toggles for the two new lines
- Headline: longevity-weighted probability of success
- At a selected age: P(at least one alive), P(both alive), P(neither)
- Survival milestones (50% / 25% / 10% ages)
- Explanatory text (see below)
- Source and basis attribution

Lines appear automatically once gender and region are set.

### Sidebar text must state, in plain English

1. **What the adjusted line is.** Voyant's line assumes you live to the end of the plan. This one weights it by the chance you are actually still here.
2. **Last survivor, and why.** The money must last until the second death, so the line uses "at least one of you alive". The both-alive figure is shown separately and is a different question.
3. **The ONS boundary.** ONS publishes no cohort data beyond age 100. Above that we defer to the plan's own mortality assumption, which is why the survival line steps down at that point. Name the age it happens at.
4. **The independence caveat.** Couples' mortality is correlated, so true joint survival is a little lower than shown.
5. **The consistency wrinkle.** Voyant treats the plan's death ages as certainties; this overlay treats them as probabilities. The two are not perfectly consistent.
6. **Whose numbers these are.** Shackademy-derived from ONS data, not a Voyant output.

Selections persist in `chrome.storage.local` alongside the existing `shackademyEnabled` key. Nothing leaves the browser, consistent with the extension staying local and closed.

---

## 8. Files

| File | Change |
|---|---|
| `manifest.json` | version to 1.3.0; add MAIN-world content script entry; add new files to `web_accessible_resources` |
| `mortality-data.js` | **new** — ONS cohort lx, converted |
| `longevity.js` | **new** — parsing, survival maths, headline metric |
| `chart-inject.js` | **new** — MAIN-world Highcharts series injection |
| `content.js` | new Longevity panel tab, storage wiring, event bridge |
| `styles.css` | styles for the new panel tab |
| `sections.js` | optionally a lesson link for the new feature |

No changes to `fields.js` or `lessons.js`.

---

## 9. Risks

**Voyant DOM changes.** The whole feature depends on aria-label text and Highcharts internals. If Voyant changes either, the lines silently vanish. Mitigation: fail quietly, never break the existing extension, and show a clear "could not read chart data" state in the sidebar rather than a broken chart.

**Highcharts version coupling.** `addSeries` is stable API, but Voyant is on 11.4.8 and a major upgrade could shift behaviour.

**The age 100 extrapolation** is our modelling, not ONS's. Must be visually and textually distinguished.

**Independence assumption** slightly overstates joint survival, as above.

**Compliance framing.** This line is a Shackademy-derived statistic, not a Voyant output. Given how carefully your existing disclaimer is worded, the new lines should be visually distinct from Voyant's own series and labelled so that nobody screenshots the chart and presents it as something Voyant calculated. Suggest prefixing the legend entries, e.g. "Shackademy: longevity-adjusted".

---

## 10. Decisions log

| Question | Decision |
|---|---|
| Survival basis | Last survivor (at least one alive) |
| Mortality basis | Cohort, ONS 2024-based principal projection |
| Region | User-selectable UK nation |
| Health/lifestyle adjustment | Out of scope for v1 |
| Beyond ONS age 100 | Cap each person at 100, combined line continues on the younger person, annotated on chart and explained in sidebar |
| Headline metric | Longevity-weighted probability of success |
| Both-alive figure | Shown in sidebar as a secondary stat, not on the chart |
| Default state | Lines appear automatically once gender and region are set |
| ONS files | Ben downloads all five nations |

## 11. Next steps

1. Ben downloads the five ONS `lx` files into the repo folder
2. Convert to `mortality-data.js`, verify against ONS's own published life expectancy figures as a check
3. Build `longevity.js` and unit-test the survival maths against the same
4. Build `chart-inject.js`, confirm the MAIN-world approach works against live Voyant
5. Sidebar tab and styles
6. End-to-end test on a real plan, including a single-person plan and a plan whose mortality age is below 100
