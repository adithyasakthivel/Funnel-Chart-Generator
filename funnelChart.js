// Initialize funnel data
let funnelData = [];

// Function to update funnel data based on JSON input
function updateFunnelData() {
    const jsonInput = document.getElementById("jsonInput").value;

    try {
        // Parse JSON input
        funnelData = JSON.parse(jsonInput);

        // Check if data is valid (non-empty array with valid stage objects)
        if (!Array.isArray(funnelData) || funnelData.length === 0 || !funnelData.every(item => item.stage && item.value)) {
            alert("Invalid data format. Please enter a valid JSON array of stages with name and value.");
            return;
        }

        // Redraw the chart with the updated data
        drawFunnelChart();
    } catch (e) {
        alert("Invalid JSON input. Please enter valid JSON format.");
    }
}

// Function to draw the funnel chart based on the input data
function drawFunnelChart() {
    // If there are no stages, show an alert and don't update the chart
    if (funnelData.length === 0) {
        alert("Please add at least one valid stage.");
        return;  // Prevent chart update if no valid data
    }

    // Clear previous chart if any
    d3.select("#funnelChart").html("");

    // Set up SVG canvas dimensions
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 30, right: 20, bottom: 30, left: 20 };
    const chartHeight = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#funnelChart")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Calculate the scale for the funnel width
    const maxValue = d3.max(funnelData, d => d.value);
    const scale = d3.scaleLinear()
                    .domain([0, maxValue])
                    .range([150, 450]); // The width will vary from 150px to 450px

    // Color options for each funnel stage (can be customized)
    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    // Calculate the step height based on the total height and number of stages
    const stepHeight = chartHeight / funnelData.length; // Evenly distribute the height

    // Create the funnel stages
    funnelData.forEach((d, i) => {
        const y = i * stepHeight; // Corrected vertical positioning
        const width = scale(d.value);

        svg.append("rect")
           .attr("x", (svgWidth - width) / 2) // Center the funnel
           .attr("y", y)
           .attr("width", width)
           .attr("height", stepHeight) // Ensure the stage has a sufficient height
           .attr("rx", 20) // Rounded corners
           .attr("ry", 20)
           .attr("fill", colors[i % colors.length]); // Apply color from the color array

        svg.append("text")
           .attr("x", svgWidth / 2) // Center-align horizontally
           .attr("y", y + stepHeight / 2) // Center vertically
           .attr("dy", ".35em") // Adjust vertical positioning for perfect centering
           .style("text-anchor", "middle") // Horizontally center the text
           .text(`${d.stage}: ${d.value}`)
           .attr("fill", "white");
    });
}

// Function to download the chart as an SVG
function downloadChartAsSVG() {
    const svgElement = document.querySelector("#funnelChart svg");

    if (!svgElement) {
        alert("No chart to download. Please generate a chart first.");
        return;
    }

    // Serialize the SVG to a string
    const svgData = new XMLSerializer().serializeToString(svgElement);

    // Create a Blob object with the SVG data
    const blob = new Blob([svgData], { type: "image/svg+xml" });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "funnel-chart.svg"; // Set the default file name
    link.click(); // Trigger the download
}

// Initialize with a default example in the JSON textarea
updateFunnelData();
