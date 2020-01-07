function drawBarChart(arr, obj) {
  
  // creates master div element with some base styling
  let master = document.createElement("div");
  master.id = "master";
  master.style.width = obj.masterWidth;
  master.style.border = obj.masterBorder;
  master.style.fontFamily = obj.fontFamily;

  // creates chart div and some base styling
  let chart = document.createElement("div");
  chart.classList.add("chart");
  chart.style.display = "grid";
  chart.style.gap = obj.spaceBetweenBars;
  chart.style.gridTemplateColumns = spreadDivs(arr);
  chart.style.gridTemplateRows = createBarHeight(arr);

  // creates title
  let title = document.createElement("div");
  title.innerText = obj.titleName;
  title.style.fontSize = obj.titleFontSize;
  title.style.color = obj.titleFontColor;
  title.style.paddingBottom = obj.titleBottomSpace;
  master.appendChild(title);
  
  // creates div that will contain y-axis values
  let yAxis = document.createElement("div");
  yAxis.style.gridRowStart = highestValue(arr) + 1;
  yAxis.style.borderTop = obj.yAxisTicksStyle;
  yAxis.innerHTML = obj.yAxisLabel;
  yAxis.style.color = obj.labelTextColor;
  yAxis.style.backgroundColor = obj.labelBGColor;
  chart.appendChild(yAxis);
  
  // sets the background color of the body  
  document.body.style.backgroundColor = obj.backgroundColor;

  // loops through input array to create divs and nests them inside
  //chart div
  for (let i = 0; i < arr.length; i++) {
    let newData = document.createElement("div");
    newData.innerHTML = obj.barNameArr[i];
    newData.style.backgroundColor = obj.labelBGColor;
    newData.style.color = obj.labelTextColor;
    newData.style.gridColumnStart = i + 2;
    newData.style.gridRowStart = highestValue(arr) + 1;
    chart.appendChild(newData); 
  }
  
  // prints out values for y-axis based on input data
  for (let m = obj.yValueStart; m <= highestValue(arr); m += obj.yValuestepIncrease) {
    let printData = document.createElement("div");
    printData.innerHTML = m;
    printData.style.gridRowStart = (highestValue(arr) + 1) - m;
    printData.style.borderTop = obj.yAxisTicksStyle;
    chart.appendChild(printData);
  }

  // creates bars
  for (let n = 0; n < arr.length; n++) {
    let barColor = document.createElement("div");
    let barValue = document.createElement("div");
    barValue.innerText = arr[n];
    barColor.appendChild(barValue);
    barColor.style.backgroundColor = obj.barColorArr[n];
    barColor.style.gridColumnStart = n + 2;
    barColor.style.gridRowEnd = highestValue(arr) + 1;
    if (arr[n] === highestValue(arr)) {
      barColor.style.gridRowStart = 1;
    } else if (arr[n] < highestValue(arr)) {
      barColor.style.gridRowStart = highestValue(arr) - arr[n] + 1;
    }
    chart.appendChild(barColor);
  }
  



  master.appendChild(chart);
  document.body.appendChild(master);
}

// testing
let testArr = [5, 4, 2, 10];
let testObj = {
  backgroundColor: "rgb(191, 227, 200)",
  barColorArr : ["orange", "green", "blue", "red"],
  barNameArr : ["cats", "dogs", "birds", "geese"],
  titleName : "My first bar-chart in JS",
  titleBottomSpace : "10px",
  titleFontSize : "50px",
  titleFontColor : "purple",
  yAxisLabel : "# of people who likes this pet",
  yAxisTicksStyle : "1px dotted rgb(117, 77, 65)",
  yValueStart : 5, // for even ticks start should match step increase
  yValuestepIncrease : 5,
  spaceBetweenBars : "2px",
  masterWidth: "600px",
  masterBorder: "2px solid black",
  labelBGColor: "red",
  labelTextColor: "blue",
  fontFamily: "Comic Sans MS" // only use web-safe fonts
}
console.log(drawBarChart(testArr, testObj));


// ------------------ mini functions ------------------ //

// finds the highest value of input data-set
function highestValue(arr) {
  let count = null;
  for (let l = 0; l < arr.length; l++) {
    if (arr[l] > count) {
      count = arr[l];
    }
  }
  return count;
}

// looks at input data value and creates chart rows based off highest
// input data value
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


