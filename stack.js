let parseDate = d3.timeParse("%Y")
let d0 = []
d3.xml("data2.xml").then((xml)=>{

        let h = 200;
        let w = 500;
        let margin = {left:50,right:50,top:40,bottom:0};

         xml = [].map.call(xml.querySelectorAll("dat"),(d)=>{
            return {
                date: parseDate(d.getAttribute("id")),
                top: +d.querySelector("top").textContent,
                middle: +d.querySelector("middle").textContent,
                bottom: +d.querySelector("bottom").textContent

            }
        })
        // console.log(xml[0].date);

        let x = d3.scaleTime()
                    .domain(d3.extent(xml,(d)=>d.date))
                    .range([0,w])
        let y = d3.scaleLinear()
                    .domain([0,d3.max(xml,(d)=>d.top+d.middle+d.bottom)])
                    .range([h,0])
        // let catagories = ["top","middle","bottom"];
        let catagories = ["bottom","middle","top"];
 
        let stack = d3.stack().keys(catagories);

        let area = d3.area()
                      .x((d)=>x(d.data.date))
                      .y0((d)=>y(d[0]))
                      .y1((d)=>y(d[1]))
        let svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%")
        let chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")")

        chartGroup.append("g").attr("class","x axis")
                        .attr("transform","translate(0,"+h+")")
                        .call(d3.axisBottom(x))
        chartGroup.append("g").attr("class","y axis")
                        .call(d3.axisLeft(y))



        //
        chartGroup.selectAll("path.area")
                  .data(stack(xml))
                  .enter().append("path")
                          .attr("class",(d,i)=>"area "+catagories[i])
                          .attr("d",d=>area(d))


      }).catch((e)=>console.error(e))
