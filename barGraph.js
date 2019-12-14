function drawBarChart(arr) {
  
  // creates master div and some base styling
  let chart = document.createElement("div");
  chart.classList.add("chart");
  chart.style.display = "grid";
  chart.style.gap = "20px";
  chart.style.gridTemplateColumns = spreadDivs(arr);
  chart.style.gridTemplateRows = createBarHeight(arr);
  
  // creates div that will containe y-axis values
  let yAxis = document.createElement("div");yAxis.classList.add("column");yAxis.innerHTML = "y-axis values";chart.appendChild(yAxis);

 

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

// testing
console.log(drawBarChart([5, 4, 2]));


// ------------------ mini functions ------------------ //

function createBarHeight(arr) {
  let count = null;
  let string = "";
  for (let k = 0; k < arr.length; k++) {
    if (arr[k] > count) {
      count = arr[k];
    }
  }
  while (count >= 0) {
    string += "1fr ";
    count -= 1;
  }
  return string;
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


