//starting codes comes from insrtuctor Dom 
console.log("app.js loaded");

function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        console.log(data);

        