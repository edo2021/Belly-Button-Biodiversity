//starting codes comes from insrtuctor Dom 
console.log("app.js loaded");
//function to draw graph
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 bacteria culutres found",
            margin: {t:30, l:150}

        };

        Plotly.newPlot("bar", barArray, barLayout);

    });
}


function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker : {
                size: sample_values,
                color: otu_ids
            }
        };

        var bubbleArray = [bubbleData];


        var bubbleLayout = {
            title: "Sample Values vs OTU Ids",
            xaxis: { title: "OTU ID"},
            yaxis: { title: "Sample Value"}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });
}


function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var metadata = data.metadata;
        var metaArray = metadata.filter (m => m.id == sampleId);
        var meta = metaArray[0];

        var meta_id = meta.id;
        var meta_ethnicity = meta.ethnicity;
        var meta_gender = meta.gender;
        var meta_age = meta.age;
        var meta_location = meta.location;
        var meta_bbtype = meta.bbtype;
        var meta_wfreq = meta.wfreq;

        var select = d3.select("#sample-metadata")

        select.html("");

        select.append('ul').text(`id: ${meta_id}`);
        select.append('ul').text(`ethnicity: ${meta_ethnicity}`);
        select.append('ul').text(`gender: ${meta_gender}`);
        select.append('ul').text(`age: ${meta_age}`);
        select.append('ul').text(`location: ${meta_location}`);
        select.append('ul').text(`bbtype: ${meta_bbtype}`);
        select.append('ul').text(`wfreq: ${meta_wfreq}`);
    });
};

function washData(sampleId) {
    console.log(`washData(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var metadata = data.metadata;
        var metaArray = metadata.filter (m => m.id == sampleId);
        var meta = metaArray[0];

        var meta_wfreq = meta.wfreq;

        console.log(`yo${meta_wfreq}`);

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: meta_wfreq,
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var layout = { 
            width: 600, 
            height: 500, 
            margin: { t: 0, b: 150, l:0 } };
        Plotly.newPlot('gauge', data, layout);

    });
};
