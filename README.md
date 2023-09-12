# belly-button-challenge
Bootcamp of EdX and Tecnológico de Monterrey in Ciencia de Datos. Challenge 14

You can visit the site on: https://yaelantoniocm.github.io/belly-button-challenge/

Complete the following steps:

1. Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

  - Use sample_values as the values for the bar chart.
  
  - Use otu_ids as the labels for the bar chart.

  - Use otu_labels as the hovertext for the chart.

<img width="780" alt="image" src="https://github.com/yaelantoniocm/belly-button-challenge/blob/main/images/hw01.jpg?raw=true">

3. Create a bubble chart that displays each sample.

  - Use otu_ids for the x values.

  - Use sample_values for the y values.

  - Use sample_values for the marker size.

  - Use otu_ids for the marker colors.

  - Use otu_labels for the text values.
<img width="780" alt="image" src="https://github.com/yaelantoniocm/belly-button-challenge/blob/main/images/gauge.jpg?raw=true">

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.
 <img width="780" alt="image" src="https://github.com/yaelantoniocm/belly-button-challenge/blob/main/images/hw03.jpg?raw=true">

 6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:

 <img width="780" alt="image" src="https://github.com/yaelantoniocm/belly-button-challenge/blob/main/images/hw02.jpg?raw=true">

# Advanced Challenge Assignment (Optional with no extra points earning)
The following task is advanced and therefore optional.

Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/Links to an external site. to plot the weekly washing frequency of the individual.

You will need to modify the example gauge code to account for values ranging from 0 through 9.

Update the chart whenever a new sample is selected.

 <img width="780" alt="image" src="https://github.com/yaelantoniocm/belly-button-challenge/blob/main/images/gauge.jpg?raw=true">
