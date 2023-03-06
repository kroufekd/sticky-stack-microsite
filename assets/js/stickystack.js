var animated_text = document.querySelector(".end-word");
var last_word_text = document.querySelector(".last-word-text");
var intensityCheckboxes = document.getElementsByName("debt-amount");

setTimeout(() => {
  animated_text.style.backgroundSize = "100% 100%";
}, 7700);

document
  .querySelector(".anim-typewriter")
  .addEventListener("animationend", () => {
    document.querySelector(".anim-typewriter").style.borderRightColor =
      "transparent";
    setTimeout(() => {
      document.querySelector(".end-word").classList.add("underline");
    }, 1500);
  });

var price = [0, -95, -30, -65, -150, -215, -150, -220, -300];

//CHART VALUES
var chartH = $("#svg").height();
var chartW = $("#svg").width();

// PARSE PRICES TO ALIGN WITH BOTTOM OF OUR SVG
var prices = [];
for (i = 0; i < price.length; i++) {
  prices[i] = price[i] + $("#svg").height();
}

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
  svgPath += `L 500 500 L 0 500 L ${data[0][0]},${data[0][1]} "></path>`;
  return svgPath;
}

const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

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
  data = data.map((item) => [item[0] * 500, item[1] * 500]);
  let line = generateSvgPath(data, color);
  $("#chart-container").append(line);
  $("#chart-container").html($("#chart-container").html());
};

const wait = (forSecond) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, forSecond * 1000);
  });
};

var graph_observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true) addLineToSVG(line1Data, "primary");
  },
  { threshold: [0] }
);

graph_observer.observe(document.querySelector(".graph"));

var calc_observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true)
      console.log("Element is fully visible in screen");
  },
  { threshold: [0] }
);

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

const link = document.querySelector("#sheet-type");

const sun =
  "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
const moon =
  "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg";

var navLogo = document.querySelector(".nav-logo");




const root = document.querySelector(":root");
const container = document.getElementsByClassName("theme-container")[0];
const themeIcon = document.getElementById("theme-icon");

container.addEventListener("click", setTheme);
function setTheme() {
  console.log("changing theme");
  switch (localStorage.getItem("theme")) {
    case "dark":
      setLight(300);
      localStorage.setItem("theme", "light");
      break;
    case "light":
      setDark(300);
      theme = "dark";
      localStorage.setItem("theme", "dark");
      break;
  }
}
function setLight(delay) {
  root.style.setProperty(
    "--bs-dark",
    "linear-gradient(318.32deg, #c3d1e4 0%, #dde7f3 55%, #d4e0ed 100%)"
  );
  container.classList.remove("shadow-dark-btn");
  container.style
  setTimeout(() => {
    container.classList.add("shadow-light");
    link.href = "assets/bootstrap/css/light.css";
    navLogo.src = "assets/img/px_logo_light.png";

  }, delay);
  
  container.innerHTML = `<svg id="theme-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12c0 5.514-4.486 10-10 10-4.826 0-8.864-3.436-9.797-7.99 3.573.142 6.903-1.818 8.644-5.013 1.202-2.206 1.473-4.679.83-6.992 5.608-.194 10.323 4.338 10.323 9.995zm-10-12c-1.109 0-2.178.162-3.197.444 3.826 5.933-2.026 13.496-8.781 11.128l-.022.428c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12z"/></svg>`
}

function setDark(delay) {
  root.style.setProperty("--bs-dark", "#212529");
  container.classList.remove("shadow-light");
  setTimeout(() => {
    container.classList.add("shadow-dark-btn");
    navLogo.src = "assets/img/px_logo_dark.png";
    link.href = "assets/bootstrap/css/dark.css";
  }, delay);
  container.innerHTML = `<svg id="theme-icon" fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm2.312-4.897c0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4-4 1.794-4 4zm10 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z"/></svg>`
}

if(localStorage.getItem("theme") == null){
  localStorage.setItem("theme", "dark")
}
if(localStorage.getItem("theme") == "dark"){
  setDark(0);
}
if(localStorage.getItem("theme") == "light"){
  setLight(0);
}