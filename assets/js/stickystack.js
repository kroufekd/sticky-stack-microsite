var animated_text = document.querySelector(".end-word");
var last_word_text = document.querySelector(".last-word-text");
var intensityCheckboxes = document.getElementsByName("debt-amount");

setTimeout(() => {
  last_word_text.classList.add("hide-after");
  animated_text.style.backgroundSize = "100% 100%";
}, 7700);

document.querySelector(".anim-typewriter").addEventListener("animationend", () => {
  console.log("Animation ended");
  document.querySelector(".anim-typewriter").style.borderRightColor = "transparent";
  setTimeout(() => {
    document.querySelector(".end-word").classList.add("underline")
  }, 1500);
 
});

function rangeSlide(value) {
  value = Math.round(Math.pow(value, 3.84));
  if (value > 47863008) {
    value = 50000000;
  }
  value = value.toLocaleString("en");
  document.getElementById("pageViewsSliderValue").innerHTML = value;
  recalculate();
}

function rangeSlideMobile(value, char) {
  if (char == "%") {
    document.getElementById("mobileSliderValue").innerHTML = value;
  } else {
    document.getElementById("mobileSliderValue").innerHTML = value;
  }
  recalculate();
}

function countRevenue(mobileRatio, monthyPageviews, adFrequency, location) {
  const CASH_PER_IMP = 0.00045;
  console.log(adFrequency);
  var revenue =
    monthyPageviews * CASH_PER_IMP * adFrequency * location * mobileRatio;
  return revenue;
}
getAsIntensityFromSlider();
function getAsIntensityFromSlider() {
  for (let i = 0; i < intensityCheckboxes.length; i++) {
    if (intensityCheckboxes[i].getAttribute("clicked") != null) {
      switch (i) {
        case 0:
          return 0.8;
          break;
        case 1:
          return 1;
          break;
        case 2:
          return 1.2;
          break;
        default:
          break;
      }
    }
  }
}

for (let i = 0; i < intensityCheckboxes.length; i++) {
  intensityCheckboxes[i].addEventListener("click", function () {
    removeClickedAttr();
    intensityCheckboxes[i].toggleAttribute("clicked");
    recalculate();
  });
}

function removeClickedAttr() {
  for (let i = 0; i < intensityCheckboxes.length; i++) {
    intensityCheckboxes[i].removeAttribute("clicked");
  }
}

function recalculate() {
  var adIntensity = getAsIntensityFromSlider();
  var pageviews = document.querySelector("#pageViewsSliderValue").innerHTML;
  pageviews = pageviews.replace(/,/g, "");
  pageviews = parseInt(pageviews);
  var mobileRatio = document.querySelector("#mobileSliderValue").innerHTML;
  mobileRatio.slice(0, -1);
  mobileRatio = parseInt(mobileRatio);
  mobileRatio = mobileRatio / 100 + 0.1;
  var calc_result = document.querySelector(".calcResult");
  var revenue = countRevenue(mobileRatio, pageviews, adIntensity, 1);
  revenue = Math.round(revenue);
  revenue.toString();
  revenue = revenue.toLocaleString("en");
  calc_result.innerHTML = revenue;
}

//INVERTED VALUES BECAUSE -X = Up direction because of coord system
// FEEL FREE TO INSERT YOUR OWN VALUES
var price = [0, -95, -30, -65, -150, -215, -150, -220, -300];

//CHART VALUES
var chartH = $("#svg").height();
var chartW = $("#svg").width();

// PARSE PRICES TO ALIGN WITH BOTTOM OF OUR SVG
var prices = [];
for (i = 0; i < price.length; i++) {
  prices[i] = price[i] + $("#svg").height();
}
/*
function draw() {
    //DEFINE SNAP SVG AND DETERMINE STEP NO.
    var paper = Snap('#svg');
    var steps = prices.length;

    // EVENLY DISTRIBUTE OUR POINTS ALONG THE X AXIS

    function step(i, chartW) {
        return chartW / prices.length * i;
    }

    var points = [];
    var breakPointsX = [];
    var breakPointsY = [];
    var point = {};

    for (i = 1; i < prices.length; i++) {

        //CALCULATE CURRENT POINT

        var currStep = step(i, chartW);
        var y = prices[i];
        point.x = Math.floor(currStep);
        point.y = y;

        //CALCULATE PREVIOUS POINT

        var prev = i - 1;
        var prevStep = step(prev, chartW);
        var prevY = prices[prev];
        point.prevX = Math.floor(prevStep);
        point.prevY = prevY;
        if (point.prevX === 0 || point.prevY === 0){
          point.prevX = 15;
          point.prevY = chartH - 15;
        }
        // SAVE PATH TO ARRAY
        points[i] = " M" + point.prevX + "," + point.prevY + " L" + point.x + "," + point.y;

        // SAVE BREAKPOINTS POSITION

        var r = 30;
        breakPointsX[i] = point.x;
        breakPointsY[i] = point.y;
    }

    // DRAW LINES

    for (i = 0; i < points.length; i++) {
        var myPath = paper.path(points[i]);
        var len = myPath.getTotalLength();
        myPath.attr({
            'stroke-dasharray': len,
                'stroke-dashoffset': len,
                'stroke': 'white',
                'stroke-linecap': 'round',
                'stroke-width': 4,
                'stroke-linejoin': 'round',
                'id': 'myLine' + i,
                'class': 'line'
        });
    }
    // DRAW BREAKPOINTS
    for (i = 0; i < points.length; i++) {
        var circle = paper.circle(breakPointsX[i], breakPointsY[i], 5);
        circle.attr({
            'fill': '#FF4864',
                'stroke': 'white',
                'stroke-width': 3,
                'id': 'myCirc' + i,
                'class':'breakpoint'
        });
    }
  // DRAW COORDINATE SYSTEM
    var xAxis = paper.path('M0,'+chartH+'L'+chartW+","+chartH);
    var yAxis = paper.path('M0,'+chartH+'L0,0');
  
  var xOff = xAxis.getTotalLength();
  var yOff = yAxis.getTotalLength();
  var start = (prices.length*250+"ms");

  yAxis.attr({
    'stroke':'white',
    'stroke-width':1,
    'stroke-dasharray':yOff,
    'stroke-dashoffset':yOff,
    'id':'yAxis'
  });
  xAxis.attr({
    'stroke':'white',
    'stroke-width':1,
    'stroke-dasharray':xOff,
    'stroke-dashoffset':xOff,
    'id':'xAxis'
  });
  console.log(start);
  $('#yAxis').css({
    '-webkit-transition-delay':start,
    '-webkit-transition':'all 200ms ease-in'
  });
   $('#xAxis').css({
    '-webkit-transition-delay':start,
    '-webkit-transition':'all 200ms ease-in'
  });
  $('#xAxis').animate({
    'stroke-dashoffset':'0'
  });
  $('#yAxis').animate({
    'stroke-dashoffset': '0'
  });
}
function animate(){
  for (i=0;i<prices.length;i++){
    var circ = $('#myCirc'+i);
    var line = $('#myLine'+i);
    circ.css({
      '-webkit-transition':'all 550ms cubic-bezier(.84,0,.2,1)',
      '-webkit-transition-delay':375+(i*125)+"ms"
      });
    line.css({
      '-webkit-transition':'all 250ms cubic-bezier(.84,0,.2,1)',
      '-webkit-transition-delay':i*125+"ms"
      });
    line.animate({
      'stroke-dashoffset':0
    });
    circ.css({
      'transform':'scale(1)'
    });
  }
}
draw();
animate();
*/
// Our data source for first line
let line1Data = [
  [0, 0.9],
  [0.1, 0.7],
  [0.2, 0.6],
  [0.3, 0.7],
  [0.4, 0.6],
  [0.5, 0.5],
  [0.6, 0.5],
  [0.7, 0.3],
  [0.8, 0.3],
  [0.9, 0.2],
  [1, 0.1],
];

let line2Data = [
  [0, 0.9],
  [0.1, 0.8],
  [0.2, 0.7],
  [0.3, 0.8],
  [0.4, 0.7],
  [0.5, 0.6],
  [0.6, 0.6],
  [0.7, 0.4],
  [0.8, 0.4],
  [0.9, 0.3],
  [1, 0.2],
];

// Generate an svg path
function generateSvgPath(data, colorClass) {
  let svgPath = `<path class="chart-line ${colorClass}" d="`;
  let startCP;
  let endCP;
  data.forEach((dot, i) => {
    if (i !== 0) {
      startCP = controlPoint(data[i - 1], data[i - 2], dot);
      endCP = controlPoint(dot, data[i - 1], data[i + 1], true);
    }
    svgPath += i === 0 ? "M " : "C ";
    svgPath +=
      i === 0
        ? `${dot[0]},${dot[1]} `
        : `${startCP.x},${startCP.y} ${endCP.x},${endCP.y} ${dot[0]},${dot[1]} `;
  });
  // Close the chart for filling color
  svgPath += `L 500 500 L 0 500 L ${data[0][0]},${data[0][1]} "></path>`;
  return svgPath;
}

// Get length and angle between two points
// Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

// Get a control point for curve line
// Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
const controlPoint = (current, previous, next, reverse) => {
  const p = previous || current;
  const n = next || current;
  const smoothing = 0.15;
  const o = line(p, n);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return { x, y };
};

const addLineToSVG = (data, color) => {
  // scale the data
  data = data.map((item) => [item[0] * 500, item[1] * 500]);
  let line = generateSvgPath(data, color);
  $("#chart-container").append(line);
  $("#chart-container").html($("#chart-container").html());
  // append doesn't refresh svg, this is why:
  // https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
};

$(document).ready(async () => {
  //addLineToSVG(line2Data, 'secondary');
});

const wait = (forSecond) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, forSecond * 1000);
  });
};

var graph_observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true)
    addLineToSVG(line1Data, "primary");
  },
  { threshold: [0] }
);

graph_observer.observe(document.querySelector(".graph"));

var calc_observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true)
		console.log('Element is fully visible in screen');
}, { threshold: [0] });

calc_observer.observe(document.querySelector("#calc"));

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
