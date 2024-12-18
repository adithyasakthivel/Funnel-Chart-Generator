Funnel Chart Generator
This project is a simple web application for generating and visualizing funnel charts based on user input data. The application is implemented using HTML, CSS, and JavaScript, leveraging the D3.js library for chart rendering. Additionally, it supports downloading the chart as either an SVG or JPG file.

Features
Dynamic Funnel Chart Creation:
Enter JSON-formatted data to generate a funnel chart.
Download Options:
Save the funnel chart as an SVG or JPG.
Responsive and User-Friendly:
The interface is designed for ease of use and input validation.
Sample Data:
Preloaded sample JSON data to demonstrate functionality.
Usage
Clone this repository to your local system:
bash
Copy code
git clone https://github.com/adithyasakthivel/funnel-chart-generator.git
Open the index.html file in any modern browser.
File Structure
index.html: Main HTML file containing the structure and layout of the application.
funnelChart.js: JavaScript file for rendering the funnel chart and handling user input.
README.txt: Documentation for the project (this file).
Sample JSON Data
Use the following example in the input box to visualize a funnel chart:

json
Copy code
[
    {"stage": "Leads", "value": 1000},
    {"stage": "Opportunity", "value": 800},
    {"stage": "Proposal", "value": 600},
    {"stage": "Negotiation", "value": 400},
    {"stage": "Closed", "value": 200}
]
