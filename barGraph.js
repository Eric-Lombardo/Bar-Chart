function drawBarChart(arr) {
  
  // creates master div and some base styling
  let chart = document.createElement("div");
  chart.classList.add("chart");
  chart.style.display = "grid";
  chart.style.gap = "20px";
  chart.style.gridTemplateColumns = spreadDivs(arr);
  


  // creates div that will containe y-axis values
  let yAxis = document.createElement("div");
  yAxis.classList.add("column");
  yAxis.innerHTML = "y-axis values";
  chart.appendChild(yAxis);

  // loops through input array to create divs and nests them inside
  //chart div
  for (let i = 0; i < arr.length; i++) {
    let newData = document.createElement("div");
    newData.classList.add("column");
    newData.innerHTML = "dataset_" + (i + 1);
    chart.appendChild(newData); 
  }
  
  
  document.body.appendChild(chart);
}

// mini  function that takes the number of columns and creates 1fr for
// styling of grid-template-columns
function spreadDivs(arr) {
  let string = "";
  for (let j = 0; j <= arr.length; j++) {
    string += "1fr ";
  }
  return string;
}



console.log(drawBarChart([5, 6, 7, 10, 120, 2]));