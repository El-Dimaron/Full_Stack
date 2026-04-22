import { initSlider } from "./slider.js";

// let sliderElem = document.getElementsByClassName("slider")[0];
// console.log(sliderElem);

// let sliderChildren = Array.from(sliderElem.children);
// console.log(sliderChildren);

// let curSlider = 0;

// for (let i = 0; i < sliderChildren.length; i++) {
//   // console.log(i);
//   if (i !== curSlider) {
//     let element = sliderChildren[i];
//     element.classList.add("hidden");
//   }
// }

// console.log(sliderChildren);

const slider = initSlider("slider", 0);
