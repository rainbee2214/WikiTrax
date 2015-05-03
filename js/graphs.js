window.onload = OnWindowLoad;

var currentChart = 0;
var allCharts = ["Force","Category", "Bar"];

function OnWindowLoad()
{
    chrome.storage.local.get("dataSets", function(val)
    {

    	chrome.storage.local.get("currentChart", function(val)
    	//Check the local storage to pull which chart and set current chart accordingly
    	{
	        switch(val.currentChart.id)
	        {
	        	default:
	        	case 0:
	        	{
	        		console.log("Force chart");
	        		DrawForceGraphExample(); break;
	        	} 
	        	case 1:
	        	{
	        		console.log("Category chart");
	        		DrawCategoryChart(); break;
	        	} 
	        	case 2:
	        	{
	        		console.log("Bar chart");
	        		DrawRandomBarChart(); break;
	        	} 
	        }
    	});
    });

    d3.select("body").on("click", function() 
    {
    	console.log("Clicking body");
	    chrome.tabs.query({highlighted: true}, function (tab)
	    {
	    	chrome.storage.local.get("currentChart", function (val)
	    	{
	    	    cur = val.currentChart.id;
	    	    cur++;
	    	    if (cur >= allCharts.length) cur = 0;
	    	    val.currentChart.id = cur;
	    	    chrome.storage.local.set({currentChart: val.currentChart}, function()
	    	    {
	    	    	chrome.tabs.reload(tab[0].id);
	    	    	chrome.tabs.highlight({tabs: tab[0].index}, function(window){});
	    	    });
	    	});
	    });
    });
}

function DrawForceGraphExample()
{
	// console.log("Drawing category chart");
	var dataset = [];
	chrome.storage.local.get("categoryData", function(val)
	{
	    val.categoryData.forEach(function(element)
	    {
	    	dataset.push([element.name, element.timesVisited]);
	    });

		var tooltip = d3.select("body")
		  .append("div")
		  .style("position", "absolute")
		  .style("z-index", "10")
		  .style("visibility", "hidden")
		  .style("color", "black")
		  .style("background-color", "white")
		  .style("opacity", "0.85")
		  .style("display", "block")
		  .style("padding", "5px")
		  .style("border-radius", "3px")
		  .style("border", "1px solid black")

		var radii = [];
		dataset.forEach(function(element)
		{
			radii.push(element[1]);
		});

		var width = 1600,
		    height = 900;

		var rangeScale = 75 * dataset.length/75;
		var sizeScale = 8;
		var dataMaxRadius = d3.max(radii);
		// console.log("Max radius", dataMaxRadius);
		var scale = d3.scale.linear()
		      .domain([0, dataMaxRadius])
		      .range([0, (dataMaxRadius>rangeScale) ? dataMaxRadius/2 : rangeScale]);

		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height*1.5);

		var nodes = d3.range(dataset.length).map(function(d) 
		    {
		     return {radius: scale(dataset[d][1]), name: dataset[d][0]}; 
		 	}),
		    root = nodes[0];
			root.radius = 0;
			root.fixed = true;

			// console.log("Nodes", nodes);

		var force = d3.layout.force()
		    .gravity(0.095)
		    .nodes(nodes)
		    .size([width, height]);

		force.start();

    	var randomInt = Math.round(Math.random()*10)%4;
    	// console.log("Random int", randomInt);
		svg.selectAll("circle")
		    .data(nodes.slice(1))
		    .enter()
		    .append("circle")
		    .attr("r", function(d) 
		    {
		    	return d.radius; 
		    })
		    .style("fill",  function(d) 
		    {
		    	var r,b,g;
		    	//Blueish colours
		    	switch(randomInt)
		    	{
		    		default:
		    		case 0:
		    		{
		    			r = Math.round(Math.random() * ((d.radius)%75));
		    			g = Math.round(Math.random() * ((d.radius*1000)%90))+100;
		    			b = Math.round(Math.random() * ((d.radius*1000)%105))+150;
		    			break;
		    		}
		    		case 1:
		    		{
		    			b = Math.round(Math.random() * ((d.radius)%75));
		    			r = Math.round(Math.random() * ((d.radius*1000)%90))+100;
		    			g = Math.round(Math.random() * ((d.radius*1000)%105))+150;
		    			break;
		    		}
		    		case 2:
		    		{
		    			g = Math.round(Math.random() * ((d.radius)%75));
		    			b = Math.round(Math.random() * ((d.radius*1000)%90))+100;
		    			r = Math.round(Math.random() * ((d.radius*1000)%105))+150;
		    			break;
		    		}
		    		case 3:
		    		{
		    			b = Math.round(Math.random() * ((d.radius)%75));
		    			g = Math.round(Math.random() * ((d.radius*1000)%90))+100;
		    			r = Math.round(Math.random() * ((d.radius*1000)%105))+150;
		    			break;
		    		}
		    	}

		    	//console.log(r,g,b);
		         return "rgb("+r+ ","+g+", "+b+")";
		    });

		force.on("tick", function(e) 
		{
		  var q = d3.geom.quadtree(nodes),
		      i = 0,
		      n = nodes.length;

		  while (++i < n) q.visit(collide(nodes[i]));

		  svg.selectAll("circle")
		      .attr("cx", function(d) { return d.x; })
		      .attr("cy", function(d) { return d.y; })
		      .on("mouseover", function(d)
		        {
		          tooltip.text(d.name);
		          return tooltip.style("visibility", "visible");
		        })
		      .on("mousemove", function()
		        {
		          return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
		      })
		      .on("mouseout", function()
		        {
		          return tooltip.style("visibility", "hidden");
		        });
		});



		function collide(node) 
		{
		  var r = node.radius + 16,
		      nx1 = node.x - r,
		      nx2 = node.x + r,
		      ny1 = node.y - r,
		      ny2 = node.y + r;
		  return function(quad, x1, y1, x2, y2) {
		    if (quad.point && (quad.point !== node)) {
		      var x = node.x - quad.point.x,
		          y = node.y - quad.point.y,
		          l = Math.sqrt(x * x + y * y),
		          r = node.radius + quad.point.radius;
		      if (l < r) {
		        l = (l - r) / l * .5;
		        node.x -= x *= l;
		        node.y -= y *= l;
		        quad.point.x += x;
		        quad.point.y += y;
		      }
		    }
		    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		  };
		}

    });

}

function DrawCategoryChart()
{
	// console.log("Drawing graph");
	var categoryDataset;
	var dataset = [];
	chrome.storage.local.get("categoryData", function(val)
    {
        categoryDataset = val.categoryData;

        categoryDataset.forEach(function(element)
        {
        	dataset.push([element.name, element.timesVisited]);
        });

		var w = 600;
		var h = 300;
		var xRange = w;
		var yRange = h;
		var padding = 20;

		var xScale = d3.scale.linear()
				 .domain([0, xRange])
				 .range([padding, yRange*2 - padding * 2]);
		var yScale = d3.scale.linear()
				 .domain([0, xRange])
				 .range([yRange - padding, padding]);
		var xAxis = d3.svg.axis()
			  .scale(xScale)
			  .orient("bottom")
			  .ticks(5);
		var yAxis = d3.svg.axis()
			  .scale(yScale)
			  .orient("left")
			  .ticks(5);

		var tooltip = d3.select("body")
			.append("div")
			.style("position", "absolute")
			.style("z-index", "10")
			.style("visibility", "hidden")

		var svg = d3.select(".svgDiv")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis);

	   svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")

			   .attr("cx", function(d,i) {
			   		return xScale((i*8));
			   })
			   .attr("cy", function(d,i) {
			   		return yScale((i*8));
			   })
			   .attr("r", function(d,i) {
			   		return d[1];
			   })
			   .on("mouseover", function(d)
			   	{
			   		tooltip.text(d[0]);
			   		return tooltip.style("visibility", "visible");
			   	})
			   .on("mousemove", function()
			   	{
			   		return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
			   })
			   .on("mouseout", function()
			   	{
			   		return tooltip.style("visibility", "hidden");
			   	});

    });


}


function DrawDotChart()
{
	// console.log("Drawing dot category chart.");
	var categoryDataset = [];
	var dataset = [];
	chrome.storage.local.get("categoryData", function(val)
    {
        categoryDataset = val.categoryData;
		categoryDataset.forEach(function(category)
			{
				dataset.push([category.name, category.timesVisited]);
			});
    });

	d3.select("p").on("click", function()
	{
		svg.selectAll("circle")
		   .data(dataset)
		   .transition()
		   .duration(1000)
		   .attr("cx", function(d, i) {
		   		return xScale(i);
		   })
		   .attr("cy", function(d,i) {
		   		return yScale(i);
		   })
		   .attr("r", function(d) {
		   		return d[1];
		   });
	});
}

function DrawBarChart(dataset)
{
	// console.log("DrawGraph 1: ", dataset);
		var w = 600;
		var h = 250;
		var barPadding = 30;
		var padding = 2;

		var xScale = d3.scale.ordinal()
		                .domain(d3.range(dataset.length))
		                .rangeRoundBands([0, w], 0.05);

	    var yScale = d3.scale.linear()
	    				.domain([0, d3.max(dataset)])
	    				.range([h-padding, padding]);

	    var svg = d3.select("body")
	    			.append("svg")
	    			.attr("width", w)
	    			.attr("height", h);

		svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   .attr("width", w / dataset.length - barPadding)
		   .attr("width", xScale.rangeBand())
		    .attr("y", function(d) {
	        	return h - yScale(d);
	   		})
		   .attr("x", function(d, i) 
		   {
		      return xScale(i);         // <-- Set x values
		   })
		    .attr("height", function(d)
		    {
		   		return yScale(d);
		   });
		
	// console.log("Finished DrawGraph");
       		   
}


///These two functions are the tutorial examples
function DrawRandomBarChart()
{
		//Dynamic bar chart
		var dataset = [1,2,3,4,5,6,6,7,8,8,9,9,20];
		var w = 600;
		var h = 250;
		var barPadding = 30;
		var padding = 2;

		var xScale = d3.scale.ordinal()
		                .domain(d3.range(dataset.length))
		                .rangeRoundBands([0, w], 0.05);

	    var yScale = d3.scale.linear()
	    				.domain([0, d3.max(dataset)])
	    				.range([h-padding, padding]);

	    var svg = d3.select("body")
	    			.append("svg")
	    			.attr("width", w)
	    			.attr("height", h);

		svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   .attr("width", w / dataset.length - barPadding)
		   .attr("width", xScale.rangeBand())
		    .attr("y", function(d) {
	        	return h - yScale(d);
	   		})
		   .attr("x", function(d, i) 
		   {
		      return xScale(i);         // <-- Set x values
		   })
		    .attr("height", function(d)
		    {
		   		return yScale(d);
		   });

		d3.select("p")
		    .on("click", function() 
		    {
		    	// console.log("Clicking");
		        // //New values for dataset
				var dataset = [];                        //Initialize empty array
			 	for (var i = 0; i < 25; i++) 
			 	{           //Loop 25 times
			 	    var newNumber = Math.round(Math.random() * 30)+10;  //New random number (0-30)
			 	    dataset.push(newNumber);             //Add new number to array
			 	}

		    yScale.domain([0, d3.max(dataset)]);
		        //Update all rects
		 	svg.selectAll("rect")
			    .data(dataset)
			    .transition()    
			    .duration(2000)
			    .delay(function(d, i) 
			    {
			        return i / dataset.length * 1000;   
			    })
			    // .ease("linear")
			     .ease("circle")
			    // .ease("elastic")
			     //.ease("bounce")
			    .attr("y", function(d) 
			    {
			         return h - yScale(d);
			    })
			    .attr("height", function(d) 
			    {
			         return yScale(d);
			    })
			    .attr("fill", function(d) 
			    {
			    	var r,b,g;
			    	r = Math.round(Math.random() * 55)+200;
			    	g = Math.round(Math.random() * 55)+200;
			    	b = Math.round(Math.random() * 55)+200;

			         return "rgb(255,"+g+", " + b + ")";
			    })
		    });
		   
}

function ExampleDrawScatterPlot()
{
	//Width and height
				var w = 500;
				var h = 300;
				var padding = 30;
				
				//Dynamic, random dataset
				var dataset = [];											//Initialize empty array
				var numDataPoints = 50;										//Number of dummy data points to create
				var maxRange = Math.random() * 1000;						//Max range of new values
				for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
					var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
					var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
					dataset.push([newNumber1, newNumber2]);					//Add new number to array
				}

				//Create scale functions
				var xScale = d3.scale.linear()
									 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
									 .range([padding, w - padding * 2]);

				var yScale = d3.scale.linear()
									 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
									 .range([h - padding, padding]);

				//Define X axis
				var xAxis = d3.svg.axis()
								  .scale(xScale)
								  .orient("bottom")
								  .ticks(5);

				//Define Y axis
				var yAxis = d3.svg.axis()
								  .scale(yScale)
								  .orient("left")
								  .ticks(5);

				//Create SVG element
				var svg = d3.select("body")
							.append("svg")
							.attr("width", w)
							.attr("height", h);

				//Create circles
				svg.selectAll("circle")
				   .data(dataset)
				   .enter()
				   .append("circle")
				   .attr("cx", function(d) {
				   		return xScale(d[0]);
				   })
				   .attr("cy", function(d) {
				   		return yScale(d[1]);
				   })
				   .attr("r", 2);
				
				//Create X axis
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0," + (h - padding) + ")")
					.call(xAxis);
				
				//Create Y axis
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ",0)")
					.call(yAxis);



				//On click, update with new data			
				d3.select("p")
					.on("click", function() {

						//New values for dataset
						var numValues = dataset.length;						 		//Count original length of dataset
						var maxRange = Math.random() * 1000;						//Max range of new values
						dataset = [];  						 				 		//Initialize empty array
						for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
							var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
							var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
							dataset.push([newNumber1, newNumber2]);					//Add new number to array
						}
						
						//Update scale domains
						xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
						yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

						//Update all circles
						svg.selectAll("circle")
						   .data(dataset)
						   .transition()
	   					   .duration(1000)
						   .attr("cx", function(d) {
						   		return xScale(d[0]);
						   })
						   .attr("cy", function(d) {
						   		return yScale(d[1]);
						   });

					});

}

