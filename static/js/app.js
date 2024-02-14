let dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


//d3.json(dataURL).then(response => console.log(response))
let data = [];

// create getJson function to retrieve response
function getJson(url){
  return d3.json(url);
}

//Initial function to add Data names to dropdown Menu
function init(data){
  let names = data.names;

  let subjectDropDown = d3.select("#selDataset");
  
  for(let i = 0; i < names.length; i++){
    subjectDropDown.append("option").text(names[i]);
  }
}

//Initialize Json and starter Function
getJson(dataURL).then(init);

// get selection cahnge from HTML
function optionChanged(selectedID){
  getJson(dataURL).then(function(data){
    let sampleList = data.samples;
    let metaData = data.metadata;

    for(let i = 0; i < sampleList.length; i++){
      if(sampleList[i].id == selectedID){
        let subjectOTUList = sampleList[i].otu_ids.slice(0,10);
        let subjectOTUCount = sampleList[i].sample_values.slice(0,10);
        let subjectOTULabels = sampleList[i].otu_labels.slice(0,10);

        yValues = subjectOTUList.map(num => "OTU " + num);

        let trace1 = [{
           x : subjectOTUCount.reverse(),
           y : yValues.reverse(),
           text : subjectOTULabels.reverse(),
           type : "bar",
           orientation : "h",
           hoverinfo : "text"
         }];
         
         let layout = {
          yaxis: {
            tickvals: yValues.reverse(), 
            ticktext: yValues.reverse()
            }
          };

          Plotly.newPlot("plot1", trace1, layout);

      }
    }

    for(let j = 0 ; j < metaData.length; j++){
      if(metaData[j].id == selectedID){
        let ethnicity = metaData[j].ethnicity;
        let gender = metaData[j].gender;
        let age = metaData[j].age;
        let location = metaData[j].location;
        let bbtype = metaData[j].bbtype;
        let wfreq = metaData[j].wfreq;
        let chosenMetaData = [ethnicity, gender, age, location, bbtype, wfreq]
        console.log(chosenMetaData)
      }
    }
    
  });
}
