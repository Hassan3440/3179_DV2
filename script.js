
/*
    Australia's Vanishing Wildlife
    FIT3179 Data Visualisation 2

    Loads the Vega-Lite visualisations.
*/

function loadChart(chartId, fileName) {

    vegaEmbed("#" + chartId, "specs/" + fileName, {
        actions: false,
        renderer: "svg"
    })

    .then(function () {
        console.log(chartId + " loaded successfully");
    })

    .catch(function (error) {
        console.error("Error loading " + chartId, error);

        var container = document.getElementById(chartId);

        if (container) {
            container.textContent =
                "Unable to load " + chartId + ". Check the browser console.";
        }
    });

}


// Wait for the webpage to finish loading.
document.addEventListener("DOMContentLoaded", function () {

    loadChart("chart1", "chart01_mosaic.json");
    loadChart("chart2", "chart02_population.json");
    loadChart("chart3", "chart03_isotype.json");
    loadChart("chart4", "chart04_choropleth.json");
    loadChart("chart5", "chart05_hexbin.json");
    loadChart("chart6", "chart06_protected_areas.json");
    loadChart("chart7", "chart07_fire_extent.json");
    loadChart("chart8", "chart08_threat_heatmap.json");
    loadChart("chart9", "chart09_threat_intersections.json");
    loadChart("chart10", "chart10_threat_waffle.json");

});
