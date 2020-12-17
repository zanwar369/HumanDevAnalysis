var h = 500
var w = 800

var margin = {top: 10, right: 100, bottom: 60, left: 60},
    innerWidth = w - margin.left - margin.right,
    innerHeight = h - margin.top - margin.bottom;

var svg = d3.select("#human_dev")
  .append("svg")
    .attr("width", innerWidth + margin.left + margin.right)
    .attr("height", innerHeight + margin.top + margin.bottom)

////
var rowConverter = function (d) {
  return {

    Inequality_adjusted_income_index: +d['Inequality-adjusted income index'], 
    Inequality_in_education_perc: +d['Inequality in education (%)'],
    EdInd: +d['EdInd'],
    Inequality_in_life_expectancy_perc: +d['Inequality in life expectancy (%)'],
    Homicide_Rate : +d['Homicide.rate'],
    Prison_pop : +d['Prison.popn']
    }
};  


d3.csv("https://gist.githubusercontent.com/lubin-liu/c1b2c1df6235addff10810fbf59f7ed3/raw/HumDevAll_narm.csv", 
	rowConverter).then(function(data) {

////
    var allGroup = [["Inequality_adjusted_income_index","Inequality Adjusted Income Index"], 
    ["Inequality_in_education_perc","Inequality in Education (%)"],
    ["EdInd","Education Index"],
    ['Inequality_in_life_expectancy_perc','Inequality in Life Expectancy (%)'],
    ['Homicide_Rate','Homcide Rate (per 100,000 people)'],
    ['Prison_pop', 'Prison Population (per 100,000 people)']]
    

    d3.select("#selectButtonX")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(d => d[1]) 
      .attr("value", d => d[0]) 

    d3.select("#selectButtonY")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(d => d[1]) 
      .attr("value", d => d[0]) 


////
    var initial_min = d3.min(data, d => d.Inequality_adjusted_income_index) 

    var initial_max = d3.max(data, d => d.Inequality_adjusted_income_index) 


    var xScale = d3.scaleLinear()
      .domain([0.8*initial_min,1.1*initial_max])
      .range([ 0, innerWidth ]);
    
    svg.append("g")
      .attr('class','xaxis')
      .attr("transform", `translate(${margin.left},${h - margin.bottom})`)
      .call(d3.axisBottom(xScale))
 
    var yScale = d3.scaleLinear()
      .domain([0.8*initial_min,1.1*initial_max])
      .range([ innerHeight, 0 ]);

    svg.append("g")
      .attr('class','yaxis')
      .attr("transform",
            `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale));


////
    var dot = svg.append('g') 
      .attr('id','plot')   
      .attr("transform",
            `translate(${margin.left},${margin.top})`)
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", d => xScale(+d.Inequality_adjusted_income_index))
        .attr("cy", d => yScale(+d.Inequality_adjusted_income_index))
        .attr("r", 4)
        .style("fill", "#69b3a2")
        .style('opacity',0.75)

////
    var xlabel = svg.append('text')
                  .attr('class','xlabel')
                  .attr("text-anchor", "middle")
                  .text('Inequality Adjusted Income Index')
                  .attr('font-size','20px')
                  .attr('x',margin.left+innerWidth/2)
                  .attr('y', h - margin.bottom/4)

////
    var ylabel = svg.append("text")
                    .attr("class", "ylabel")
                    .attr("text-anchor", "middle")
                    .attr("y", margin.left/5)
                    .attr('x', -1*innerHeight/2)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .text('Inequality Adjusted Income Index')
                    .attr('font-size','20px')

    function updateX(textX, selectGroupX) {

		var dataFilter = data.map(function(d){return {X: d[selectGroupX]} })

      xlabel.text(textX)

      var minimum = d3.min(dataFilter, d => d.X)
      var maximum = d3.max(dataFilter, d => d.X)
      xScale.domain([0.8*minimum, 1.1*maximum])

      svg.selectAll("g.xaxis")
    	   .call(d3.axisBottom(xScale));

      dot.data(dataFilter)
         .attr('cx', d => xScale(+d.X))

    }

    function updateY(textY, selectGroupY) {

      var dataFilter = data.map(function(d){return {Y:d[selectGroupY]} })

       ylabel.text(textY)

       var minimum = d3.min(dataFilter, d => d.Y)
       var maximum = d3.max(dataFilter, d => d.Y)
       yScale.domain([0.8*minimum, 1.1*maximum])


       svg.selectAll("g.yaxis")
          .call(d3.axisLeft(yScale));       

       dot.data(dataFilter)
          .attr('cy', d => yScale(+d.Y))
    }


    d3.select("#selectButtonX").on("change", function(d) {

        var selectedOptionX = d3.select(this).property("value")
        var textX = d3.select("#selectButtonX option:checked").text()
        updateX(textX, selectedOptionX)
    })
    d3.select("#selectButtonY").on("change", function(d) {

        var selectedOptionY = d3.select(this).property("value")
        var textY = d3.select("#selectButtonY option:checked").text()
        updateY(textY, selectedOptionY)
    })
})