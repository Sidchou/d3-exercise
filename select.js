let data = []

data = new Array([],[],[],[]);


data[0][0] = [1,2,3];
data[0][1] = [4,5,6];
data[1][0] = [7,8];
data[1][1] = [9,10,11,12];
data[1][2] = [13,14,15];
data[2][0] = [16];
data[3][0] = [17,18];

let height = 240;
let width = 1000;
let barWidth = 100;
let barGrap = 10;


let margin = {left:50,right:50,top:40,bottom:0};

let svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%")
let chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")")
let group1 = chartGroup.selectAll("g")
                  .data(data)
                  .enter().append("g")
                    .attr("class", (d,i)=> "group1 "+ i)
                    .attr("transform", (d,i)=> "translate("+i*(barWidth+barGrap)+",0)")

let group2 = group1.selectAll("g")
                  .data((d)=>d)
                  .enter().append("g")
                    .attr("class", (d,i,j)=> "group2 "+ i)
                    .attr("transform", (d,i,j)=> "translate(0,"+(height-((i+1)*50))+")")

group2.append("rect")
          .attr("x","0")
          .attr("y","0")
          .attr("width",barWidth)
          .attr("height",50)
          .attr("class","group2rects")

group2.selectAll("circle")
        .data((d)=>d)
        .enter().filter(d=>{return d>10}).append("circle")
          .attr("cx",(d,i)=>(i*21+10))
          .attr("cy","25")
          .attr("r","10")

group2.selectAll("text")
        .data(d=>d)
        .enter().filter(d=>{return d>10}).append("text")
          .attr("x",(d,i)=>i*21+10)
          .attr("y","25")
          .attr("class","txt")
          .attr("text-anchor","middle")
          .attr("dominant-baseline","middle")
          .text((d)=>d)
