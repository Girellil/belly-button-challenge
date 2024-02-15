let dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


//d3.json(dataURL).then(response => console.log(response))
let data = [];

// create getJson function to retrieve response
function getJson(url){
  return d3.json(url);
}

//Initial function to add Data names to dropdown Menu
function init(data){
  //get the list of names from the data
  let names = data.names;
  //select the menu to add the names from the data imported
  let subjectDropDown = d3.select("#selDataset");
  
  //loop through Names adding all to the list in the dropdown menu
  for(let i = 0; i < names.length; i++){
    subjectDropDown.append("option").text(names[i]);
  }

  // Call option changed function to start dashboard with fisrt item on the names
  optionChanged(names[0]);

}

// get selection cahnge from HTML
function optionChanged(selectedID){
  //call getJson Function and then statement with function to update the 3 graphs
  getJson(dataURL).then(function(data){
    //get samples and and metadata lists from dataset
    let sampleList = data.samples;
    let metaData = data.metadata;

    // Loop through sample to find ID
    for(let looper1 = 0; looper1 < sampleList.length; looper1++){
      if(sampleList[looper1].id == selectedID){

        //start list of original values from sample
        let OTUList  = sampleList[looper1].otu_ids
        let OTUCounts = sampleList[looper1].sample_values
        let OTUlabels = sampleList[looper1].otu_labels

        //Sort list based on counts and follow lists of names and labels based on indexes
        let sortedOTUCounts = OTUCounts.sort((a, b) => b - a);
        let sortedOTUList = OTUList.slice().sort((a, b) => OTUList[OTUCounts.indexOf(b)] - OTUList[OTUCounts.indexOf(a)]);
        let sortedOTUlabels = OTUlabels.slice().sort((a, b) => OTUlabels[OTUCounts.indexOf(b)] - OTUlabels[OTUCounts.indexOf(a)]);

        //start buble graphics info from ORIGINAL list
        let traceBubble = [{
          x : OTUList,
          y : OTUCounts,
          text : OTUlabels,
          mode: 'markers',
          hoverinfo : "text",
            marker: {
                size: OTUCounts,
                color: OTUList,
            },
          type : "scatter",
        }];
        //Start bubble graphic layout
        let layoutBubble = {
          title : "OTU Count Scatter",
          xaxis: {title : "OTU ID"},
          yaxis: {title : "OTU Quantity"}
        };
        //Plot bubble graph into bubble id.
        Plotly.newPlot("bubble", traceBubble, layoutBubble);

        //start sliced lists for bar Graph from SORTED lists
        let topOTUList = sortedOTUList.slice(0,10);
        let topOTUCounts = sortedOTUCounts.slice(0,10);
        let topOTULabels = sortedOTUlabels.slice(0,10);

        //Add prefix to OTU id list
        yValues = topOTUList.map(num => "OTU " + num);

        //start bar graph info
        let traceBar = [{
           x : topOTUCounts.reverse(),
           y : yValues.reverse(),
           text : topOTULabels.reverse(),
           type : "bar",
           orientation : "h",
           hoverinfo : "text"
         }];
         //start bargraph layout
         let layoutBar = {
          yaxis: {
            tickvals: yValues.reverse(), 
            ticktext: yValues.reverse()
            }
          };
          //plot bargraph into bar id.
          Plotly.newPlot("bar", traceBar, layoutBar);
          //break to stop loop since id found
          break;

      }
    }
    // start loop into MetaData list to extract id's MetaData info
    for(let looper2 = 0 ; looper2 < metaData.length; looper2++){
      if(metaData[looper2].id == selectedID){
        //initialize variables for each metaData feature along with description
        let thisID = "id: " + selectedID;
        let ethnicity = "ethnicity:" + metaData[looper2].ethnicity;
        let gender = "gender: " + metaData[looper2].gender;
        let age = "age: " + metaData[looper2].age;
        let location = "location: " + metaData[looper2].location;
        let bbtype = "bbtype: " + metaData[looper2].bbtype;
        let wfreq = "wfreq: " + metaData[looper2].wfreq;
        
        //Add MetaData to List
        let metaDataInfo = [thisID, ethnicity, gender, age, location, bbtype, wfreq]

        //Select the metaData Box
        let metaDataPanel = d3.select("#sample-metadata")

        //Clear MetaData box from previous values
        metaDataPanel.selectAll("*").remove();

        //Loop through list to add each element into a new line in the box
        for(let k = 0; k < metaDataInfo.length; k++){
          metaDataPanel.append("p").text(metaDataInfo[k])
        }
        
        //break to stop loop since id found
        break;
        
      }
    }    
    
  });
}

//Initialize Json and starter Function
getJson(dataURL).then(init);
