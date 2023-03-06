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