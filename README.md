# Deploy-Bellybuttons

In our challenge this week we completed the Belly Button Biodiversity dashboard that we started building in the modules.  Using Plotly, Bootstrap, and D3 we constructed a dynamic dashboard that allows the user to investigate the dataset. This repo was created to deploy the dashboard through GitPages but most of the development of the code was done in the Belly Button Bacteria repo. Here are images showing how the page looks when initially loaded:

![website1](https://github.com/mgsrichard/Deploy-Bellybuttons/blob/main/images/webpage_1.png)
![website2](https://github.com/mgsrichard/Deploy-Bellybuttons/blob/main/images/webpage_2.png)

## JavaScript in charts.js
The JavaScript file, charts.js,  uses the D3 library to access our data file, samples.json, with the d3.json() function. In JavaScript we set up the following functions:
  - init() - this function brings in the data and stores it in variables we can access, and then initializes the dashboard with the data of the first participant in the samples file. The function is defined and then immediately called to initialize the page (although it doesn't really matter where the init() gets called.)
  - optionChanged(newSample) - this function calls the buildMetadata and buildCharts functions to build the demographics panel and charts when a new participant is selected in the drop down menu. The html code in the index file calls this function when a new participant is chosen in the drop down menu.
  - buildMetadata(sample) builds the demographics panel on the dashboard
  - buildCharts(sample) builds the bar chart, the bubble chart, and the gauge chart on the dashboard.
  
## HTML in index.html
The index.html contains the html code for the dashboard. It imports bootstrap, our style.css file, plotly, and the charts.js javascript file. Some features of the html code:
  - the select tag contains the drop down box, and the onchange="optionChanged(this.value)" is the bit of code that calls that function from javascript when a new option is chosen
  - I added a nav tag to create a navigation bar at the top to quickly jump to the bar chart or the bubble chart.
  - In the stlye.css I chose midnight blue font color but added it to tags in the html where it didn't come out, probably because something in bootstrap was overriding it
  
## style.css
In the style.css file I set up the colors for the page, alice blue for the background and midnight blue for the font. Also I linked a picture of bacteria to go into the jumbotron header. The picture is also blue and white, and I made the whole page be shades of blue with white for contrast. The bar chart defaulted to blue, and I changed the colors in the gauge chart to shades of blue, and I added a colorscale called "Picnic" to the bubble chart that had a good amount of blue shades plus some other cool colors that coordinated pretty well with the color scheme of the page. Also in the style.css I added a custom font family: Arial, Helvetica Neue, Helvetica, sans-serif.
  


  
