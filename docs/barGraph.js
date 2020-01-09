function drawBarChart(arr, obj, element) {
  
  // creates master div element with some base styling
  let master = document.createElement("div");
  master.id = "master";
  master.style.boxSizing = "border-box";
  master.style.width = obj.masterWidth;
  master.style.border = obj.masterBorder;
  master.style.fontFamily = obj.fontFamily;
  customFont(obj.fontFamilyURL);
  master.style.color = obj.valueFontColor;
  master.style.textAlign = "center";

  // creates chart div and some base styling
  let chart = document.createElement("div");
  chart.classList.add("chart");
  chart.style.display = "grid";
  chart.style.gap = obj.spaceBetweenBars;
  if (obj.stackedBarChart === false) {
    chart.style.gridTemplateColumns = spreadDivs(arr);
  } else if (obj.stackedBarChart === true) {
    chart.style.gridTemplateColumns = "1fr 1fr";
  }
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
  
  // sets the background color of the chart of user's chosen element  
  document.querySelector(element).style.backgroundColor = obj.backgroundColor;

  // loops through input array to create divs and nests them inside
  //chart div
  if (obj.stackedBarChart === false) {
    for (let i = 0; i < arr.length; i++) {
      let newData = document.createElement("div");
      newData.innerHTML = obj.barNameArr[i];
      newData.style.backgroundColor = obj.labelBGColor;
      newData.style.color = obj.labelTextColor;
      newData.style.gridColumnStart = i + 2;
      newData.style.gridRowStart = highestValue(arr) + 1;
      chart.appendChild(newData); 
    }
  } else if (obj.stackedBarChart === true) {
    let newData = document.createElement("div");
    newData.style.backgroundColor = obj.labelBGColor;
    newData.style.color = obj.labelTextColor;
    newData.style.gridColumnStart = 2;
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
  if (obj.stackedBarChart === false) {
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
  } else if (obj.stackedBarChart === true) {
    let barColor = document.createElement("div");
    let barValue = document.createElement("div");
    barValue.innerText = highestValue(arr) + " - " + obj.barNameArr[arr.indexOf(highestValue(arr))];
    barColor.appendChild(barValue);
    barColor.style.backgroundColor = obj.barColorArr[0];
    barColor.style.gridColumnStart = 2;
    barColor.style.gridRowEnd = highestValue(arr) + 1;
    barColor.style.gridRowStart = 1;
    chart.appendChild(barColor);
  }

  // creates colored bars stacked over each other for stacked bar graph
  if (obj.stackedBarChart === true) {
    let sortedArr = sort(arr);

    for (let p = 0; p < sortedArr.length; p++) {
      let newStackBar = document.createElement("div");
      let number = sortedArr[p];
      newStackBar.style.backgroundColor = obj.barColorArr[arr.indexOf(number)];
      console.log(number);
      newStackBar.innerHTML = `${sortedArr[p]} - ${obj.barNameArr[arr.indexOf(number)]}`;
      newStackBar.style.gridColumnStart = 2;
      newStackBar.style.gridRow = `${(highestValue(arr) + 1 - sortedArr[p])} / 11`;
      chart.appendChild(newStackBar);
    }
  }

  // nesting everything together with final destination being the user's chosen element
  master.appendChild(chart);
  let placeChart = document.querySelector(element);
  placeChart.appendChild(master);
}

// testing
let testArr = [5, 4, 2, 10];
let testObj = {
  backgroundColor: "black",
  barColorArr : ["orange", "green", "aqua", "red"],
  barNameArr : ["cats", "dogs", "birds", "geese"],
  titleName : "My first bar-chart in JS",
  titleBottomSpace : "10px",
  titleFontSize : "50px",
  titleFontColor : "purple",
  yAxisLabel : "# of people who likes this pet",
  yAxisTicksStyle : "1px dotted rgb(117, 77, 65)",
  valueFontColor: "red",
  yValueStart : 2, // for even ticks start should match step increase
  yValuestepIncrease : 2, // make sure that the highest value is a multiple
  spaceBetweenBars : "2px",
  masterWidth: "600px",
  masterBorder: "2px solid black",
  labelBGColor: "violet",
  labelTextColor: "red",
  fontFamily: "'Cute Font', cursive",
  fontFamilyURL: "https://fonts.googleapis.com/css?family=Cute+Font&display=swap",
  stackedBarChart: true,
}
let testElement = "#placeChart" // make sure element doesn't have a BG-Color. Must include "#". Must already exist.
console.log(drawBarChart(testArr, testObj, testElement));


// -------------------------------- mini functions --------------------------------- //

// sorting the array in descending order without mutating orginal array
function sort(arr) {
  return arr.concat().sort(function (a, b) {
    return b - a;
  });
}

// creates html link stylesheet for custom google fonts
function customFont(linkURL) {
  let head = document.head;
  let link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = linkURL;
  head.appendChild(link);
}

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


