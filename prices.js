let parseDate = d3.timeParse("%m/%d/%Y")
let data = [];

d3.csv("prices.csv",(d)=>{return{
                                  month: parseDate(d.month),
                                  price: Number(d.price.slice(1))
                                }
                              })
                    .then((d)=>{

                      // console.log(d[0]);
                      let height = 300;
                      let width = 500;

                      let max = d3.max(d,(d)=>d.price);
                      let dateRange = d3.extent(d,(d)=> d.month);
                      console.log(dateRange)
                      console.log(dateRange[1]-dateRange[0]);

                      let y = d3.scaleLinear()
                                    .domain([0 ,max])
                                    .range([height,0]);

                      let x = d3.scaleLinear()
                                    .domain(dateRange)
                                    .range([0,500]);
                      console.log()
                      let yAxis = d3.axisLeft(y)

                      let xAxis = d3.axisBottom(x)

                      let svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%")
                      let margin = {left:-1041397200000, right:50, top:40, bottom:0};
                      let chartGroup = svg.append("g").attr("trasnform","translate("+margin.left+","+margin.top+")")
                      let line = d3.line()
                                      .x((d)=>d.month)
                                      .y((d)=>d.price);
                      chartGroup.append("path").attr("d",line(d))


                    })
                    .catch(function(error){
                       console.log(error);
                    })
