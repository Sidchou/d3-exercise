function callFunction() {
let w =  window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
let h = window.innerHeight;


let tooltip = d3.select("body").append("div").style("opacity","0").style("position","absolute")


let svgTest =d3.select("body").select("svg");
        if (!svgTest.empty()){svgTest.remove()}

let vertices = d3.range(100).map(()=>[Math.random()*w,Math.random()*h]);

let voronoi = d3.voronoi().size([w,h]);
let svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%")
let cells = svg.append("g").attr("class","cells")
                    .selectAll("path")
                    .data(voronoi.polygons(vertices))
                    .enter().append("path")
                    .attr("d",(d)=>{
                      return "M" + d.join("L") + "Z"
                      })
                    .on("mousemove",(d)=>{
                      console.log(this);
                      })

                    // .on("mousemove",(d)=>{
                    //   console.log(d3.touch(this));
                    //   tooltip.style("opacity","1").style("left",(d3.event.pageX+5)+"px").style("top",(d3.event.pageY-40)+"px")
                    //   tooltip.html("x: " + d3.format(".1f")(d.data[0]) + ", y: " + d3.format(".1f")(d.data[1]) + "<br>" + d.length + " sides" )
                    //   })
                    // .on("mouseout",()=>{
                    //   tooltip.style("opacity","0")
                    // })

svg.append("g").attr("class","core")
                    .selectAll("circle")
                    .data(vertices)
                    .enter().append("circle")
                    .attr("cx",(d)=>d[0])
                    .attr("cy",(d)=>d[1])
                    .attr("r",2)

}
callFunction();
d3.select(window).on("resize",callFunction)
