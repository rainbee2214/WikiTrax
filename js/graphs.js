window.onload = OnWindowLoad;

function OnWindowLoad()
{
	DrawGraph();
}

function DrawGraph(dataset)
{
	var dataset = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];

 	var w = 500;
 	var h = 100;
 	var barPadding = 1; 

 	var svg = d3.select("body")
 	            .append("svg")
 	            .attr("width", w)
 	            .attr("height", h);

 	svg.selectAll("circle")
	   .data(dataset)
	   .enter()
	   .append("circle")  
	   .attr("cx", function(d) {
	           return d[0];
	      })
	      .attr("cy", function(d) {
	           return d[1];
	      })
	      .attr("r", 5)
	      .attr("r", function(d) {
	          return Math.sqrt(h - d[1]);
	      });        

	      svg.selectAll("text")
	         .data(dataset)
	         .enter()
	         .append("text")
	         .text(function(d) {
	                 return d[0] + "," + d[1];
	            })
	         .attr("x", function(d) {
	                 return d[0];
	            })
	            .attr("y", function(d) {
	                 return d[1];
	            })
	            .attr("font-family", "sans-serif")
	              .attr("font-size", "11px")
	              .attr("fill", "red");
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
