// Function that builds the gauge chart
function buildGaugeChart(sample) {
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == sample);
        let valueData = value[0];
        let washFrequency = Object.values(valueData)[6];

        // Crea un valor entre 0 y 180 para representar el ángulo de la aguja
        let level = washFrequency * 18;

        // Trigonometría para calcular las coordenadas de la aguja
        let degrees = 180 - level;
        let radians = (degrees * Math.PI) / 180;
        let radius = 0.5;

        let x = radius * Math.cos(radians);
        let y = radius * Math.sin(radians);

        // Crea el path de la aguja
        let mainPath = 'M -.0 -0.035 L .0 0.035 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';

        let path = mainPath.concat(pathX, space, pathY, pathEnd);

        // Define el trace de la aguja
        let gaugeData = [
            {
                type: 'scatter',
                x: [0],
                y: [0],
                marker: { size: 20, color: 'red' },
                showlegend: false,
                name: 'Wash Frequency',
                text: washFrequency,
                hoverinfo: 'text+name'
            },
            {
                values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
                rotation: 90,
                text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: [
                        'rgba(132, 181, 137, 1)',   // 8-9
                        'rgba(137, 188, 141, 1)',  // 7-8
                        'rgba(138, 188, 141, 1)',  // 6-7
                        'rgba(183, 205, 143, 1)', // 5-6
                        'rgba(213, 2229, 153, 1)', // 4-5
                        'rgba(229, 232, 201, 1)',  // 3-4
                        'rgba(233, 230, 201, 1)',  // 2-3
                        'rgba(236, 235, 220, 1)',  // 1-2
                        'rgba(248, 243, 236, 1)', // 0-1
                        'rgba(255, 255, 255, 0)'  // 0-0
                    ],
                },
                labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
                hoverinfo: 'label',
                hole: 0.5,
                type: 'pie',
                showlegend: false,
            }
        ];

        let layout = {
            shapes: [
                {
                    type: 'path',
                    path: path,
                    fillcolor: 'red',
                    line: { color: 'red' }
                }
            ],
            title: {
                text: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
                font: { size: 16, color: 'white' }
            },
            height: 400,
            width: 400,
            xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
            yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
            paper_bgcolor: 'black', // black background
            plot_bgcolor: 'black', // plot background
        };

        // Crea la gráfica del medidor
        Plotly.newPlot('gauge', gaugeData, layout);
    });
}

