window.onload = OnWindowLoad;

var currentChart = 0;
var allCharts = ["Bar", "Dot"];

function OnWindowLoad()
{
    chrome.storage.local.get("dataSets", function(val)
    {
        console.log("Data sets: ",val.dataSets);
        //DrawBarChart(val.dataSets);
        //ExampleDrawScatterPlot();
        DrawDotChart(val.dataSets);
    });

}

function DrawCategoryChart()
{
	var dataset = [];
	chrome.storage.local.get("categoryData", function(val)
    {
        dataset = val.categoryData;
    	console.log("Dataset for category chart:", dataset);
    }
}


function DrawDotChart(dataset)
{
	//dataset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var w = 600;
	var h = 600;
	var xRange = 100;
	var yRange = h;
	var padding = 20;

	//Create scale functions
	var xScale = d3.scale.linear()
			 .domain([0, xRange])
			 .range([padding, yRange - padding * 2]);

	var yScale = d3.scale.linear()
			 .domain([0, xRange])
			 .range([yRange - padding, padding]);

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

	var svg = d3.select("body")
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
	   .attr("cx", function(d, i) {
	   		return xScale(i);
	   })
	   .attr("cy", function(d) {
	   		return yScale(d);
	   })
	   .attr("r", 2);
}

function DrawBarChart(dataset)
{
	console.log("DrawGraph 1: ", dataset);
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
		
	console.log("Finished DrawGraph");
       		   
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
		    	console.log("Clicking");
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

