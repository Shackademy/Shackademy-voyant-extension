// chart-inject.js
// Runs in the MAIN world so it can reach Voyant's live Highcharts instance.
//
// Content scripts normally run in an isolated world and cannot see page
// JavaScript objects. Declaring this one with "world": "MAIN" in the manifest
// lets it call chart.addSeries() directly, which gives correct axis mapping,
// real legend entries, tooltip integration and survival across Voyant's own
// redraws. Drawing SVG paths by hand would need none of Voyant's cooperation
// but would lose all four.
//
// It holds no data and does no maths. The isolated world computes everything
// and posts values across; this file only draws.

(() => {
  if (window.__shackademyChartInject) return;
  window.__shackademyChartInject = true;

  const REQUEST = "shackademy-longevity-render";
  const REPLY = "shackademy-longevity-status";
  const SERIES_ID_PREFIX = "shackademy-longevity-";
  const SOURCE_SERIES = "Probability of Success";

  let lastPayload = null;

  function reply(ok, reason, extra) {
    window.dispatchEvent(
      new CustomEvent(REPLY, { detail: { ok, reason: reason || null, ...extra } }),
    );
  }

  // Find the chart holding Voyant's Monte Carlo line. Highcharts keeps a global
  // registry; entries go null as charts are destroyed, so filter carefully.
  function findChart() {
    const HC = window.Highcharts;
    if (!HC || !Array.isArray(HC.charts)) return null;
    for (const chart of HC.charts) {
      if (!chart || !chart.series) continue;
      const src = chart.series.find((s) => s && s.name === SOURCE_SERIES);
      if (src) return { chart, src };
    }
    return null;
  }

  function removeOurSeries(chart) {
    // Iterate backwards: removing mutates the array.
    for (let i = chart.series.length - 1; i >= 0; i--) {
      const s = chart.series[i];
      if (s && typeof s.options?.id === "string" &&
          s.options.id.startsWith(SERIES_ID_PREFIX)) {
        s.remove(false);
      }
    }
  }

  function render(payload) {
    const found = findChart();
    if (!found) {
      reply(false, "no-chart");
      return;
    }
    const { chart, src } = found;

    // Highcharts stores the x values of the source series; reusing them keeps
    // our points aligned to Voyant's own categories exactly.
    const xs = src.xData || src.points?.map((p) => p.x) || [];
    if (!xs.length) {
      reply(false, "no-x-data");
      return;
    }

    try {
      removeOurSeries(chart);

      if (payload && payload.series) {
        payload.series.forEach((spec, i) => {
          const data = spec.data
            .map((y, idx) => (y === null || xs[idx] === undefined ? null : [xs[idx], y]))
            .filter(Boolean);

          chart.addSeries(
            {
              id: SERIES_ID_PREFIX + i,
              name: spec.name,
              type: "line",
              data,
              color: spec.color,
              dashStyle: spec.dashStyle || "Solid",
              lineWidth: spec.lineWidth || 3,
              marker: { enabled: false },
              enableMouseTracking: true,
              zIndex: 5,
              tooltip: {
                valueSuffix: "%",
                valueDecimals: 1,
              },
            },
            false,
          );
        });
      }

      chart.redraw();
      reply(true, null, { seriesCount: payload?.series?.length || 0 });
    } catch (err) {
      reply(false, "exception", { message: String(err && err.message) });
    }
  }

  window.addEventListener(REQUEST, (e) => {
    lastPayload = e.detail;
    render(lastPayload);
  });

  // Voyant rebuilds the chart on navigation and on plan edits, which discards
  // our series. Re-apply whenever a new chart appears.
  let pollTimer = null;
  function watch() {
    clearInterval(pollTimer);
    let lastChartRef = null;
    pollTimer = setInterval(() => {
      if (!lastPayload) return;
      const found = findChart();
      if (!found) {
        lastChartRef = null;
        return;
      }
      const hasOurs = found.chart.series.some(
        (s) => s && typeof s.options?.id === "string" &&
               s.options.id.startsWith(SERIES_ID_PREFIX),
      );
      if (found.chart !== lastChartRef || !hasOurs) {
        lastChartRef = found.chart;
        render(lastPayload);
      }
    }, 1000);
  }
  watch();

  // Let the isolated world know injection is available at all.
  window.dispatchEvent(new CustomEvent("shackademy-longevity-ready"));
})();
