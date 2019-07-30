//BUILDING GAUGES FUNCTION
function buildMetadata(country) {

  d3.json(`/rank/${country}`).then(function (data) {

    buildGauge(data.Total, "gauge", "<b>Consumed Energy</b>"),
      buildGauge(data.GDP, "gauge_1", "<b>GDP</b>"),
      buildGauge(data.Electricity, "gauge_2", "<b>Consumed Electricity</b>"),
      buildGauge(data.CO2_emissions, "gauge_3", "<b>CO2 Emissions</b>");
  })
}

function buildGauge(level, gauge, title) {
  // Enter a speed between 0 and 180
  // var level = 175;

  // Trig to calc meter point
  // var degrees = 180 - level,
  var degrees = 180 - (level / 5) * (180 / 10),
    radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [{
    type: 'scatter',
    x: [0], y: [0],
    marker: { size: 28, color: '850000' },
    showlegend: false,
    name: 'Ranking',
    text: level,
    hoverinfo: 'text+name'
  },
  {
    // values: [10 / 9, 10 / 9, 10 / 9, 10 / 9, 10 / 9, 10 / 9, 10 / 9, 10 / 9, 10 / 9, 10],
    values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10],

    rotation: 90,
    text: ['45-50', '40-45', '35-40', '30-35', '25-30', '20-25', '15-20', '10-15', '5-10', '0-5', ''],
    textinfo: 'text',
    textposition: 'inside',
    marker: {
      colors: ['rgba(255, 127, 14, .4)', 'rgba(230, 126, 32, .4)',
        'rgba(205, 125, 50, .4)', 'rgba(180, 124, 69, .4)', 'rgba(155, 123, 87, .4)',
        'rgba(130, 122, 106, .4)', 'rgba(105, 121, 124, .4)',
        'rgba(80, 120, 143, .4)', 'rgba(55, 119, 161, .4)', 'rgba(31, 119, 180, .4)',
        'rgba(255, 255, 255, 0)']
    },
    labels: ['45-50', '40-45', '35-40', '30-35', '25-30', '20-25', '15-20', '10-15', '5-10', '5-0', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes: [{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],

    title: `${title}`,
    height: 325,
    width: 325,

    margin: {'l':0 , 'r': 10, 't': 80, 'b': 0},
    
    xaxis: {
      
      zeroline: false, showticklabels: false,
      showgrid: false, range: [-1, 1], fixedrange: true
    },
    yaxis: {
      zeroline: false, showticklabels: false,
      showgrid: false, range: [-1, 1], fixedrange: true
    }
  };

  Plotly.newPlot(gauge, data, layout, {responsive: true });
}


function buildCharts(country, graph) {

  console.log(country)
  console.log(graph)

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("/datafor").then(function (data) {

    switch (country) {
      case "Consumption":

        switch (graph){
          case "SARIMA":
            var trace1 = {
              x: data.ForDate,
              y: data.ForCon,
              name: 'Forecast',
              type: 'scatter'
            };

            var trace2 = {
              x: data.Date,
              y: data.Total,
              name: 'Real',           
              type: 'scatter'

            };

            var all_traces = [trace1, trace2];
            break;
          case "LINEAR REG":
              var trace1 = {
                x: data.ForDateReg,
                y: data.ForConReg,
                name: 'Forecast',
                type: 'scatter'
              };

              var trace2 = {
                x: data.Date,
                y: data.Total,
                name: 'Real',           
                type: 'scatter'
  
              };
  
              var all_traces = [trace1, trace2];
              break;
          case "RANDOM FOREST":
            var trace1 = {
              x: data.ForDateRF,
              y: data.ForConRF,
              name: 'Forecast',
              type: 'scatter'
            };

            var trace2 = {
              x: data.Date,
              y: data.Total,
              name: 'Real',           
              type: 'scatter'

            };

            var all_traces = [trace1, trace2];
            break;
        }

        var layout = {
          title: `US - ${graph} Natural Gas ${country} Forecast`,
          xaxis: { title: 'Year' },
          yaxis: { title: 'Consumed Natural Gas (Bscf)' }
        };

        Plotly.newPlot('temp-stacked-lineChart', all_traces, layout, { responsive: true });
        break;

      case "Price":
        switch (graph){
          case "Residential":
            var trace1 = {
              x: data.Date,
              y: data.Price_HH,
              name: 'Henry Hub',
              type: 'scatter'
            };
            var trace2 = {
              x: data.Date,
              y: data.Price_Res,
              name: 'Residential',
              type: 'scatter'
            };
            var all_traces = [trace1, trace2];
            break;

          case "Electric":
            var trace1 = {
              x: data.Date,
              y: data.Price_HH,
              name: 'Henry Hub',
              type: 'scatter'
            };
            var trace2 = {
              x: data.Date,
              y: data.Price_Elec,
              name: 'Electric',
              type: 'scatter'
            };
            var all_traces = [trace1, trace2];
            break

          case "Commercial":
            var trace1 = {
              x: data.Date,
              y: data.Price_HH,
              name: 'Henry Hub',
              type: 'scatter'
            };
            var trace2 = {
              x: data.Date,
              y: data.Price_Com,
              name: 'Commercial',
              type: 'scatter'
            };
            var all_traces = [trace1, trace2];
            break;

          case "Industrial":
            var trace1 = {
              x: data.Date,
              y: data.Price_HH,
              name: 'Henry Hub',
              type: 'scatter'
            };
            var trace2 = {
              x: data.Date,
              y: data.Price_Ind,
              name: 'Commercial',
              type: 'scatter'
            };
            var all_traces = [trace1, trace2];
            break;

          case "Total":
            var trace1 = {
              x: data.Date,
              y: data.Price_HH,
              name: 'Henry Hub',
              type: 'scatter',
              mode: 'lines',
              line:{
                color: "gray",
              }
            };
            var trace3 = {
              x: data.Date,
              y: data.Total,
              name: 'Consumption',
              yaxis: "y2",
              type: 'scatter',
              mode: 'lines',
              line:{
                dash: 'dot',
                color: "red",
              }
            };
            var trace2 = {
              x: data.Date,
              y: data.Prod,
              name: 'Production',
              yaxis: "y2",
              type: 'scatter',
              mode: 'lines',
              line:{
                dash: 'solid',
                color: "red",
              }
            };
            var all_traces = [trace1, trace2, trace3];
            break;
        }

        if (graph === "Total"){          
          var layout = {
            title: `US - Natural Gas ${country}`,            
            xaxis: { title: 'Year' },
            yaxis: { title: `Natural Gas ${country} (US$/MMBTU)`,
            range: [0, 30] },
            yaxis2: {title: `Natural Gas Volumes (Bscf)`,
            titlefont: {color: "red"},
            tickfont: {color: "red"},
            overlaying: "y",
            side: "right",
            range: [0, 3500]},
            showlegend : true,
            legend:{
              x: 0.0,
              y: 1.0
            }
          };
        }
        else {
          var layout = {
            title: `US - Natural Gas ${country}`,
            xaxis: { title: 'Year' },
            yaxis: { title: `Natural Gas ${country} (US$/MMBTU)` }
          };
        }
        

        Plotly.newPlot('temp-stacked-lineChart', all_traces, layout, { responsive: true });

        break;
      case "Production":
        
        break;
    }

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset"); 

  // Use the list of country names to populate the dropdown
  
  d3.json("/countries").then((countryNames) => {

    // countryNames.forEach((country) => {
    //   console.log(country)
    //   selector
    //     .append("option")
    //     .text(country)
    //     .property("value", country);
    // });

    var selector1 = d3.select("#selDataset1");

    graphNames = ["SARIMA","LINEAR REG","RANDOM FOREST"];    
    console.log(graphNames)
    graphNames.forEach((graph) => {
      console.log(graph)
      selector1
        .append("option")
        .text(graph)
        .property("value", graph);
    })

    // Use the first sample from the list to build the initial plots
    const firstCountry = countryNames[0];
    const firstGraph = graphNames[0];
    buildCharts(firstCountry, firstGraph);

  });
}

// function optionChanged(newCountry, newGraph) {
function optionChanged(newGraph) {
  newCountry = "Consumption"
  // Fetch new data each time a new sample is selected
  console.log(newGraph)
  buildCharts(newCountry, newGraph);
}

init();