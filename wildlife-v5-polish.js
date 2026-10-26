
"use strict";

/*
  Australia's Vanishing Wildlife
  Green map polish for Charts 4–7
  Width adjustment for Chart 9

  Load after Vega-Embed, before script.js.

  Does not modify original source data
  or map projections.
*/

(function () {
  if (window.WILDLIFE_GREEN_V5_INSTALLED) return;

  if (typeof window.vegaEmbed !== "function") {
    console.error(
      "Vega-Embed must load before wildlife-v5-polish.js"
    );
    return;
  }

  window.WILDLIFE_GREEN_V5_INSTALLED = true;

  const embedOriginal = window.vegaEmbed;

  const headings = {
    chart4: [
      "THREATENED WILDLIFE",
      "Listed taxa relative to land area"
    ],
    chart5: [
      "WILDLIFE OBSERVATIONS",
      "Recorded threatened-bird sightings"
    ],
    chart6: [
      "PROTECTED LAND / CAPAD 2024",
      "Circle size = area protected | Colour = share protected"
    ],
    chart7: [
      "BLACK SUMMER / 2019–20",
      "Selected mapped bushfire footprints"
    ]
  };

  function ensureMark(layer) {
    if (!layer || !layer.mark) return null;

    if (typeof layer.mark === "string") {
      layer.mark = { type: layer.mark };
    }

    return layer.mark;
  }

  function headingLayer(text, y, size, weight, color) {
    return {
      data: {
        values: [{}]
      },

      mark: {
        type: "text",
        align: "left",
        baseline: "middle",
        font: "Source Sans 3",
        fontSize: size,
        fontWeight: weight,
        color: color
      },

      encoding: {
        x: { value: 24 },
        y: { value: y },
        text: { value: text }
      }
    };
  }

  function styleMap(spec, id) {
    if (!Array.isArray(spec.layer)) return;

    spec.background = "#EDF5EF";

    const layers = spec.layer;

    // Restore the sage/forest basemap styling.

    layers.forEach(function (layer) {
      const mark = ensureMark(layer);

      if (
        mark &&
        mark.type === "geoshape" &&
        !(layer.encoding && layer.encoding.color)
      ) {
        mark.fill = "#F7FAF6";
        mark.stroke = "#9AB5A3";
        mark.strokeWidth = 1.05;
      }
    });

    const coloured = layers.find(function (layer) {
      return (
        layer.encoding &&
        layer.encoding.color &&
        layer.encoding.color.scale
      );
    });

    const mark = ensureMark(coloured);

    const color =
      coloured && coloured.encoding.color;

    // CHART 4: GREEN CHOROPLETH

    if (id === "chart4" && color) {
      color.scale.range = [
        "#DAEADD",
        "#235942"
      ];

      if (mark) {
        mark.stroke = "#FFFFFF";
        mark.strokeWidth = 1.5;
      }
    }

    // CHART 5: GREEN BIRD OBSERVATION HEXAGONS

    if (id === "chart5" && color) {
      color.scale.range = [
        "#D5E8D8",
        "#246F4A"
      ];

      if (mark) {
        mark.stroke = "#F8FBF7";
        mark.strokeWidth = 0.65;
        mark.opacity = 0.96;
      }
    }

    // CHART 6: GREEN PROTECTED-AREA CIRCLES

    if (id === "chart6" && color) {
      color.scale.range = [
        "#B6D8C1",
        "#24684C"
      ];

      const size = coloured.encoding.size;

      if (size && size.scale) {
        size.scale.range = [120, 6500];
      }

      if (size && size.legend) {
        size.legend.symbolFillColor = "#75AB8E";
        size.legend.symbolStrokeColor = "#FFFFFF";
      }

      if (mark) {
        mark.opacity = 0.94;
        mark.stroke = "#FFFFFF";
        mark.strokeWidth = 2.5;
      }
    }

    // CHART 7: ORANGE FIRE ON A GREEN MAP

    if (id === "chart7" && color) {
      color.scale.range = [
        "#BB5E46",
        "#DF986D"
      ];

      if (mark) {
        mark.opacity = 0.92;
        mark.stroke = "#FFFFFF";
        mark.strokeWidth = 0.25;
      }
    }

    // GREEN LEGEND TYPOGRAPHY

    spec.config = spec.config || {};

    spec.config.legend = {
      ...(spec.config.legend || {}),
      labelFont: "Source Sans 3",
      titleFont: "Source Sans 3",
      labelColor: "#577461",
      titleColor: "#244D3B",
      labelFontSize: 12,
      titleFontSize: 14
    };

    if (color && color.legend && id !== "chart7") {
      color.legend.gradientLength =
        id === "chart6" ? 310 : 350;

      color.legend.gradientThickness = 16;
    }

    // Keep the editorial heading inside the map.

    const [title, subtitle] = headings[id];

    layers.push(
      headingLayer(
        title,
        31,
        17,
        "bold",
        "#234B3E"
      )
    );

    layers.push(
      headingLayer(
        subtitle,
        56,
        12,
        "normal",
        "#6B806F"
      )
    );
  }

  // CHART 9: USE AVAILABLE CARD WIDTH

  function fitChart9(spec, element) {
    if (!Array.isArray(spec.vconcat)) return;

    const parent =
      element && element.parentElement;

    const containerWidth = parent
      ? parent.getBoundingClientRect().width
      : 1080;

    if (
      !Number.isFinite(containerWidth) ||
      containerWidth < 500
    ) {
      return;
    }

    // Reserve room for left-side threat labels.
    // Fill the remaining chart card width.

    const plotWidth = Math.max(
      590,
      Math.floor(containerWidth - 175)
    );

    spec.vconcat.forEach(function (view) {
      view.width = plotWidth;
    });

    spec.spacing = 12;
    spec.background = "#FFFFFF";
  }

  /*
    Apply actual Vega-Lite changes before rendering.

    Supports both loaded JSON specifications
    and URLs used by a simpler chart loader.
  */

  window.vegaEmbed = async function (
    target,
    specOrUrl,
    options
  ) {
    const element =
      typeof target === "string"
        ? document.querySelector(target)
        : target;

    const id = element ? element.id : "";

    const needsChange =
      Object.prototype.hasOwnProperty.call(
        headings,
        id
      ) || id === "chart9";

    if (!needsChange) {
      return embedOriginal.call(
        this,
        target,
        specOrUrl,
        options
      );
    }

    let spec = specOrUrl;

    if (typeof specOrUrl === "string") {
      const response = await fetch(specOrUrl);

      if (!response.ok) {
        throw new Error(
          "Unable to load " + specOrUrl
        );
      }

      spec = await response.json();
    } else {
      spec = JSON.parse(
        JSON.stringify(specOrUrl)
      );
    }

    if (headings[id]) {
      styleMap(spec, id);
    }

    if (id === "chart9") {
      fitChart9(spec, element);
    }

    return embedOriginal.call(
      this,
      target,
      spec,
      options
    );
  };

  /*
    Card backgrounds and finishing touches.

    No global resizing of Maps 4–7.
    No changes to the other charts.
  */

  const style = document.createElement("style");

  style.id = "wildlife-v5-forest-maps";

  style.textContent = `

    .fg-card .fg-title {
      color: #244A38 !important;
    }

    .fg-card[data-kind="map"] {
      border-color: #D0E1D4 !important;
    }

    .fg-card[data-kind="map"] .fg-content,
    .fg-card:has(#chart4) .fg-content,
    .fg-card:has(#chart5) .fg-content,
    .fg-card:has(#chart6) .fg-content,
    .fg-card:has(#chart7) .fg-content {
      background: #EDF5EF !important;
    }

    .fg-card[data-chart="chart8"] .fg-content,
    .fg-card[data-chart="chart9"] .fg-content {
      background: #FFFFFF !important;
    }

    #chart6 svg {
      filter: none !important;
    }

    .fg-card[data-chart="chart9"] .vega-embed {
      display: block !important;
      width: 100% !important;
      margin: 0 auto !important;
    }

    .fg-card[data-chart="chart9"] .vega-embed > svg {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
    }

    .fg-card::before {
      background: linear-gradient(
        90deg,
        #B45F45 0%,
        #5A876D 48%,
        #D4BA7C 100%
      ) !important;
    }

  `;

  document.head.appendChild(style);

  console.log(
    "V5 forest-green maps and Chart 9 fitting active"
  );
})();
