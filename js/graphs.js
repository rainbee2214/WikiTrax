window.onload = OnWindowLoad;

function OnWindowLoad()
{
	DrawGraph();
}

function DrawGraph(dataset)
{
 	var dataset = [5, 10, 15, 20, 25];
 	// var dataset = [];                        //Initialize empty array
 	// for (var i = 0; i < 25; i++) {           //Loop 25 times
 	//     var newNumber = Math.round(Math.random() * 30);  //New random number (0-30)
 	//     dataset.push(newNumber);             //Add new number to array
 	// }
 	console.log(dataset)
     d3.select("body") .selectAll("p")
     	.data(dataset)
     	.enter()
     	.append("div")
		.attr("class", "bar")
		.style("height", function(d) {
		    var barHeight = d * 5;  //Scale up by factor of 5
		    return barHeight + "px";
		});
     	// .append("p")
// 		.text(function(d) { return "I love "+ d; })
// 		.style("color", function(e) {
			//     if (e > 15) {   //Threshold of 15
			//         return "red";
			//     } else {
			//         return "black";
			//     }
			// });
	console.log(d3.selectAll("p"));

	var svg = d3.select("body").append("svg");
	var w = 500;
	var h = 50;
	var svg = d3.select("body")
            .append("svg")
            .attr("width", w)   
            .attr("height", h); 

    var circles = svg.selectAll("circle")
                     .data(dataset)
                     .enter()
                     .append("circle"); 

    circles.attr("cx", function(d, i) {
                return (i * 50) + 25;
            })
           .attr("cy", h/2)
           .attr("r", function(d) {
                return d;
           })
           .attr("fill", "yellow")
           .attr("stroke", "orange")
           .attr("stroke-width", function(d) {
               return d/2;
           });       
}
