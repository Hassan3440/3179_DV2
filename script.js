
"use strict";

/*
  AUSTRALIA'S VANISHING WILDLIFE
  VISUAL LAYOUT FIX - VERSION 4.1

  Based on the actual V4 script.js.

  Changes:
  1. Removes empty Vega binding strips.
  2. Focuses Chart 7 on NSW and Victoria.
  3. Removes Chart 9's excessive left padding.
  4. Fits Chart 9 within its white figure card.
  5. Preserves all 13 original chart JSON files.
  6. Preserves the existing V5 colour styling.
  7. Preserves expand buttons and project metadata.
*/

window.WILDLIFE_VISUAL_VERSION = "4.1";


/* ==============================================
   A. CHART REGISTRY
   ============================================== */

const chartRegistry = [
  [
    "chart1",
    "chart01_mosaic.json",
    "Conservation status",
    "chart"
  ],
  [
    "chart2",
    "chart02_population.json",
    "Bird population change",
    "chart"
  ],
  [
    "chart3",
    "chart03_isotype.json",
    "Critical risk by animal group",
    "chart"
  ],
  [
    "chart4",
    "chart04_choropleth.json",
    "Threatened wildlife geography",
    "map"
  ],
  [
    "chart5",
    "chart05_hexbin.json",
    "Bird observation hotspots",
    "map"
  ],
  [
    "chart6",
    "chart06_protected_areas.json",
    "Protected land across Australia",
    "map"
  ],
  [
    "chart7",
    "chart07_fire_extent.json",
    "The 2019–20 bushfire footprint",
    "map"
  ],
  [
    "chart8",
    "chart08_threat_heatmap.json",
    "Threats by animal group",
    "chart"
  ],
  [
    "chart9",
    "chart09_threat_intersections.json",
    "Overlapping environmental threats",
    "chart"
  ],
  [
    "chart10",
    "chart10_threat_waffle.json",
    "Compound wildlife pressures",
    "chart"
  ],
  [
    "chart11",
    "chart11_fauna_small_multiples.json",
    "Four decades of wildlife change",
    "chart"
  ],
  [
    "chart12",
    "chart12_protected_history.json",
    "Protected land growth",
    "chart"
  ],
  [
    "chart13",
    "chart13_target_progress.json",
    "Progress towards 30%",
    "chart"
  ]
];


/* ==============================================
   B. VISUAL STYLES
   ============================================== */

function installVisualStyles() {

  const oldStyle = document.getElementById(
    "wildlife-final-overrides"
  );

  if (oldStyle) {
    oldStyle.remove();
  }

  const style = document.createElement("style");

  style.id = "wildlife-final-overrides";

  style.textContent = `

    /* MAIN FIGURE CARD */

    .fg-card {
      width: 100%;
      max-width: 100%;
      margin: 28px 0 32px !important;
      padding: 0 !important;

      background: #FFFFFF !important;

      border: 1px solid #D4DFD6 !important;
      border-radius: 17px !important;

      box-shadow:
        0 12px 34px rgba(33,65,49,.065) !important;

      overflow: hidden;
      position: relative;

      transition:
        border-color .2s ease,
        box-shadow .2s ease;
    }

    .fg-card:hover {
      border-color: #ACC6B5 !important;

      box-shadow:
        0 19px 43px rgba(33,65,49,.10) !important;
    }


    /* CARD HEADER */

    .fg-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;

      padding: 21px 25px;

      background:
        linear-gradient(
          110deg,
          #F6FAF6 0%,
          #FFFFFF 100%
        );

      border-bottom: 1px solid #E0E9E1;
    }

    .fg-heading {
      min-width: 0;
    }

    .fg-eyebrow {
      display: block;
      margin-bottom: 6px;

      color: #B76043;

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


    /* EXPAND BUTTON */

    .fg-expand {
      flex-shrink: 0;

      padding: 9px 15px;

      color: #315346;

      font-family: "Source Sans 3", sans-serif;
      font-size: 13px;
      font-weight: 700;

      background: #FFFFFF;

      border: 1px solid #CBDACF;
      border-radius: 30px;

      box-shadow: 0 3px 10px rgba(0,0,0,.035);

      cursor: pointer;
    }

    .fg-expand:hover {
      background: #E6F0E8;
      border-color: #83AD93;
    }


    /* MAIN CHART CONTENT */

    .fg-content {
      display: block;

      width: 100%;
      min-width: 0;

      padding: 25px 23px 20px !important;

      background: #FFFFFF !important;

      text-align: center;
    }

    .fg-content > .chart {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0;

      min-height: 0 !important;

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


    /*
      IMPORTANT FIX 1:
      Hide unused empty Vega input containers.

      This removes the pale, blank horizontal
      strip visible below charts without controls.
    */

    .fg-content .vega-bindings:empty {
      display: none !important;

      height: 0 !important;
      min-height: 0 !important;

      margin: 0 !important;
      padding: 0 !important;

      border: 0 !important;
      background: transparent !important;
    }

    .fg-content .vega-bindings {
      display: flex;
      flex-wrap: wrap;

      justify-content: center;
      align-items: center;

      gap: 11px;

      margin: 13px auto 0;
      padding: 12px;

      background: #F4F8F3;

      border: 1px solid #E1EAE2;
      border-radius: 9px;

      color: #315346;

      font-size: 13px;
      font-weight: 700;
    }

    .fg-content .vega-bindings select {
      max-width: 100%;

      padding: 7px 11px;

      border: 1px solid #BFCFC2;
      border-radius: 7px;

      background: #FFFFFF;
      color: #254236;
    }


    /* CARD FOOTER */

    .fg-bottom {
      display: flex;

      align-items: center;
      justify-content: space-between;

      gap: 12px;

      padding: 12px 25px;

      background: #FAFCF9;

      border-top: 1px solid #E8EEE8;

      color: #708579;

      font-family: "Source Sans 3", sans-serif;
      font-size: 12px;
    }

    .fg-bottom strong {
      color: #477562;
      font-weight: 700;
    }


    /* COMPOSED CHARTS */

    .fg-card[data-chart="chart3"] .fg-content,
    .fg-card[data-chart="chart11"] .fg-content {
      padding: 25px 19px 16px !important;
    }


    /*
      IMPORTANT FIX 2:
      Chart 9 gets a full-width plotting area.

      The actual Vega JSON width and padding
      are also corrected in improveDimensions().
    */

    .fg-card[data-chart="chart9"] .fg-content {
      padding: 18px 15px 12px !important;
    }

    #chart9 {
      width: 100% !important;
      text-align: center !important;
    }

    #chart9 .vega-embed {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
    }

    #chart9 .vega-embed > svg {
      display: block !important;
      margin: 0 auto !important;

      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
    }


    /* MAP CARDS */

    .fg-card[data-kind="map"] {
      border-color: #CBDCCD !important;
    }

    .fg-card[data-kind="map"] .fg-content {
      padding: 15px 21px 16px !important;
    }


    /* CHART 7 SPECIFIC */

    .fg-card[data-chart="chart7"] .fg-content {
      overflow: hidden !important;
    }


    /* CHART 10 WAFFLE */

    .fg-card[data-chart="chart10"] .fg-content {
      padding: 12px !important;
    }


    /* EXPANDED VIEW */

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

      background: rgba(15,32,25,.80);

      backdrop-filter: blur(4px);
    }


    /* PHOTOGRAPHIC SECTIONS */

    .threat-card img {
      height: 285px !important;
      object-fit: cover !important;
    }

    .wildlife-card img,
    .future-card img {
      height: 270px !important;
      object-fit: cover !important;
    }


    /* FINDINGS */

    .chart-section .finding {
      background: #E4EEE5 !important;

      border-left: 4px solid #6D9A7D !important;
      border-radius: 0 10px 10px 0;

      padding: 20px 23px !important;
    }


    /* PROJECT METADATA */

    .fg-metadata {
      margin: 55px 0;
      padding: 35px;

      background: #FFFAF2;

      border: 1px solid #E7DFD3;
      border-radius: 17px;

      box-shadow:
        0 12px 34px rgba(33,65,49,.045);
    }

    .fg-metadata h2 {
      margin: 0 0 25px;
      color: #254236;
    }

    .fg-meta-grid {
      display: grid;

      grid-template-columns:
        repeat(4, minmax(0,1fr));

      gap: 14px;

      margin-bottom: 25px;
    }

    .fg-meta-cell {
      padding: 19px;

      background: #FFFFFF;

      border: 1px solid #E0E5DE;
      border-radius: 11px;
    }

    .fg-meta-cell b {
      display: block;

      margin-bottom: 8px;

      color: #687F71;

      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .07em;
    }

    .fg-meta-cell span {
      color: #254236;
      overflow-wrap: anywhere;
    }

    .fg-metadata p {
      color: #4C6255;
      line-height: 1.75;
    }


    /* RESPONSIVE */

    @media (max-width: 850px) {

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

    @media (max-width: 570px) {

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


/* ==============================================
   C. PREPARE CHART FRAME
   ============================================== */

function prepareChart(id, title, kind, position) {

  const element = document.getElementById(id);

  if (!element) {
    return null;
  }

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
    (
      kind === "map"
        ? "GEOGRAPHIC VIEW"
        : "DATA VISUALISATION"
    ) +
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

  expand.addEventListener("click", function () {
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

  left.textContent =
    kind === "map"
      ? "Spatial analysis"
      : "Interactive statistical visualisation";


  const right = document.createElement("strong");

  right.textContent = "Hover to investigate";

  bottom.append(left, right);

  card.append(header, content, bottom);

  return element;
}


/* ==============================================
   D. EXPAND AND CLOSE
   ============================================== */

let activeExpanded = null;


function toggleExpanded(card, button) {

  if (activeExpanded) {
    closeExpanded();
    return;
  }

  const overlay = document.createElement("div");

  overlay.className = "fg-screen-overlay";
  overlay.id = "fg-screen-overlay";

  overlay.addEventListener(
    "click",
    closeExpanded
  );

  document.body.appendChild(overlay);

  card.classList.add("fg-expanded");

  button.textContent = "✕ Close";

  document.body.style.overflow = "hidden";

  activeExpanded = {
    card,
    button,
    overlay
  };
}


function closeExpanded() {

  if (!activeExpanded) {
    return;
  }

  activeExpanded.card.classList.remove(
    "fg-expanded"
  );

  activeExpanded.button.textContent = "⤢ Expand";

  activeExpanded.overlay.remove();

  document.body.style.overflow = "";

  activeExpanded = null;
}


document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {
    closeExpanded();
  }

});


/* ==============================================
   E. ENHANCE MARK STYLING
   ============================================== */

function enhanceMarks(node, chartId) {

  if (!node || typeof node !== "object") {
    return;
  }

  if (Array.isArray(node)) {

    node.forEach(child => {
      enhanceMarks(child, chartId);
    });

    return;
  }

  if (node.mark) {

    if (typeof node.mark === "string") {
      node.mark = {
        type: node.mark
      };
    }

    const mark = node.mark;
    const type = mark.type;


    if (type === "line") {

      mark.strokeWidth = Math.max(
        Number(mark.strokeWidth) || 0,
        chartId === "chart11" ? 3.4 : 3.2
      );

      mark.strokeCap = "round";
      mark.strokeJoin = "round";
    }


    if (type === "bar") {

      if (mark.cornerRadiusEnd === undefined) {
        mark.cornerRadiusEnd = 5;
      }

    }


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


    if (
      chartId === "chart9" &&
      type === "circle"
    ) {

      mark.opacity = 1;
    }

  }


  for (const key of Object.keys(node)) {

    if (
      key === "data" ||
      key === "values" ||
      key === "encoding" ||
      key === "config" ||
      key === "mark"
    ) {
      continue;
    }

    enhanceMarks(node[key], chartId);
  }
}


/* ==============================================
   F. CHART 7: FOCUS THE FIRE MAP

   Your ABS TopoJSON uses:
   STE_CODE21 = "1" for NSW
   STE_CODE21 = "2" for Victoria.

   Filter ONLY the background state outlines.

   The original bushfire footprints remain intact.
   ============================================== */

function improveChart7Map(spec) {

  if (!Array.isArray(spec.layer)) {
    return;
  }

  const baseMap = spec.layer.find(layer => {

    return (
      layer.data &&
      typeof layer.data.url === "string" &&
      layer.data.url.includes(
        "australia_states.topojson"
      )
    );

  });


  if (!baseMap) {

    console.warn(
      "Chart 7: ABS basemap not found. " +
      "Keeping the existing projection."
    );

    return;
  }


  /*
    Keep NSW and Victoria on the basemap.

    Do not filter the fire layer or modify
    its original data.
  */

  const stateFilter = {
    filter:
      "datum.properties.STE_CODE21 === '1' || " +
      "datum.properties.STE_CODE21 === '2'"
  };


  baseMap.transform = [
    ...(baseMap.transform || []),
    stateFilter
  ];


  /*
    Vega-Lite will automatically fit the projection
    to the remaining NSW/Victoria geography.

    Explicit old centre, scale and translation
    settings would prevent this automatic fit.
  */

  spec.projection = {
    type:
      (spec.projection && spec.projection.type) ||
      "mercator"
  };


  console.log(
    "Chart 7: basemap focused on NSW and Victoria."
  );
}


/* ==============================================
   G. CHART 9: REMOVE EXCESSIVE PADDING
   ============================================== */

function improveChart9Layout(spec, availableWidth) {

  if (!Array.isArray(spec.vconcat)) {
    return;
  }


  /*
    The provided Chart 9 JSON uses 140px of
    EXTRA left padding.

    Vega-Lite already reserves space for the
    five threat labels, so this is unnecessary.
  */

  const originalPadding =
    typeof spec.padding === "object"
      ? spec.padding
      : {};


  spec.padding = {

    left: 12,
    right: 12,

    top:
      originalPadding.top !== undefined
        ? originalPadding.top
        : 15,

    bottom:
      originalPadding.bottom !== undefined
        ? originalPadding.bottom
        : 22

  };


  /*
    Reserve room for the actual Y-axis labels,
    rather than creating a second large margin.

    This keeps the plot within the card and
    distributes the space more evenly.
  */

  const plotWidth = Math.max(
    600,
    Math.min(
      910,
      Math.floor(availableWidth - 115)
    )
  );


  spec.vconcat.forEach(view => {

    view.width = plotWidth;

    /*
      Preserve the original chart heights
      and alignment between the bars and dots.
    */

  });


  spec.spacing = 12;

  spec.resolve = {
    ...(spec.resolve || {}),

    scale: {
      ...((spec.resolve || {}).scale || {}),
      x: "shared"
    }
  };


  console.log(
    "Chart 9: adjusted width and removed " +
    "excessive 140px left padding."
  );
}


/* ==============================================
   H. GENERAL CHART DIMENSIONS
   ============================================== */

function improveDimensions(
  spec,
  chartId,
  availableWidth
) {

  const wide = Math.max(
    700,
    Math.min(890, availableWidth)
  );


  /*
    Chart 10 is inside its separate
    waffle-and-statistics layout.
  */

  if (chartId === "chart10") {
    return;
  }


  /*
    Fix Chart 7 while leaving Maps 4–6 unchanged.
  */

  if (chartId === "chart7") {

    improveChart7Map(spec);

    return;
  }


  /*
    Preserve existing map proportions
    for Charts 4, 5 and 6.
  */

  if (
    ["chart4", "chart5", "chart6"]
      .includes(chartId)
  ) {
    return;
  }


  /*
    Chart 3: isotype small multiples
  */

  if (
    chartId === "chart3" &&
    spec.facet &&
    spec.spec
  ) {

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


  /*
    Chart 11: four wildlife trend panels
  */

  if (
    chartId === "chart11" &&
    spec.facet &&
    spec.spec
  ) {

    const cols = Number(spec.columns) || 2;

    spec.spec.width = Math.floor(
      (wide - 65) / cols
    );

    spec.spec.height = 240;
    spec.spacing = 27;

    return;
  }


  /*
    Other faceted charts
  */

  if (
    spec.facet &&
    spec.spec
  ) {

    const cols = Number(spec.columns) || 2;

    spec.spec.width = Math.floor(
      (wide - 70) / cols
    );

    spec.spacing = 22;

    return;
  }


  /*
    Chart 9 requires its own layout treatment.
  */

  if (chartId === "chart9") {

    improveChart9Layout(
      spec,
      availableWidth
    );

    return;
  }


  /*
    Charts 12 and 13 use vertical compositions.
  */

  if (Array.isArray(spec.vconcat)) {

    spec.vconcat.forEach(view => {
      view.width = wide;
    });

    spec.spacing = 23;

    return;
  }


  /*
    Preserve horizontal compositions.
  */

  if (Array.isArray(spec.hconcat)) {
    return;
  }


  /*
    Normal and layered views.
  */

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


  if (typeof spec.width === "number") {
    spec.width = wide;
  }
}


/* ==============================================
   I. CONSISTENT TYPOGRAPHY
   ============================================== */

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

      labelColor: "#4B6658",
      titleColor: "#29483D",

      labelPadding: 9,
      titlePadding: 13,

      gridColor: "#E2EAE3",
      gridOpacity: 0.75,

      domainColor: "#C9D8CC",
      tickColor: "#C9D8CC"

    },

    legend: {

      ...(original.legend || {}),

      labelFont: "Source Sans 3",
      titleFont: "Source Sans 3",

      labelFontSize: 12,
      titleFontSize: 13,

      labelColor: "#4B6658",
      titleColor: "#29483D",

      padding: 10

    },

    header: {

      ...(original.header || {}),

      labelFont: "Source Sans 3",
      titleFont: "Source Sans 3",

      labelFontSize: 14,
      titleFontSize: 14,

      labelColor: "#29483D",
      titleColor: "#29483D"

    },

    view: {

      ...(original.view || {}),

      stroke: null

    }

  };


  /*
    Keep the warm-green V5 palette in the
    original chart specifications and polish
    script. This function only standardises
    the general canvas and typography.
  */

  spec.background = "#FFFFFF";
}


/* ==============================================
   J. HIDE EMPTY VEGA CONTROL STRIPS
   ============================================== */

function hideEmptyVegaBindings(element) {

  const card = element.closest(".fg-card");

  if (!card) {
    return;
  }

  const bindings = card.querySelectorAll(
    ".vega-bindings"
  );


  bindings.forEach(binding => {

    const hasControl = Boolean(
      binding.querySelector(
        "select, input, button, textarea"
      )
    );

    const hasText =
      binding.textContent.trim().length > 0;


    /*
      Keep Chart 5's bird dropdown
      and Chart 7's state dropdown.
    */

    if (hasControl || hasText) {
      return;
    }


    binding.style.setProperty(
      "display",
      "none",
      "important"
    );

    binding.style.setProperty(
      "margin",
      "0",
      "important"
    );

    binding.style.setProperty(
      "padding",
      "0",
      "important"
    );

    binding.style.setProperty(
      "border",
      "0",
      "important"
    );

    binding.style.setProperty(
      "height",
      "0",
      "important"
    );

  });
}


/* ==============================================
   K. RENDER THE ACTUAL VEGA-LITE CHART
   ============================================== */

async function renderChart(id, filename, kind) {

  const element = document.getElementById(id);

  if (!element) {

    console.warn(
      "No HTML container found for:",
      id
    );

    return;
  }


  const path = "specs/" + filename;


  try {

    /*
      Fetch the original JSON file.

      The version query avoids confusing a
      cached older specification with the
      updated JavaScript logic.
    */

    const response = await fetch(

      path + "?visual=4.1",

      {
        cache: "no-store"
      }

    );


    if (!response.ok) {

      throw new Error(
        "HTTP " +
        response.status +
        " for " +
        path
      );

    }


    const spec = await response.json();


    const containerWidth =
      element.parentElement
        .getBoundingClientRect()
        .width;


    const availableWidth = Math.max(
      700,
      containerWidth - 90
    );


    /*
      Correct the Vega-Lite specification
      before compiling and rendering it.
    */

    improveDimensions(
      spec,
      id,
      availableWidth
    );


    if (kind !== "map") {

      enhanceMarks(
        spec,
        id
      );

    }


    improveTheme(spec);


    /*
      Keep using the existing global
      Vega-Embed function.

      If wildlife-v5-polish.js is loaded,
      its map styling will still apply.
    */

    await vegaEmbed(

      element,

      spec,

      {
        actions: false,
        renderer: "svg"
      }

    );


    /*
      Run only after Vega has created
      the actual chart DOM elements.
    */

    hideEmptyVegaBindings(element);


    console.log(
      "WILDLIFE V4.1: " +
      id +
      " loaded successfully."
    );


  } catch (error) {

    console.error(
      "Failed to render " + id,
      error
    );

    element.textContent =
      "Unable to load " +
      id +
      ". Check the browser console.";

  }

}


/* ==============================================
   L. PROJECT METADATA
   ============================================== */

function installMetadata() {

  if (

    document.querySelector(".fg-metadata") ||

    document.querySelector(".project-metadata") ||

    document.querySelector(".metadata-section")

  ) {
    return;
  }


  const footer = document.querySelector(
    "footer"
  );


  if (!footer) {
    return;
  }


  const metadata = document.createElement(
    "section"
  );

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
       Generative AI was used to assist with webpage layout planning, wording, and code structure.
        Final design, data preparation, chart decisions, and submission review were completed by the author.
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


/* ==============================================
   M. INITIALISE THE DASHBOARD
   ============================================== */

async function startWildlifeDashboard() {

  console.log(

    "%cWILDLIFE VISUAL LAYOUT V4.1 ACTIVE",

    "color:#477562;" +
    "font-weight:bold;" +
    "font-size:16px"

  );


  document.documentElement.classList.add(
    "wildlife-visual-v4"
  );


  installVisualStyles();


  /*
    Build every chart card exactly once.
  */

  chartRegistry.forEach((item, index) => {

    const [
      id,
      filename,
      title,
      kind
    ] = item;


    prepareChart(
      id,
      title,
      kind,
      index + 1
    );

  });


  installMetadata();


  /*
    Load all 13 figures.
  */

  const results = await Promise.allSettled(

    chartRegistry.map(item => {

      const [
        id,
        filename,
        title,
        kind
      ] = item;

      return renderChart(
        id,
        filename,
        kind
      );

    })

  );


  /*
    Report unexpected rejected operations.
  */

  results.forEach((result, index) => {

    if (result.status === "rejected") {

      console.error(
        "Chart operation failed:",
        chartRegistry[index][0],
        result.reason
      );

    }

  });


  console.log(
    "WILDLIFE V4.1: " +
    "All chart loading operations completed."
  );

}


/* ==============================================
   N. START AFTER HTML LOADS
   ============================================== */

if (document.readyState === "loading") {

  document.addEventListener(

    "DOMContentLoaded",

    startWildlifeDashboard,

    {
      once: true
    }

  );

} else {

  startWildlifeDashboard();

}
