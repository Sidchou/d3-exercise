let h = 200;
let w = 500;
let margin = {left: 50, right: 50, top: 40, bottom: 0};

let tree = d3.tree().size([w,h]);

let svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%");
let chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

d3.json("treeData.json").then((d)=>{
  let root = d3.hierarchy(d[0])
  console.log(root.descendants());
  tree(root)
  chartGroup.selectAll("circle")
              .data(root.descendants())
              .enter().append("circle")
              .attr("cx",(d)=>d.x)
              .attr("cy",(d)=>d.y)
              .attr("r","5")
              // console.log("M"+d.x+" "+d.y+"L"+d.parent.x+" "+d.parant.y);
  chartGroup.selectAll("path")
              .data(root.descendants().slice(1))
              .enter().append("path")
              .attr("class","link")
              .attr("d",(d)=>{return "M"+d.x+" "+d.y+"L" +d.parent.x+" "+d.parent.y})
              .attr("stroke","black")
              .attr("stroke-width","2")

}).catch((e)=>(console.error(e)))
