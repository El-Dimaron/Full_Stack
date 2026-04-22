export function initSlider(slider, currentSlider = 0, interval = 5) {
  let sliderElem = document.getElementsByClassName(slider)[0];
  let sliderChildren = Array.from(sliderElem.children);

  const arrowStyle =
    "display: flex; align-items: center; align-self: center; cursor: pointer; background: none; color: inherit; border: none; padding: 0; font: inherit; outline: none;";

  const arrowNext = document.createElement("button");
  const arrowPrev = document.createElement("button");

  const iconNext = document.createElement("img");
  iconNext.src = "./images/arrow_next.svg";
  iconNext.alt = "Icon next";

  const iconPrev = document.createElement("img");
  iconPrev.src = "./images/arrow_prev.svg";
  iconPrev.alt = "Icon prev";

  arrowNext.appendChild(iconNext);
  arrowPrev.appendChild(iconPrev);

  arrowNext.setAttribute("style", arrowStyle);
  arrowPrev.setAttribute("style", arrowStyle);

  const sliderItem = document.getElementsByClassName("slider__item")[0];
  sliderElem.appendChild(arrowNext);
  sliderElem.insertBefore(arrowPrev, sliderItem);

  function createDot(color = "#dedede") {
    const svgNS = "http://www.w3.org/2000/svg";

    const svgDot = document.createElementNS(svgNS, "svg");
    svgDot.setAttribute("width", "12");
    svgDot.setAttribute("height", "12");
    svgDot.setAttribute("viewBox", "0 0 12 12");
    svgDot.setAttribute("cursor", "pointer");

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "6");
    circle.setAttribute("cy", "6");
    circle.setAttribute("r", "6");
    circle.setAttribute("fill", color);

    svgDot.appendChild(circle);

    return svgDot;
  }

  const dotContainer = document.createElement("div");
  dotContainer.setAttribute(
    "style",
    "max-width: 650px; display: flex; justify-content: center; justify-self: center; flex-basis: 100%; gap: 5px",
  );

  sliderElem.appendChild(dotContainer);

  function displaySlider() {
    dotContainer.replaceChildren();
    for (let i = 0; i < sliderChildren.length; i++) {
      let element = sliderChildren[i];

      let dot = "";

      if (i !== currentSlider) {
        element.style.display = "none";
        dot = createDot();
      } else {
        element.style.display = "";
        dot = createDot("#adddde");
      }
      dotContainer.appendChild(dot);
      dot.firstChild.setAttribute("id", i);
    }
  }

  function nextSlide() {
    if (currentSlider === sliderChildren.length - 1) {
      currentSlider = 0;
    } else {
      currentSlider++;
    }
    displaySlider();
  }

  function prevSlide() {
    if (currentSlider === 0) {
      currentSlider = sliderChildren.length - 1;
    } else {
      currentSlider--;
    }
    displaySlider();
  }

  arrowNext.addEventListener("click", nextSlide);
  arrowPrev.addEventListener("click", prevSlide);
  dotContainer.addEventListener("click", (event) => {
    currentSlider = Number(event.target.id);
    displaySlider();
  });

  let switchInterval;

  function startSliderSwitch() {
    switchInterval = setInterval(() => {
      nextSlide();
      console.log("setInterval");
    }, 1000 * interval);
  }

  function stopSliderSwitch() {
    clearInterval(switchInterval);
  }

  sliderElem.addEventListener("mouseenter", stopSliderSwitch);
  sliderElem.addEventListener("mouseleave", startSliderSwitch);
  sliderElem.setAttribute("tabindex", "0");
  sliderElem.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  });

  sliderElem.addEventListener("touchmove", (e) => {
    const touch = e.touches[0]; // Get the first finger
    const x = touch.clientX;
    const y = touch.clientY;
    console.log(`Finger 1 is at ${x}, ${y}`);
  });

  let startX = 0;
  let isDragging = false;
  const minSwipeDistance = 50;

  function handleGesture(start, end) {
    const distance = end - start;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  sliderElem.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
  });

  sliderElem.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    isDragging = false;
    handleGesture(startX, event.clientX);
  });

  sliderElem.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  sliderElem.addEventListener("pointerleave", () => {
    isDragging = false;
  });

  startSliderSwitch();
  displaySlider();
}
