    function showTime(intVal){
      console.log("in showTime");
      var hour = Math.floor(intVal/12);
      var minutes = (intVal % 12)*5 + 5;
      if(minutes >= 60){
        minutes = 0;
        hour = hour + 1;
      }
      var displayVal = ('0' + hour).slice(-2) +":"+('0'+minutes).slice(-2);
      document.getElementById("displayTime").innerHTML=displayVal;
    }
  function getLocationData(){
    d3.select("#loading")
      .text("Data is loading....");

    var q = d3.queue();
    var cors_api = 'https://cors-anywhere.herokuapp.com/'
    var noise_api = 'http://dublincitynoise.sonitussystems.com/applications/api/dublinnoisedata.php?location='
    for( i = 1; i<=14; i++){
      q.defer(d3.json, cors_api+noise_api+i); 
     }
     q.awaitAll(function(error, results){
       if(error) console.warn(error);
        console.log(results);
       for( i=1; i<=14; i++){
         locationData[i] = results[i-1];
       }
       d3.select("text")
       .text("");

       drawData();
     }
     );
   } 
  var width = 500;
  var height = 500;
  

  //var b = path.bounds(),
  //    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
  //        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
         
  var coords;
  d3.json("coords.json", function(error, json) {
    if (error) return console.warn(error);
    coords = json;
    console.log(d3.entries(coords));
  });
  function drawMap(){

  var path = d3.geoPath()
  .projection(chosenProjection);

  var bounds = path.bounds(1);
  console.log(bounds);
  d3.json("dublin.geojson", function(error, geoData) {
    if( error ) return console.error(error);
   
    d3.select("svg").append("path")
      .attr("d", path(geoData))
    });
  }

  function drawData(){
    d3.select("#time")
    .attr('max', d3.entries(locationData[1])[2].value.length-1);

    d3.select("svg").selectAll("circle")
      .data(d3.entries(coords))
      .enter()
      .append("circle")
     // .attr("cx", function(d){return path(d)[0];})
     // .attr("cy", function(d){return path(d)[1];})
      .attr("transform", function(d) {
        return "translate(" + chosenProjection([
        d.value[1],
        d.value[0]
        ]) + ")";})                             
      .attr("r", function(d, i) { 
        //console.log(i);
        //console.log(d);
        //console.log(d3.entries(locationData[i+1]));
        return d3.entries(locationData[i+1])[2].value[0]/5 +"px";})
      .attr("fill",function(d, i) { 
        return d3.interpolateReds(d3.entries(locationData[i+1])[2].value[0]/80) ;})
      .on("mouseover", stationMouseover)
      .on("mouseout", stationMouseout)
      //.text(function(d){return d.key;})
    }
  

  function stationMouseover(d, i) {
    d3.select("svg")
      .append("text")
      .attr("id", function() { return "t"+i;})
      .attr(
        "transform", function(){return "translate("+chosenProjection([d.value[1],d.value[0]])+")";})
      .text(function(){
        return d.key;
      });
    }
    function stationMouseout(d, i) {
     d3.select("#t"+i)
     .remove();
   }     

   function updateTime(timeIndex){
      showTime(timeIndex);
      console.log("in updateTime");
      d3.select("svg")
      .selectAll("circle") 
      .attr("r", function(d, i) { 
        return d3.entries(locationData[i+1])[2].value[timeIndex]/5 +"px";})
      .attr("fill",function(d, i) { 
        return d3.interpolateReds(d3.entries(locationData[i+1])[2].value[timeIndex]/80) ;})
   }

   var chosenProjection = d3.geoMercator()
      .scale(35000)
    .translate([250, 250])
    .center([-6.265064,53.390370]);
  var locationData = new Array(14);
  drawMap();
  getLocationData(); 
  d3.select("#time").on("input", function() {
      console.log("slider input");
      updateTime(+this.value);
  });
console.log("TEST");
    
