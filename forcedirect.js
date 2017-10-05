
var url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';


//------JSON request-----------------
d3.json(url, function (error, json){
  var width = 1200;
  var height = 800;
  var nodes_data = json.nodes;
  var links_data = json.links;

  //form the SVG
var svg = d3.select("#graph")
         .append("svg")
         .attr("class", "stage")
         .attr("height", height)
         .attr("width", width)
         .style("overflow", "hidden"); //!Not sure what this is doing

var link_force =  d3.forceLink(links_data)
                       .id(function(d) { return d.index; })

var simulation = d3.forceSimulation()
              .nodes(nodes_data)

//Add a charge add a centering force
//.strength() --->  If strength is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge.
//.distanceMax() ----> If distance is specified, sets the maximum distance between nodes over which this force is considered. If distance is not specified, returns the current maximum distance, which defaults to infinity. Specifying a finite maximum distance improves performance and produces a more localized layout.
    simulation
      .force("charge_force", d3.forceManyBody().strength(-5).distanceMax(-450)) //forceManyBody().strength(-5) controls the distance of each node from each other.
      .force("center_force", d3.forceCenter(width / 2, height / 2))
      .force("links",link_force)
      .on("tick", tickActions );


// Create flag nodes
var node = d3.select('#graph').selectAll('img')
.data(nodes_data)
.enter().append('img')
.attr('class', function(d) {  return 'flag flag-' + d.code.toString() })
.on('mouseover', function(d) {
  var xCoordinate = Math.round(d.x);
  var yCoordinate = Math.round(d.y);
    d3.select('#tooltip')
    .style("left", (xCoordinate + 50)+ "px")
    .style("top", yCoordinate + "px")
    .select("#value")
        .html('<div>' + d.country + '</div>')
    d3.select("#tooltip").classed("hidden", false);
})
.on('mouseout', function () {
          d3.select('#tooltip').classed("hidden", true);
        });

//draw lines for the links
var link = svg.selectAll(".link")
    .attr("class", "links")
    .data(links_data)
    .enter().append("line")
    .attr("stroke-width", 2)
    .style("stroke", "red");

function tickActions() {
          node //updates node positions each tick of the simulation
              .style("left", function(d){return (d.x  + "px")})
              .style("top", function(d){return (d.y + "px")})

          link //updates link positions, tells one end of the line to follow one node around and the other end of the line to follow the other node around
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
        }; //tickActions

//Drag & drop Force Directed Graph ================================

var drag_handler = d3.drag()
.on("start", drag_start)
.on("drag", drag_drag)
.on("end", drag_end);
//
function drag_start(d) {
  if(!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
//
function drag_drag(d){
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function drag_end(d){
  if(!d3.event.active) simulation.alphaTarget(0);
  d.fx = d.x;
  d.fy = d.y;
}

drag_handler(node);

}); // D3.JSON ===========================================================
