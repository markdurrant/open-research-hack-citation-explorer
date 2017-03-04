var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("data/test.json", function(error, graph) {

  // var ourNodes = [];

  // function filterNodes (value) {
  //   if ( parseInt(value.year) >= 2010) {
  //     ourNodes.push(value.id);

  //     return value, ourNodes;
  //   }
  // }

  // function filterLinks (value) {
  //   var val;

  //   for (var i = ourNodes.length - 1; i >= 0; i--) {
  //     if (value.target == ourNodes[i]) {
  //       val = value;
  //     }
  //     return val;
  //   }
  //   return val;
  // }

  // var filteredNodes = graph.nodes.filter(filterNodes);
  // var filteredLinks = graph.links.filter(filterLinks);
  // console.log(filteredLinks);

  if (error) throw error;

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", 2);

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .filter(function(d) { if ( parseInt(d.year) >= 2015){return d} });
      // .attr("fill", function(d) { return color(d.group); })
      // .call(d3.drag()
      //     .on("start", dragstarted)
      //     .on("drag", dragged)
      //     .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.doi; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
});

// function dragstarted(d) {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }

// function dragged(d) {
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
// }

// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }