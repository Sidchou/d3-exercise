
  let w =  window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
  let h = window.innerHeight;
  let vertices = d3.range(100).map(()=>[Math.random()*w,Math.random()*h]);
  let pageX = 0;
  let pageY = 0;
  let tooltip = d3.select("body").append("div").style("opacity","0").style("position","absolute")
  let offx = 0
  let offy = 0


function callFunction() {



let svgTest =d3.select("body").select("svg");
        if (!svgTest.empty()){svgTest.remove()}



let voronoi = d3.voronoi().size([w,h]);
let svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%")

 chartGroup = svg.append("g")
        .call(d3.drag().on("drag",()=>{
          offx+=d3.event.dx
          offy+=d3.event.dy
          chartGroup.attr("transform","translate("+offx+","+offy+")")
        }));

chartGroup.call(d3.zoom()
.scaleExtent([0.8,2])
.on("zoom",()=>svg.attr("transform",d3.event.transform)))


 cells = chartGroup.append("g").attr("class","cells")
                     .selectAll("path")
                     .data(voronoi.polygons(vertices))
                     .enter().append("path")
                     //.transition().duration(500)
                     .attr("d",(d)=>{
                       return "M" + d.join("L") + "Z"
                       })
                    .attr("fill","white")





a = chartGroup.append("g").attr("class","core")
                    .selectAll("circle")
                    .data(vertices)
                    .enter().append("circle")
                    .attr("cx",(d)=>d[0])
                    .attr("cy",(d)=>d[1])
                    .attr("r",2)

// d3.select("g.cells").select("path:nth-child(1)").transition().delay(500).duration(1000).style("fill","blue").transition().duration(1000).style("fill","red")
// d3.select("g.cells").select("path:nth-child(1)").dispatch("mousemove")
// d3.select("g.cells").selectAll("path").dispatch("mousemove").attr("fill","white")
// d3.select("g.cells").selectAll("path").dispatch("mousemove")

cells.on("mouseenter",(d)=>{
         d3.select(d3.event.target).transition().duration(1000).style("fill","red")
         tooltip.style("opacity","1").style("left",(d.data[0]+5)+"px").style("top",(d.data[1]-20)+"px")
         tooltip.html("x: " + d3.format(".1f")(d.data[0]) + ", y: " + d3.format(".1f")(d.data[1]) + "<br>" + d.length + " sides" )

         })
       .on("mouseout",()=>{
         d3.select(d3.event.target).transition().duration(1000).style("fill","white")
            })

  chartGroup.on("mouseout",()=>{tooltip.style("opacity","0")})

}
callFunction();
d3.select(window).on("resize",callFunction)
