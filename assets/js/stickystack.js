
var animated_text = document.querySelector(".end-word");
var last_word_text = document.querySelector(".last-word-text");
console.log(last_word_text);
setTimeout(() => {
    last_word_text.classList.add("hide-after");
    animated_text.style.backgroundSize = "100% 100%"
}, 7700);

function rangeSlide(value, char) {
    if(char == '%'){
        document.getElementById('mobileSliderValue').innerHTML = value + "%";
    }else{
        document.getElementById('pageViewsSliderValue').innerHTML = value;
    }
}