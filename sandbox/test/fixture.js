// fixture.js
// Rebuilds the DOM structure of a Voyant "Probability of Success" chart using
// the real values from the sample plan (John 56 / Jane 40, PoS 100 falling to
// 98 at John 92 and 96 at John 109, mortality marker on John at 100).
//
// This is a reconstruction of the structure the parser depends on, not a
// verbatim copy of a saved page. It reproduces every feature the parser reads:
// point aria-labels and marker paths, the person colour classes on the y-axis
// title, and the paired SVG/HTML event markers. Before shipping, run the same
// harness against a genuine saved copy of the page as a final check.

(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.SHACKADEMY_FIXTURE = factory();
})(typeof self !== "undefined" ? self : this, function () {
  // Geometry copied from the sample: first point at x=9.267, spacing 18.5333.
  const X0 = 9.2666666666667;
  const DX = 18.533333333333;
  const N = 60; // John 56..115, Jane 40..99

  const EVENTS = [
    // [x, label, person index or null, isMortality]
    [9, "Plan Start", null, false],
    [46, "Jane promotion", 1, false],
    [65, "Pay off mortgage", 0, false],
    [102, "Redundancy", 0, false],
    [139, "John Retirement", null, false],
    [176, "Stop lump sum", null, false],
    [195, "Stop lump sum conts", 0, false],
    [232, "John windfall", null, false],
    [306, "Jane scaling back", 1, false],
    [361, "Jane IP end date (ABC Insurer)", null, false],
    [639, "Sell for care", 0, false],
    [751, "Later life", 0, false],
    [825, "Mortality", 0, true],
  ];

  function posFor(step) {
    // John's age = 56 + step
    const johnAge = 56 + step;
    if (johnAge >= 109) return 96;
    if (johnAge >= 92) return 98;
    return 100;
  }

  function build(document) {
    const wrap = document.createElement("div");
    wrap.className = "single-chart";
    wrap.innerHTML = '<div id="letsseeChartSingle"></div>';
    const inner = wrap.querySelector("#letsseeChartSingle");

    const container = document.createElement("div");
    container.className = "chart-container";
    container.setAttribute("data-highcharts-chart", "20");
    inner.appendChild(container);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    container.appendChild(svg);

    // --- data points -------------------------------------------------------
    const markers = document.createElementNS(svgNS, "g");
    markers.setAttribute(
      "class",
      "highcharts-markers highcharts-series-0 highcharts-line-series highcharts-tracker",
    );
    svg.appendChild(markers);

    for (let t = 0; t < N; t++) {
      const x = X0 + t * DX;
      const pos = posFor(t);
      const p = document.createElementNS(svgNS, "path");
      // Highcharts writes circle markers offset by the radius; the parser only
      // uses x differences so the offset is harmless. Mirrored here anyway.
      p.setAttribute("d", `M ${(x - 2).toFixed(1)} 35.9 A 2 2 0 1 1 ${(x - 2).toFixed(1)} 35.9 Z`);
      p.setAttribute("class", "highcharts-point");
      p.setAttribute(
        "aria-label",
        `John's Age ${56 + t}, Jane's Age ${40 + t}, Probability of Success, £${pos}`,
      );
      markers.appendChild(p);
    }

    // --- decoy points the parser must ignore -------------------------------
    const decoys = document.createElementNS(svgNS, "g");
    decoys.setAttribute("class", "highcharts-markers highcharts-series-2 stages-timeline");
    svg.appendChild(decoys);
    ["stageTimeline_abc_0.", "stageTimeline_abc_1."].forEach((label) => {
      const p = document.createElementNS(svgNS, "path");
      p.setAttribute("d", "M 9.5 375 A 2 2 0 1 1 9.5 375 Z");
      p.setAttribute("class", "highcharts-point");
      p.setAttribute("aria-label", " " + label);
      decoys.appendChild(p);
    });

    // --- event markers, SVG side -------------------------------------------
    const evG = document.createElementNS(svgNS, "g");
    evG.setAttribute(
      "class",
      "highcharts-markers highcharts-series-4 highcharts-scatter-series event-timeline",
    );
    svg.appendChild(evG);
    EVENTS.forEach(([x, label]) => {
      const img = document.createElementNS(svgNS, "image");
      img.setAttribute("class", "highcharts-point event-indicators");
      img.setAttribute("x", String(x));
      img.setAttribute("y", "373");
      img.setAttribute(
        "aria-label",
        `Event marker: ${label}. Press enter to display more details.`,
      );
      evG.appendChild(img);
    });

    // --- event markers, HTML side (carries the person colour class) --------
    const evHtml = document.createElement("div");
    evHtml.className =
      "highcharts-data-labels highcharts-series-4 highcharts-scatter-series event-timeline";
    container.appendChild(evHtml);
    EVENTS.forEach(([x, label, person, isMortality]) => {
      const lab = document.createElement("div");
      lab.className = "highcharts-label highcharts-data-label";
      const icon = isMortality
        ? "icon-timeline_mortality"
        : person !== null
          ? "icon-timeline_event"
          : "icon-control_detailed";
      const personCls = person !== null ? ` text-person-${person}` : "";
      lab.innerHTML = `<span><span class="icon ${icon}${personCls} largest chart-event-indicator"></span></span>`;
      evHtml.appendChild(lab);
    });

    // --- y-axis title, which names the people ------------------------------
    const axis = document.createElement("div");
    axis.className = "highcharts-axis highcharts-yaxis";
    axis.innerHTML =
      '<span class="highcharts-axis-title">' +
      '<div class="icon icon-control_person text-person-0 medium" role="img" aria-label="John\'s Age"></div>' +
      '<div class="icon icon-control_person text-person-1 medium" role="img" aria-label="Jane\'s Age"></div>' +
      "</span>";
    container.appendChild(axis);

    return wrap;
  }

  return { build, N, EVENTS, posFor };
});
