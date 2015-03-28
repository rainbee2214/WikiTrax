window.onload = OnWindowLoad;

function OnWindowLoad()
{
    chrome.storage.local.get("dataSets", function(val)
    {
        console.log("Data sets: ",val);
        DrawBarChart(val.dataSets);
    });
	
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

		d3.select("body")
		    .on("click", function() {
		    	console.log("Clicking");
		        // //New values for dataset
		var dataset = [];                        //Initialize empty array
	 	for (var i = 0; i < 25; i++) {           //Loop 25 times
	 	    var newNumber = Math.round(Math.random() * 30)+10;  //New random number (0-30)
	 	    dataset.push(newNumber);             //Add new number to array
	 	}

		    yScale.domain([0, d3.max(dataset)]);
		        //Update all rects
		 svg.selectAll("rect")
		    .data(dataset)
		    .transition()    
		    .duration(2000)
		    .delay(function(d, i) {
		        return i / dataset.length * 1000;   
		    })
		    // .ease("linear")
		     .ease("circle")
		    // .ease("elastic")
		     //.ease("bounce")
		    .attr("y", function(d) {
		         return h - yScale(d);
		    })
		    .attr("height", function(d) {
		         return yScale(d);
		    })
		    .attr("fill", function(d) {
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

function DrawScatterPlot()
{
		//Scatter plot with random data, x axis and y axis
	 	var w = 500;
	 	var h = 300;
		// scale(2.5);
		// scale.domain([100,500])
		// scale.range([10,350])

		// var dataset = [
		// 	[ 5,     20 ],
		// 	[ 480,   90 ],
		// 	[ 250,   50 ],
		// 	[ 100,   33 ],
		// 	[ 330,   95 ],
		// 	[ 410,   12 ],
		// 	[ 475,   44 ],
		// 	[ 25,    67 ],
		// 	[ 85,    21 ],
		// 	[ 220,   88 ],
		// 	[600, 150]
		// 	];
		var dataset = [];
		var numDataPoints = 50;
		var xRange = Math.random() * 1000;
		var yRange = Math.random() * 1000;
		for (var i = 0; i < numDataPoints; i++) {
		    var newNumber1 = Math.round(Math.random() * xRange);
		    var newNumber2 = Math.round(Math.random() * yRange);
		    dataset.push([newNumber1, newNumber2]);
		}

	 	var padding = 30; 
		var xScale = d3.scale.linear()
						.domain([0, d3.max(dataset, function(d) { return d[0]; })])
						.range([padding, w-padding*2]);

		var yScale = d3.scale.linear()
						.domain([0, d3.max(dataset, function(d) { return d[1]; })])
						.range([h-padding, padding]);

		var rScale = d3.scale.linear()
						.domain([0, d3.max(dataset, function(d) { return d[1]; })])
						.range([2, 5]);

		var formatAsPercentage = d3.format(".1%");
		var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom")
						.ticks(8);

		var yAxis = d3.svg.axis()
		                  .scale(yScale)
		                  .orient("left")
		                  .ticks(5);

		var svg = d3.select("body")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

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
			.attr("r", function(d) 
			{
		    	return rScale(d[1]);
			});        

		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (h - padding) + ")")
		    .call(xAxis);

		svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" + padding + ",0)")
		    .call(yAxis);


		d3.select("body")
		    .on("click", function() 
		    {
		    	console.log("Clicking");
				dataset = [];             
				xRange = Math.random() * 1000;
				yRange = Math.random() * 1000;           
				for (var i = 0; i < numDataPoints; i++) 
				{
				    var newNumber1 = Math.round(Math.random() * xRange);
				    var newNumber2 = Math.round(Math.random() * yRange);
				    dataset.push([newNumber1, newNumber2]);
				}
				xScale.domain([0, d3.max(dataset), function(d)
					{
						return d[0];
					}]);
				yScale.domain([0, d3.max(dataset), function(d)
					{
						return d[1];
					}]);

				svg.selectAll("circle")
				    .data(dataset)
				    .transition()    
				    .duration(500)
				    // .ease("linear")
				     .ease("circle")
				    // .ease("elastic")
				     //.ease("bounce")
				     .attr("cy", function(d) {
						return yScale(d[1]);
					})
					.attr("cx", function(d) 
					{
				    	return xScale(d[0]);
					})
				    
		    });	
}

function DrawGraph()
{

	//Dynamic bar chart
	// var dataset = [1,2,3,4,5,6,6,7,8,8,9,9,20];
	// var w = 600;
	// var h = 250;
	// var barPadding = 30;
	// var padding = 2;

	// var xScale = d3.scale.ordinal()
	//                 .domain(d3.range(dataset.length))
	//                 .rangeRoundBands([0, w], 0.05);

 //    var yScale = d3.scale.linear()
 //    				.domain([0, d3.max(dataset)])
 //    				.range([h-padding, padding]);

 //    var svg = d3.select("body")
 //    			.append("svg")
 //    			.attr("width", w)
 //    			.attr("height", h);

	// svg.selectAll("rect")
	//    .data(dataset)
	//    .enter()
	//    .append("rect")
	//    .attr("width", w / dataset.length - barPadding)
	//    .attr("width", xScale.rangeBand())
	//     .attr("y", function(d) {
 //        	return h - yScale(d);
 //   		})
	//    .attr("x", function(d, i) 
	//    {
	//       return xScale(i);         // <-- Set x values
	//    })
	//     .attr("height", function(d)
	//     {
	//    		return yScale(d);
	//    });

	// d3.select("body")
	//     .on("click", function() {
	//     	console.log("Clicking");
	//         // //New values for dataset
	// var dataset = [];                        //Initialize empty array
 // 	for (var i = 0; i < 25; i++) {           //Loop 25 times
 // 	    var newNumber = Math.round(Math.random() * 30)+10;  //New random number (0-30)
 // 	    dataset.push(newNumber);             //Add new number to array
 // 	}

	//     yScale.domain([0, d3.max(dataset)]);
	//         //Update all rects
	//  svg.selectAll("rect")
	//     .data(dataset)
	//     .transition()    
	//     .duration(2000)
	//     .delay(function(d, i) {
	//         return i / dataset.length * 1000;   
	//     })
	//     // .ease("linear")
	//      .ease("circle")
	//     // .ease("elastic")
	//      //.ease("bounce")
	//     .attr("y", function(d) {
	//          return h - yScale(d);
	//     })
	//     .attr("height", function(d) {
	//          return yScale(d);
	//     })
	//     .attr("fill", function(d) {
	//     	var r,b,g;
	//     	r = Math.round(Math.random() * 55)+200;
	//     	g = Math.round(Math.random() * 55)+200;
	//     	b = Math.round(Math.random() * 55)+200;

	//          return "rgb(255,"+g+", " + b + ")";
	//     })
	//     });
	   
	//Scatter plot with random data, x axis and y axis
 // 	var w = 500;
 // 	var h = 300;
	// // scale(2.5);
	// // scale.domain([100,500])
	// // scale.range([10,350])

	// // var dataset = [
	// // 	[ 5,     20 ],
	// // 	[ 480,   90 ],
	// // 	[ 250,   50 ],
	// // 	[ 100,   33 ],
	// // 	[ 330,   95 ],
	// // 	[ 410,   12 ],
	// // 	[ 475,   44 ],
	// // 	[ 25,    67 ],
	// // 	[ 85,    21 ],
	// // 	[ 220,   88 ],
	// // 	[600, 150]
	// // 	];
	// var dataset = [];
	// var numDataPoints = 50;
	// var xRange = Math.random() * 1000;
	// var yRange = Math.random() * 1000;
	// for (var i = 0; i < numDataPoints; i++) {
	//     var newNumber1 = Math.round(Math.random() * xRange);
	//     var newNumber2 = Math.round(Math.random() * yRange);
	//     dataset.push([newNumber1, newNumber2]);
	// }

 // 	var padding = 30; 
	// var xScale = d3.scale.linear()
	// 				.domain([0, d3.max(dataset, function(d) { return d[0]; })])
	// 				.range([padding, w-padding*2]);

	// var yScale = d3.scale.linear()
	// 				.domain([0, d3.max(dataset, function(d) { return d[1]; })])
	// 				.range([h-padding, padding]);

	// var rScale = d3.scale.linear()
	// 				.domain([0, d3.max(dataset, function(d) { return d[1]; })])
	// 				.range([2, 5]);

	// var formatAsPercentage = d3.format(".1%");
	// var xAxis = d3.svg.axis()
	// 				.scale(xScale)
	// 				.orient("bottom")
	// 				.ticks(8);

	// var yAxis = d3.svg.axis()
	//                   .scale(yScale)
	//                   .orient("left")
	//                   .ticks(5);

	// var svg = d3.select("body")
	// 			.append("svg")
	// 			.attr("width", w)
	// 			.attr("height", h);

	// svg.selectAll("circle")
	// 	.data(dataset)
	// 	.enter()
	// 	.append("circle")  
	// 	.attr("cx", function(d) {
	// 		return xScale(d[0]);
	// 	})
	// 	.attr("cy", function(d) {
	// 		return yScale(d[1]);
	// 	})
	// 	.attr("r", function(d) 
	// 	{
	//     	return rScale(d[1]);
	// 	});        

	// svg.selectAll("text")
		// .data(dataset)
		// .enter()
		// .append("text")
		// .text(function(d) {
		// 	return d[0] + "," + d[1];
		// })
		// .attr("x", function(d) {
		// 	return xScale(d[0]);
		// })
		// .attr("y", function(d) {
		// 	return yScale(d[1]);
		// })
		// .attr("font-family", "sans-serif")
		// .attr("font-size", "11px")
		// .attr("fill", "red");


	// svg.append("g")
	// 	.attr("class", "axis")
	// 	.attr("transform", "translate(0," + (h - padding) + ")")
	//     .call(xAxis);

	// svg.append("g")
	//     .attr("class", "axis")
	//     .attr("transform", "translate(" + padding + ",0)")
	//     .call(yAxis);
	//BAR CHARTS
 // //	var dataset = [5, 10, 15, 20, 25, 25, 20, 15, 10, 5];
 // 	var dataset = [];                        //Initialize empty array
 // 	for (var i = 0; i < 25; i++) {           //Loop 25 times
 // 	    //var newNumber = Math.round(Math.random() * 30);  //New random number (0-30)
 // 	    dataset.push(i%20);             //Add new number to array
 // 	}

 // 	var w = 500;
 // 	var h = 100;
 // 	var barPadding = 1; 

 // 	var svg = d3.select("body")
 // 	            .append("svg")
 // 	            .attr("width", w)
 // 	            .attr("height", h);

 // 	svg.selectAll("rect")
 //           .data(dataset)
 //           .enter()
 //           .append("rect")
 //           .attr("x", 0)
 //           .attr("y", function(d) {
 //               return h - d*4;  //Height minus data value
 //           })
 //           .attr("width", w / dataset.length - barPadding)
 //           .attr("height", function(d) {
 //               return d * 4;  // <-- Times four!
 //           })
 //           .attr("x", function(d, i){ 
	// 		    return i * (w / dataset.length);  //Bar width of 20 plus 1 for padding
	// 		})
 //           .attr("fill", function(d) {
 //               return "rgb(0, 0, " + (d * 10) + ")";
 //           });


 //    svg.selectAll("text")
 //       .data(dataset)
 //       .enter()
 //       .append("text")       
 //       .text(function(d) {
 //               return d;
 //          })
 //       .attr("x", function(d, i) {
 //              return i * (w / dataset.length) + 5;  // +5
 //         })
 //         .attr("y", function(d) {
 //              return h - (d * 4) + 15;              // +15
 //         })
 //         .attr("font-family", "sans-serif")
 //            .attr("font-size", "11px")
 //            .attr("fill", "white")
 //            .attr("text-anchor", "middle")
 //            .attr("x", function(d, i) {
 //                    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
 //                })
 //            .attr("y", function(d) {
 //                    return h - (d * 4) + 14;  //15 is now 14
 //                });



           //Bar graph 
 	// var dataset = [];                        //Initialize empty array
 	// for (var i = 0; i < 4; i++) {           //Loop 25 times
 	//     var newNumber = Math.round(Math.random() * 30);  //New random number (0-30)
 	//     dataset.push(newNumber);             //Add new number to array
 	// }

 	// var w = 500;
 	// var h = 100;
 	// var svg = d3.select("body")
 	//             .append("svg")
 	//             .attr("width", w)
 	//             .attr("height", h);

 	// svg.selectAll("rect")
  //          .data(dataset)
  //          .enter()
  //          .append("rect")
  //          .attr("x", 0)
  //          .attr("y", 0)
  //          .attr("width", 20)
  //          .attr("height", 100)
  //          .attr("x", function(d, i){ 
		// 	    return i * (w / dataset.length);  //Bar width of 20 plus 1 for padding
		// 	});




 	console.log(dataset)
	//      d3.select("body") .selectAll("p")
	//      	.data(dataset)
	//      	.enter()
	//      	.append("div")
	// 		.attr("class", "bar")
	// 		.style("height", function(d) {
	// 		    var barHeight = d * 5;  //Scale up by factor of 5
	// 		    return barHeight + "px";
	// 		});
	//      	// .append("p")
	// // 		.text(function(d) { return "I love "+ d; })
	// // 		.style("color", function(e) {
	// 			//     if (e > 15) {   //Threshold of 15
	// 			//         return "red";
	// 			//     } else {
	// 			//         return "black";
	// 			//     }
	// 			// });
	// 	console.log(d3.selectAll("p"));

	// 	var svg = d3.select("body").append("svg");
	// 	var w = 500;
	// 	var h = 50;
	// 	var svg = d3.select("body")
	//             .append("svg")
	//             .attr("width", w)   
	//             .attr("height", h); 

	//     var circles = svg.selectAll("circle")
	//                      .data(dataset)
	//                      .enter()
	//                      .append("circle"); 

	//     circles.attr("cx", function(d, i) {
	//                 return (i * 50) + 25;
	//             })
	//            .attr("cy", h/2)
	//            .attr("r", function(d) {
	//                 return d;
	//            })
	//            .attr("fill", "yellow")
	//            .attr("stroke", "orange")
	//            .attr("stroke-width", function(d) {
	//                return d/2;
	//            });       
}
