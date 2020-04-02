let svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

/*
let data = [{x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}];
let interpolateType = [d3.curveLinear,d3.curveBasis,d3.curveBundle,d3.curveCardinal,d3.curveNatural,d3.curveStep]

for (let p = 0; p < interpolateType.length; p++){

  let line = d3.line().curve(d3.curveCardinal)
                  .x((d)=>d.x*6)
                  .y((d)=>d.y*4)
                  .curve(interpolateType[p]);

  let shiftX = p*250;
  let shiftY =0;

  let chartGroup = svg.append("g").attr("class","grp"+p).attr("transform","translate("+shiftX+",0)");

  chartGroup.append("path")
            .attr("fill","none")
            .attr("stroke","black")
            .attr("stroke-weight","2")
            .attr("d",line(data));

  chartGroup.selectAll("circle.grp"+p)
            .data(data)
            .attr("class",(d,i)=>"grp"+i)
            .enter().append("circle")
            .attr("cx",(d)=>d.x*6)
            .attr("cy",(d)=>d.y*4)
            .attr("r","2");
}
*/



//area

let dataArray = [25,26,28,32,37,45,55,70,90,120,135,150,160,168,172,177,180];
let dataYear = [];

for(i = 2000; i<=2016;i++){
dataYear.push(i+"");
}

let height = 200;
let width = 600;

let margin = {left:50,right:50,top:40,bottom:0};

let y = d3.scaleLinear()
          .domain([0,d3.max(dataArray)])
          .range([height,0]);

let parseDate = d3.timeParse("%Y")
let x = d3.scaleTime()
          .domain(d3.extent(dataYear,(d)=>parseDate(d)))
          .range([0,width]);

let yAxis = d3.axisLeft(y).ticks(3).tickPadding(5);
let xAxis = d3.axisTop(x);


let area = d3.area()
                .x((d,i)=>x(parseDate(dataYear[i])))
                .y0(height)
                .y1((d)=>y(d));

let chartGroup = svg.append("g")
                          .attr("class","chartGroup")
                          .attr("transform","translate("+margin.left+","+margin.top+")")



chartGroup.append("path").attr("d",area(dataArray))
chartGroup.append("g")
        .attr("class","axis y").call(yAxis)
chartGroup.append("g")
        .attr("class","axis x").call(xAxis)
