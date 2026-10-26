
/*
 * Australia's Vanishing Wildlife
 * FIT3179 Data Visualisation 2
 * Vega-Lite chart loader
 */

document.addEventListener("DOMContentLoaded", function () {

    function loadChart(chartId, fileName) {

        const container = document.getElementById(chartId);

        if (!container) {
            console.error(
                "Missing HTML container: #" + chartId
            );
            return;
        }

        const specPath = "specs/" + fileName;

        vegaEmbed("#" + chartId, specPath, {
            actions: false,
            renderer: "svg"
        })
        .then(function () {
            console.log(
                chartId + " loaded successfully"
            );
        })
        .catch(function (error) {
            console.error(
                "Error loading " + chartId,
                error
            );

            container.textContent =
                "Unable to load " +
                chartId +
                ". Check the browser console.";
        });
    }

    // Chapter 1: The crisis
    loadChart("chart1", "chart01_mosaic.json");
    loadChart("chart2", "chart02_population.json");
    loadChart("chart3", "chart03_isotype.json");

    // Chapter 2: The geography
    loadChart("chart4", "chart04_choropleth.json");
    loadChart("chart5", "chart05_hexbin.json");
    loadChart("chart6", "chart06_protected_areas.json");
    loadChart("chart7", "chart07_fire_extent.json");

    // Chapter 3: The threats
    loadChart("chart8", "chart08_threat_heatmap.json");
    loadChart("chart9", "chart09_threat_intersections.json");
    loadChart("chart10", "chart10_threat_waffle.json");

    // Chapter 4: The future
    loadChart("chart11", "chart11_fauna_small_multiples.json");
    loadChart("chart12", "chart12_protected_history.json");
    loadChart("chart13", "chart13_target_progress.json");

});
