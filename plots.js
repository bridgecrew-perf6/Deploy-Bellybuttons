// Function to initialize dashboard
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample); 
      });

      // Use the first sample from the list to build the initial plots (participant id 940)
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    })
  }

  // Initialize the dashboard
    init();

    function optionChanged(newSample) {
        // Fetch new data each time a new sample is selected
        buildMetadata(newSample);
        buildCharts(newSample);
      } 

    // Build the demographics panel 
    function buildMetadata(sample) {
        d3.json("samples.json").then((data) => {
          var metadata = data.metadata;
          // Filter the data for the object with the desired sample number
          var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
          var result = resultArray[0];
           // Use d3 to select the panel with id of `#sample-metadata`
          var PANEL = d3.select("#sample-metadata");
          // Use `.html("") to clear any existing metadata
          PANEL.html("");
          // Use `Object.entries` to add each key and value pair to the panel
          // Hint: Inside the loop, you will need to use d3 to append new
          // tags for each key-value in the metadata.
          Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
          });
        });
      }

      
    // 1. Create the buildCharts function.
    function buildCharts(sample) {
      // 2. Use d3.json to load and retrieve the samples.json file 
      d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var samples = data.samples;
        // 4. Create a variable that filters the samples for the object with the desired sample number.
        var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
        // 5. Create a variable that holds the first sample in the array.
        var individualSample = sampleArray[0];
        console.log(individualSample)
        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var individualOtuIds = individualSample.otu_ids;
        var individualOtuLabels = individualSample.otu_labels
        var individualSampleValues = individualSample.sample_values
        console.log(individualSampleValues)

        // Bar Chart
        // 7. Create the yticks for the bar chart.
        // Hint: Get the the top 10 otu_ids and map them in descending order  
        //  so the otu_ids with the most bacteria are last. 
        var yticks =individualOtuIds.slice(0,10).map(id=> "OTU "+id).reverse()

        // 8. Create the trace for the bar chart. 
        var barData = { 
        x:individualSampleValues.slice(0,10).reverse(),
        y:yticks,
        type:"bar",
        text: individualOtuLabels.slice(0,10).reverse(),
        orientation:"h"      
        };

        // 9. Create the layout for the bar chart. 
        var barLayout = {
        title:"Top 10 Bacteria Cultures Found",
        font: {
          family: 'font-family: Arial, Helvetica Neue, Helvetica, sans-serif',
          size: 14,
          color: '#191970'
          }  
        };
        // 10. Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar",[barData],barLayout)

        //console.log(individualSampleValues) //checking values while writing code
        //console.log(individualOtuLabels)  //checking values while writing code

        //Bubble Chart
        // 1. Create the trace for the bubble chart.
        var bubbleData = {
            x:individualOtuIds,
            y:individualSampleValues,
            mode:'markers',
            marker: {
              color: individualOtuIds,
              size:individualSampleValues,
              colorscale: "Picnic"              
              },
            text: individualOtuLabels 
            };

        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
            title:"Bacteria Culture Per Sample",
            hovermode:"closest",
            xaxis: {title:"OTU ID", hoverformat:'.0f'},
            yaxis: {hoverformat:'0.f'},
            font: {
              family: 'font-family: Arial, Helvetica Neue, Helvetica, sans-serif',
              size: 14,
              color: '#191970'
              }
            };

        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bubble",[bubbleData],bubbleLayout);

        //Gauge Chart
        // Create a variable that holds the samples array. 
        // Create a variable that filters the samples for the object with the desired sample number.
        //this is already done above, it is sampleArray

        // 1. Create a variable that filters the metadata array for the object with the desired sample number.
        var metadata = data.metadata;
    
        // Create a variable that holds the first sample in the array.
        var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);

        // 2. Create a variable that holds the first sample in the metadata array.
    
        var individualMetadata = metadataArray[0];
        console.log(individualMetadata)

        // Create variables that hold the otu_ids, otu_labels, and sample_values.
        // done above, individualOtuIds, individualOtuLabels, individualSampleValues

        // 3. Create a variable that holds the washing frequency.
        var wfreq = parseFloat(individualMetadata.wfreq)
        console.log(wfreq)
        console.log(d3.selectAll("div"))
        // 4. Create the trace for the gauge chart.
        var gaugeData = [{
            domain: { x: [0, 1], y: [0, 1] },
		        value: wfreq,
		        title: { text: "Belly Button Washing Frequency<br><sup>Scrubs per Week</sup>",
                      font: {size:20},
                  },
		        type: "indicator",
		        mode: "gauge+number",
            gauge: {
              axis: {range: [null, 10], tickwidth: 1, tickcolor:'black' },
              bar: {color:"black"},
              bgcolor:"white",
              borderwidth:2,
              bordercolor: "black",
              steps:[
                {range: [0,2],color:"cyan"},
                {range: [2,4],color:"deepskyblue"},
                {range: [4,6],color:"royalblue"},
                {range: [6,8],color:"mediumblue"},
                {range: [8,10],color:"midnightblue"},
                ]
              }
            }];
    
        // 5. Create the layout for the gauge chart.
        var gaugeLayout = { 
            width: 485, 
            height: 400, 
            margin: { t: 0, b: 0 },
            font: {
              family: 'font-family: Arial, Helvetica Neue, Helvetica, sans-serif',
              size: 14,
              color: '#191970'
              }
          };

        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot("gauge",gaugeData,gaugeLayout);

      });
    }
