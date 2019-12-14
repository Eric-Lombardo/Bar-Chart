function drawBarChart(arr) {
  
  // creates master div and some base styling
  let chart = document.createElement("div");
  chart.classList.add("chart");
  chart.style.display = "grid";
  chart.style.gap = "20px";
  chart.style.gridTemplateColumns = spreadDivs(arr);
  chart.style.gridTemplateRows = createBarHeight(arr);
  
  // creates div that will containe y-axis values
  let yAxis = document.createElement("div");yAxis.style.gridRowStart = highestValue(arr) + 1;yAxis.classList.add("column");yAxis.innerHTML = "y-axis values";chart.appendChild(yAxis);

 

  // loops through input array to create divs and nests them inside
  //chart div
  for (let i = 0; i < arr.length; i++) {
    let newData = document.createElement("div");
    newData.classList.add("column");
    newData.innerHTML = "dataset_" + (i + 1);
    newData.style.gridColumnStart = i + 2;
    newData.style.gridRowStart = highestValue(arr) + 1;
    chart.appendChild(newData); 
  }
  
  // prints out values for y-axis based on input data
  for (let m = 1; m <= highestValue(arr); m++) {
    let printData = document.createElement("div");
    printData.innerHTML = m;
    printData.style.gridRowStart = m;
    printData.classList.add("column");
    chart.appendChild(printData);
  }
  
  
  document.body.appendChild(chart);
}

// testing
console.log(drawBarChart([5, 4, 2]));


// ------------------ mini functions ------------------ //


function highestValue(arr) {
  let count = null;
  for (let l = 0; l < arr.length; l++) {
    if (arr[l] > count) {
      count = arr[l];
    }
  }
  return count;
}

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


