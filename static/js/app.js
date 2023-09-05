// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard at start up 
function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json(url).then((data) => {
        // data.names is an array of strings
        let sampleNames = data.names; 
        // sampleNames.forEach is a for loop that iterates through each element in the array
        sampleNames.forEach((sample) => {
            console.log(sample);

            selector.append("option").text(sample).property("value", sample);
        });
        // Set the first sample from the list
        let first_sample = sampleNames[0];

        // Log the value of first_sample
        console.log(first_sample);

        // Build the initial plots
        buildMetadata(first_sample);
        buildBarChart(first_sample);
        buildBubbleChart(first_sample);
        buildGaugeChart(first_sample);
    });
}

// Function that builds the bar chart
function buildBarChart(sample) {
    d3.json(url).then((data) => {
        // samples is an array of objects
        let samples = data.samples; 
        // resultArray is an array of objects
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        // result is an object
        let result = resultArray[0];
        // otu_ids is an array of numbers
        let otu_ids = result.otu_ids;
        // otu_labels is an array of strings
        let otu_labels = result.otu_labels;
        // sample_values is an array of numbers
        let sample_values = result.sample_values;
        
        // Create the trace for the bar chart
        let barData = [{
            // slice() extracts a section of an array and returns a new array
            x: sample_values.slice(0, 10).reverse(),
            // map() creates a new array populated with the results of calling a provided function on every element in the calling array
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            // slice() extracts a section of an array and returns a new array
            text: otu_labels.slice(0, 10).reverse(),
            // type: "bar" creates a bar chart
            type: "bar",
            // orientation: "h" sets the bars horizontally
            orientation: "h",
            // Customizing the color of the bars
            marker: {
                line: {
                    color: 'white' // White lines between the bars
                }
            }, 
        }];

        // Create the layout for the bar chart
        let barLayout = {
            // title: "Top 10 Bacteria Cultures Found" sets the title of the chart
            title: "Top 10 Bacteria Cultures Found",
            // margin: { t: 80, l: 150 } sets the margins
            margin: { t: 80, l: 150 },
            
            // Customize the chart theme here
             paper_bgcolor: 'black', // Black background
             plot_bgcolor: 'black', // plot background
             font: {
                 color: 'white'
            },
            xaxis: {
                range: [0, 200] // Ajusta el rango a tu valor deseado (hasta 180)
            },        
            // Ajustar el tamaño de la gráfica
            width: 550, // Cambia el ancho aquí
            height: 450 // Cambia la altura aquí
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", barData, barLayout);
    });
}

// Function that builds the bubble chart
function buildBubbleChart(sample) { 
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        // Retrieve all samples
        let samples = data.samples;
        // Filter based on the value of the sample
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        // Get the first index from the array
        let result = resultArray[0];
        // Get the otu_ids, otu_labels, and sample_values
        let otu_ids = result.otu_ids;
        // otu_labels is an array of strings
        let otu_labels = result.otu_labels;
        // sample_values is an array of numbers
        let sample_values = result.sample_values;

        // Create the trace for the bubble chart
        let bubbleData = [{
            // x: otu_ids is an array of numbers
            x: otu_ids,
            // y: sample_values is an array of numbers
            y: sample_values,
            // text: otu_labels is an array of strings
            text: otu_labels,
            // mode: "markers" creates a bubble chart
            mode: "markers",
            // marker: {} sets the marker properties
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];

        // Create the layout for the bubble chart
        let bubbleLayout = {
            // title: "Bacteria Cultures Per Sample" sets the title of the chart
            title: "Bacteria Cultures Per Sample",
            // t: 0 removes the top margin
            margin: { t: 0 }, 
            // hovermode: "closest" shows the information of the hovered bubble
            hovermode: "closest",
            // xaxis: { title: "OTU ID" } sets the x-axis title
            xaxis: { title: "OTU ID" },
            // margin: { t: 30 } sets the top margin
            margin: { t: 30 },

            // Customize the chart theme here
            paper_bgcolor: 'black', // Black background
            plot_bgcolor: 'black', // plot background
            font: {
                color: 'white'
           }
        };

        // Plot the chart to a div tag with id "bubble"
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

// Function that populates metadata info
function buildMetadata(sample) {
    d3.json(url).then((data) => {
        // metadata is an array of objects
        let metadata = data.metadata;
        // resultArray is an array of objects
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        // result is an object
        let result = resultArray[0];
        // PANEL is a d3 object
        let PANEL = d3.select("#sample-metadata");
        // PANEL.html("") clears the existing metadata
        PANEL.html("");
        // Use Object.entries to get the key/value pairs and put into the demographics box on the page
        Object.entries(result).forEach(([key, value]) => {
            let metadataItem = PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

            metadataItem.style("background-color", "#000"); // Fondo negro
            metadataItem.style("color", "#fff"); // Letras blancas

        });
    });
}

// Function that updates dashboard when sample is changed
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildBarChart(newSample);
    buildBubbleChart(newSample);
    buildGaugeChart(newSample);

    // Log the new value
    console.log(newSample); 
}

// Initialize the dashboard
init();