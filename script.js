
// Function to load a Vega-Lite chart

function loadChart(chartId, fileName) {

    vegaEmbed("#" + chartId, "specs/" + fileName, {
        actions: false
    })
    .then(function() {
        console.log(chartId + " loaded successfully");
    })
    .catch(function(error) {
        console.error("Error loading " + chartId, error);

        document.getElementById(chartId).textContent =
            "Unable to load " + chartId + ". Check the console.";
    });

}

// Load all five charts
loadChart("chart1", "chart01_mosaic.json");
loadChart("chart2", "chart02_population.json");
loadChart("chart3", "chart03_isotype.json");
loadChart("chart4", "chart04_choropleth.json");
loadChart("chart5", "chart05_hexbin.json");
loadChart("chart6", "chart06_protected_areas.json");
loadChart("chart7", "chart07_fire_extent.json");
loadChart("chart8", "chart08_threat_heatmap.json");
