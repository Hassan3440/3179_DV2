
"use strict";

/*
  AUSTRALIA'S VANISHING WILDLIFE
  ACTUAL VISUAL REDESIGN - VERSION 4

  This file:
  1. Loads all 13 original Vega-Lite JSON files.
  2. Adjusts their real plotting dimensions.
  3. Improves axes, legends and mark styling.
  4. Creates professional figure cards.
  5. Adds expandable chart viewing.
  6. Adds project metadata.

  It preserves data, fields, tooltips, selections
  and geographic map projections.
*/

window.WILDLIFE_VISUAL_VERSION = "4.0";

const chartRegistry = [
  ["chart1",  "chart01_mosaic.json",              "Conservation status",                "chart"],
  ["chart2",  "chart02_population.json",          "Bird population change",             "chart"],
  ["chart3",  "chart03_isotype.json",             "Critical risk by animal group",       "chart"],
  ["chart4",  "chart04_choropleth.json",          "Threatened wildlife geography",      "map"],
  ["chart5",  "chart05_hexbin.json",              "Bird observation hotspots",         "map"],
  ["chart6",  "chart06_protected_areas.json",     "Protected land across Australia",    "map"],
  ["chart7",  "chart07_fire_extent.json",         "The 2019–20 bushfire footprint",     "map"],
  ["chart8",  "chart08_threat_heatmap.json",      "Threats by animal group",           "chart"],
  ["chart9",  "chart09_threat_intersections.json", "Overlapping environmental threats",  "chart"],
  ["chart10", "chart10_threat_waffle.json",       "Compound wildlife pressures",        "chart"],
  ["chart11", "chart11_fauna_small_multiples.json", "Four decades of wildlife change",    "chart"],
  ["chart12", "chart12_protected_history.json",  "Protected land growth",             "chart"],
  ["chart13", "chart13_target_progress.json",    "Progress towards 30%",              "chart"]
];


/* =====================================================
   A. VISUAL STYLE
   Loaded directly by JavaScript to avoid old CSS
   overrides and specificity conflicts.
   ===================================================== */

function installVisualStyles() {
  const existing = document.getElementById(
    "wildlife-final-overrides"
  );

  if (existing) existing.remove();

  const style = document.createElement("style");
  style.id = "wildlife-final-overrides";

  style.textContent = `

    /* Enhanced professional figure cards */

    .fg-card {
      width: 100%;
      max-width: 100%;
      margin: 28px 0 32px !important;
      padding: 0 !important;

      background: #fff !important;
      border: 1px solid #d4dfd6 !important;
      border-radius: 17px !important;

      box-shadow:
        0 12px 34px rgba(33, 65, 49, .065) !important;

      overflow: hidden;
      position: relative;
      transition:
        border-color .2s ease,
        box-shadow .2s ease;
    }

    .fg-card:hover {
      border-color: #acc6b5 !important;
      box-shadow:
        0 19px 43px rgba(33, 65, 49, .10) !important;
    }

    .fg-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;

      padding: 21px 25px;

      background:
        linear-gradient(
          110deg,
          #f6faf6 0%,
          #ffffff 100%
        );

      border-bottom: 1px solid #e0e9e1;
    }

    .fg-heading {
      min-width: 0;
    }

    .fg-eyebrow {
      display: block;
      margin-bottom: 6px;

      color: #b76043;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .13em;
      text-transform: uppercase;
    }

    .fg-title {
      display: block;

      font-family: "Fraunces", Georgia, serif;
      font-size: clamp(18px, 2.3vw, 24px);
      font-weight: 650;
      color: #254236;
      line-height: 1.25;
      letter-spacing: -.015em;
    }

    .fg-expand {
      flex-shrink: 0;
      padding: 9px 15px;

      color: #315346;
      font-family: "Source Sans 3", sans-serif;
      font-size: 13px;
      font-weight: 700;

      background: #fff;
      border: 1px solid #cbdacf;
      border-radius: 30px;

      box-shadow: 0 3px 10px rgba(0,0,0,.035);
      cursor: pointer;
    }

    .fg-expand:hover {
      background: #e6f0e8;
      border-color: #83ad93;
    }

    .fg-content {
      display: block;
      width: 100%;
      min-width: 0;

      padding: 25px 23px 27px !important;
      background: #fff !important;
      text-align: center;
    }

    .fg-content > .chart {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0;

      margin: 0 auto !important;
      padding: 0 !important;

      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    .fg-content .vega-embed {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 auto !important;
      padding: 0 !important;
    }

    .fg-content .vega-embed > svg {
      display: block !important;
      width: 100% !important;
      height: auto !important;
      max-width: 100% !important;
      margin: 0 auto !important;
      overflow: visible;
    }

    .fg-content .vega-bindings {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      gap: 11px;
      margin: 18px auto 0;
      padding: 13px;

      background: #f4f8f3;
      border: 1px solid #e1eae2;
      border-radius: 9px;

      color: #315346;
      font-size: 13px;
      font-weight: 700;
    }

    .fg-content .vega-bindings select {
      max-width: 100%;
      padding: 7px 11px;

      border: 1px solid #bfcfc2;
      border-radius: 7px;
      background: #fff;

      color: #254236;
    }

    .fg-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;

      padding: 12px 25px;

      background: #fafcf9;
      border-top: 1px solid #e8eee8;

      color: #708579;
      font-family: "Source Sans 3", sans-serif;
      font-size: 12px;
    }

    .fg-bottom strong {
      color: #477562;
      font-weight: 700;
    }

    /* Extra care for composed charts */

    .fg-card[data-chart="chart3"] .fg-content,
    .fg-card[data-chart="chart9"] .fg-content,
    .fg-card[data-chart="chart11"] .fg-content {
      padding: 27px 19px !important;
    }

    /* Map cards */

    .fg-card[data-kind="map"] {
      border-color: #cbdccd !important;
    }

    .fg-card[data-kind="map"] .fg-content {
      padding: 15px 21px 22px !important;
    }

    /* Chart 10 stays compact within its existing
       waffle + statistics layout. */

    .fg-card[data-chart="chart10"] .fg-content {
      padding: 12px !important;
    }

    /* Fullscreen expansion */

    .fg-card.fg-expanded {
      position: fixed !important;
      z-index: 10001 !important;

      top: 3vh !important;
      left: 3vw !important;

      width: 94vw !important;
      height: 94vh !important;

      max-width: none !important;
      margin: 0 !important;

      overflow: auto !important;

      box-shadow:
        0 25px 90px rgba(0,0,0,.3) !important;
    }

    .fg-screen-overlay {
      position: fixed;
      z-index: 10000;

      inset: 0;
      background: rgba(15, 32, 25, .80);
      backdrop-filter: blur(4px);
    }

    /* Image sections: more photographic presence */

    .threat-card img {
      height: 285px !important;
      object-fit: cover !important;
    }

    .wildlife-card img,
    .future-card img {
      height: 270px !important;
      object-fit: cover !important;
    }

    /* Consistent findings */

    .chart-section .finding {
      background: #e4eee5 !important;
      border-left: 4px solid #6d9a7d !important;
      border-radius: 0 10px 10px 0;
      padding: 20px 23px !important;
    }

    /* Project credits */

    .fg-metadata {
      margin: 55px 0;
      padding: 35px;

      background: #fffaf2;
      border: 1px solid #e7dfd3;
      border-radius: 17px;

      box-shadow: 0 12px 34px rgba(33,65,49,.045);
    }

    .fg-metadata h2 {
      margin: 0 0 25px;
      color: #254236;
    }

    .fg-meta-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0,1fr));
      gap: 14px;
      margin-bottom: 25px;
    }

    .fg-meta-cell {
      padding: 19px;

      background: #fff;
      border: 1px solid #e0e5de;
      border-radius: 11px;
    }

    .fg-meta-cell b {
      display: block;
      margin-bottom: 8px;

      color: #687f71;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .07em;
    }

    .fg-meta-cell span {
      color: #254236;
      overflow-wrap: anywhere;
    }

    .fg-metadata p {
      color: #4c6255;
      line-height: 1.75;
    }

    /* Mobile */

    @media(max-width: 850px) {
      .fg-meta-grid {
        grid-template-columns: repeat(2,1fr);
      }

      .fg-header {
        padding: 17px;
      }

      .fg-content {
        overflow-x: auto;
      }
    }

    @media(max-width: 570px) {
      .fg-meta-grid {
        grid-template-columns: 1fr;
      }

      .fg-metadata {
        padding: 23px 18px;
      }

      .fg-content .vega-embed {
        min-width: 590px;
      }

      .fg-bottom {
        flex-wrap: wrap;
      }

      .fg-expanded .fg-content {
        overflow-x: auto;
      }
    }

  `;

  document.head.appendChild(style);
}


/* =====================================================
   B. PREPARE CHART FRAME
   ===================================================== */

function prepareChart(id, title, kind, position) {

  const element = document.getElementById(id);
  if (!element) return null;

  if (element.closest(".fg-card")) {
    return element;
  }

  const card = document.createElement("div");
  card.className = "fg-card";
  card.dataset.chart = id;
  card.dataset.kind = kind;

  const header = document.createElement("div");
  header.className = "fg-header";

  const heading = document.createElement("div");
  heading.className = "fg-heading";

  const smallLabel = document.createElement("span");
  smallLabel.className = "fg-eyebrow";

  smallLabel.textContent =
    (kind === "map" ? "GEOGRAPHIC VIEW" : "DATA VISUALISATION") +
    " / " +
    String(position).padStart(2, "0");

  const headingTitle = document.createElement("strong");
  headingTitle.className = "fg-title";
  headingTitle.textContent = title;

  heading.append(smallLabel, headingTitle);

  const expand = document.createElement("button");
  expand.type = "button";
  expand.className = "fg-expand";
  expand.textContent = "⤢ Expand";

  expand.addEventListener("click", function() {
    toggleExpanded(card, expand);
  });

  header.append(heading, expand);

  const content = document.createElement("div");
  content.className = "fg-content";

  element.parentNode.insertBefore(card, element);
  content.appendChild(element);

  const bottom = document.createElement("div");
  bottom.className = "fg-bottom";

  const left = document.createElement("span");
  left.textContent = kind === "map"
    ? "Spatial analysis"
    : "Interactive statistical visualisation";

  const right = document.createElement("strong");
  right.textContent = "Hover to investigate";

  bottom.append(left, right);
  card.append(header, content, bottom);

  return element;
}


/* =====================================================
   C. EXPAND / CLOSE
   ===================================================== */

let activeExpanded = null;

function toggleExpanded(card, button) {

  if (activeExpanded) {
    closeExpanded();
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "fg-screen-overlay";
  overlay.id = "fg-screen-overlay";

  overlay.addEventListener("click", closeExpanded);

  document.body.appendChild(overlay);

  card.classList.add("fg-expanded");
  button.textContent = "✕ Close";

  document.body.style.overflow = "hidden";

  activeExpanded = { card, button, overlay };
}

function closeExpanded() {

  if (!activeExpanded) return;

  activeExpanded.card.classList.remove("fg-expanded");
  activeExpanded.button.textContent = "⤢ Expand";
  activeExpanded.overlay.remove();

  document.body.style.overflow = "";
  activeExpanded = null;
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeExpanded();
  }
});


/* =====================================================
   D. ACTUAL VEGA-LITE SPECIFICATION IMPROVEMENTS
   ===================================================== */

function enhanceMarks(node, chartId) {

  if (!node || typeof node !== "object") return;

  if (Array.isArray(node)) {
    node.forEach(child => enhanceMarks(child, chartId));
    return;
  }

  if (node.mark) {

    if (typeof node.mark === "string") {
      node.mark = { type: node.mark };
    }

    const mark = node.mark;
    const type = mark.type;

    /* Real stroke improvements */

    if (type === "line") {
      mark.strokeWidth = Math.max(
        Number(mark.strokeWidth) || 0,
        chartId === "chart11" ? 3.4 : 3.2
      );
      mark.strokeCap = "round";
      mark.strokeJoin = "round";
    }

    /* Softer bars */

    if (type === "bar") {
      mark.cornerRadiusEnd =
        mark.cornerRadiusEnd === undefined
          ? 5
          : mark.cornerRadiusEnd;
    }

    /* Chart 3: larger dots */
    if (
      chartId === "chart3" &&
      (type === "circle" || type === "point") &&
      !(node.encoding && node.encoding.size)
    ) {
      mark.size = Math.max(
        Number(mark.size) || 0,
        135
      );
      mark.filled = true;
    }

    /* Clearer intersection dots for Chart 9.
       We do not override the existing conditional
       size encoding, which shows selected threats. */

    if (chartId === "chart9" && type === "circle") {
      mark.opacity = 1;
    }
  }

  for (const key of Object.keys(node)) {

    if (
      key === "data" ||
      key === "values" ||
      key === "encoding" ||
      key === "config"
    ) {
      continue;
    }

    if (key !== "mark") {
      enhanceMarks(node[key], chartId);
    }
  }
}


/* Change REAL plot dimensions, not just CSS size */

function improveDimensions(spec, chartId, availableWidth) {

  const wide = Math.max(
    700,
    Math.min(890, availableWidth)
  );

  /* Chart 10 has its own two-column waffle layout.
     Changing width here would overflow its panel. */

  if (chartId === "chart10") {
    return;
  }

  /* Preserve original map projection dimensions.
     Different map projections cannot safely be
     resized by changing width alone. */

  if (["chart4", "chart5", "chart6", "chart7"]
      .includes(chartId)) {
    return;
  }

  /* Chart 3: true faceted isotype chart */

  if (chartId === "chart3" && spec.facet && spec.spec) {

    const cols = Number(spec.columns) || 3;

    spec.spec.width = Math.floor(
      (wide - 95) / cols
    );

    spec.spec.height = Math.max(
      Number(spec.spec.height) || 0,
      155
    );

    spec.spacing = 22;
    return;
  }

  /* Chart 11: four small-multiple plots */

  if (chartId === "chart11" && spec.facet && spec.spec) {

    const cols = Number(spec.columns) || 2;

    spec.spec.width = Math.floor(
      (wide - 65) / cols
    );

    spec.spec.height = 240;
    spec.spacing = 27;
    return;
  }

  /* Other faceted chart layouts */

  if (spec.facet && spec.spec) {

    const cols = Number(spec.columns) || 2;

    spec.spec.width = Math.floor(
      (wide - 70) / cols
    );

    spec.spacing = 22;
    return;
  }

  /* Chart 9, Chart 12 and Chart 13:
     vertically concatenated visualisations */

  if (Array.isArray(spec.vconcat)) {

    spec.vconcat.forEach(view => {

      view.width = wide;

      if (chartId === "chart9") {

        if (typeof view.height === "number") {
          view.height = Math.round(
            view.height * 1.08
          );
        }

      }
    });

    spec.spacing = chartId === "chart9" ? 15 : 23;
    return;
  }

  /* Side-by-side compositions.
     Keep their existing sizes so that no individual
     panel is accidentally expanded offscreen. */

  if (Array.isArray(spec.hconcat)) {
    return;
  }

  /* Normal and layered Vega-Lite charts */

  if (spec.layer || spec.mark) {

    spec.width = wide;

    if (chartId === "chart2") {
      spec.height = 345;
    }

    if (chartId === "chart8") {
      spec.height = 370;
    }

    return;
  }

  /* Fallback for a basic single-view specification */

  if (typeof spec.width === "number") {
    spec.width = wide;
  }
}


/* Polished common typography */

function improveTheme(spec) {

  const original = spec.config || {};

  spec.config = {

    ...original,

    font: "Source Sans 3",

    axis: {
      ...(original.axis || {}),

      labelFont: "Source Sans 3",
      titleFont: "Source Sans 3",

      labelFontSize: 13,
      titleFontSize: 14,

      labelColor: "#4b6658",
      titleColor: "#29483d",

      labelPadding: 9,
      titlePadding: 13,

      gridColor: "#e2eae3",
      gridOpacity: .75,

      domainColor: "#c9d8cc",
      tickColor: "#c9d8cc"
    },

    legend: {
      ...(original.legend || {}),

      labelFont: "Source Sans 3",
      titleFont: "Source Sans 3",

      labelFontSize: 12,
      titleFontSize: 13,

      labelColor: "#4b6658",
      titleColor: "#29483d",

      padding: 10
    },

    header: {
      ...(original.header || {}),

      labelFont: "Source Sans 3",
      titleFont: "Source Sans 3",

      labelFontSize: 14,
      titleFontSize: 14,

      labelColor: "#29483d",
      titleColor: "#29483d"
    },

    view: {
      ...(original.view || {}),
      stroke: null
    }

  };

  spec.background = "#ffffff";
}


/* =====================================================
   E. FETCH ORIGINAL SPEC, UPGRADE, THEN RENDER
   ===================================================== */

async function renderChart(id, filename, kind) {

  const element = document.getElementById(id);

  if (!element) {
    console.warn("No HTML container for:", id);
    return;
  }

  const path = "specs/" + filename;

  try {

    /* Fetch fresh JSON instead of asking Vega Embed
       to use a potentially cached JSON file. */

    const response = await fetch(
      path + "?visual=4",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(
        "HTTP " + response.status + " for " + path
      );
    }

    const spec = await response.json();

    const containerWidth =
      element.parentElement.getBoundingClientRect().width;

    const availableWidth = Math.max(
      700,
      containerWidth - 90
    );

    improveDimensions(spec, id, availableWidth);

    /* Geographical maps retain their original
       projection geometry. */

    if (kind !== "map") {
      enhanceMarks(spec, id);
    }

    improveTheme(spec);

    /* The specification itself is now different.
       This is not just a CSS resize. */

    await vegaEmbed(element, spec, {

      actions: false,
      renderer: "svg"

    });

    console.log(
      "VISUAL V4: " + id + " redesigned successfully"
    );

  } catch(error) {

    console.error(
      "Failed to redesign " + id,
      error
    );

    element.textContent =
      "Unable to load " + id +
      ". Check the browser console.";

  }
}


/* =====================================================
   F. FINAL METADATA
   ===================================================== */

function installMetadata() {

  if (
    document.querySelector(".fg-metadata") ||
    document.querySelector(".project-metadata") ||
    document.querySelector(".metadata-section")
  ) {
    return;
  }

  const footer = document.querySelector("footer");
  if (!footer) return;

  const metadata = document.createElement("section");
  metadata.className = "fg-metadata";

  metadata.innerHTML = `

    <h2>Project Metadata</h2>

    <div class="fg-meta-grid">

      <div class="fg-meta-cell">
        <b>Author</b>
        <span>Hassan Hashmi</span>
      </div>

      <div class="fg-meta-cell">
        <b>Unit</b>
        <span>FIT3179 Data Visualisation 2</span>
      </div>

      <div class="fg-meta-cell">
        <b>Campus</b>
        <span>Monash University Malaysia</span>
      </div>

      <div class="fg-meta-cell">
        <b>Year</b>
        <span>2026</span>
      </div>

    </div>

    <p>
      <strong>Data sources:</strong>
      Australian EPBC threatened species lists,
      Threatened Species Index,
      Australian biodiversity observation datasets,
      CAPAD terrestrial protected-area statistics,
      bushfire boundary data and
      Ward et al. (2021).
      Individual visualisations provide further
      source details.
    </p>

    <p>
      <strong>AI acknowledgement:</strong>
      Generative AI assisted with data-processing
      scripts, Vega-Lite specifications,
      webpage code, layout and debugging.
      The author reviewed, tested and assembled
      the final visualisation and its interpretations.
    </p>

    <p>
      <strong>Tools:</strong>
      Vega-Lite, Vega, JavaScript,
      HTML, CSS, Python and QGIS.
    </p>

  `;

  footer.parentElement.insertBefore(
    metadata,
    footer
  );
}


/* =====================================================
   G. WEBSITE INITIALISATION
   ===================================================== */

async function startWildlifeDashboard() {

  console.log(
    "%cWILDLIFE VISUAL REDESIGN V4 ACTIVE",
    "color:#b85f43;font-weight:bold;font-size:16px"
  );

  document.documentElement.classList.add(
    "wildlife-visual-v4"
  );

  installVisualStyles();

  chartRegistry.forEach((item, index) => {

    const [id, file, title, kind] = item;

    prepareChart(
      id,
      title,
      kind,
      index + 1
    );

  });

  installMetadata();

  await Promise.allSettled(
    chartRegistry.map(item => {
      const [id, file, title, kind] = item;
      return renderChart(id, file, kind);
    })
  );

  console.log(
    "WILDLIFE V4: Chart loading operations completed."
  );
}


/* Run after HTML is available */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    startWildlifeDashboard,
    { once: true }
  );

} else {

  startWildlifeDashboard();

}
