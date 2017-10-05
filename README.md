# D3_force_directed_graph
A freeCodeCamp challenge creating a force directed graph showing which countries share borders.  

# Working Application
https://codepen.io/mookh01/full/XeVELR/

# Objective:

User Story: I can see a Force-directed Graph that shows which countries share borders.

User Story: I can see each country's flag on its node.

# Challenges: 
I had trouble displaying the flag images in the new D3 v.4. I also had trouble with the D3 force layout. 
I was using attributes  and "cy" & "cx" coordinates when I should have been using style and "left" & "top". See below
The was using this...

          `node 
              .style("left", function(d){return (d.x  + "px")})
              .style("top", function(d){return (d.y + "px")})
              `
              
When I should have used this...

           
          `node 
               .attr("cx", function(d) {  return d.x; })
               .attr("cy", function(d) {  return d.y; });`
               
Also the D3 version 3 force layout was as follows....

  `var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links)
    .gravity(0.3)
    .charge(-200)`
    
What I needed was.....

`var link_force =  d3.forceLink( ~ data you’d get from JSON or some object ~ )
                       .id(function(d) { return d. ~ some kind of key: value pair ~ ; })`

`var simulation = d3.forceSimulation()
              .nodes(  ~ data you’d get from JSON or some object ~)`

    `simulation
      .force("charge_force", d3.forceManyBody().strength(-5).distanceMax(-450)) 
      .force("center_force", d3.forceCenter(width / 2, height / 2))
      .force("links",link_force)
      .on("tick", tickActions );` 
