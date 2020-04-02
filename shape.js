let dataArray = [5,11,18];
let days = ["Mon","wed","Fri"]

let rainbow = d3.scaleSequential(d3.interpolateRainbow).domain([0,10]);
let cat10 =  d3.schemeCategory10;

let x = d3.scaleBand()
              .domain(days)
              .range([0,170])
              .paddingInner(0.1176)

let xAxis = d3.axisBottom(x);

let svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");
svg.selectAll("rect")
      .data(dataArray)
      .enter().append("rect")
                .attr("width","50")
                .attr("height",(d)=> (d*15))
                .attr("fill",(d,i)=>rainbow(i))
                .attr("x",(d,i)=> (i*60))
                .attr("y",(d)=> ((d3.max(dataArray)-d)*15+50));

svg.append("g")
      .attr("class","x axis hidden")
      .attr("transform","translate(0,300)")
      .call(xAxis);


let newX = 300
svg.selectAll("circle.first")
      .data(dataArray)
      .enter().append("circle")
                .attr("class","first")
                .attr("r",(d)=> (d*3))
                .attr("fill","blue")
                .attr("cx",(d,i)=> {return (newX+=d*3+i*20)})
                .attr("cy",100);

newX = 300
svg.selectAll("ellipse.second")
      .data(dataArray)
      .enter().append("ellipse")
                .attr("class","first")
                .attr("ry","50")
                .attr("rx",(d)=> (d*3))
                .attr("fill",(d,i)=>cat10[i])
                .attr("cx",(d,i)=> {return (newX+=d*3+i*20)})
                .attr("cy",300);

newX = 300
svg.selectAll("line")
      .data(dataArray)
      .enter().append("line")
                .attr("x1","50")
                .attr("y1",(d,i)=> (400+i*10))
                .attr("stroke","green")
                .attr("stroke-width","2")
                .attr("x2",(d)=> {return (50+d*10)})
                .attr("y2",(d,i)=> (400+i*10));


newX = 100
svg.append("text")
      .attr("x",newX)
      .attr("y",580)
      .attr("font-size","20")
      .attr("text-anchor","start")
      .attr("dominant-baseline","middle")
      .text("start");

svg.append("text")
      .attr("x",newX)
      .attr("y",600)
      .attr("font-size","20")
      .attr("text-anchor","middle")
      .attr("dominant-baseline","middle")
      .text("middle");

svg.append("text")
      .attr("x",newX)
      .attr("y",620)
      .attr("font-size","20")
      .attr("text-anchor","end")
      .attr("dominant-baseline","middle")
      .text("end");


svg.selectAll("line.align")
      .data(dataArray)
      .enter().append("line")
                .attr("class","align")
                .attr("x1",newX)
                .attr("y1","580")
                .attr("stroke","red")
                .attr("stroke-width","1")
                .attr("x2",newX)
                .attr("y2","620")

textArray = ["start","middle","end"];
newX = 300;
svg.append("text").selectAll("tspan")
      .data(textArray)
      .enter().append("tspan")
      .attr("x",newX)
      .attr("y",(d,i)=> 580+i*20)
      .attr("font-size","20")
      .attr("text-anchor",(d)=>d)
      .attr("dominant-baseline","middle")
      .text((d)=>d);
