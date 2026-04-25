export class Slider {
  constructor(slider, currentSlider = 0, interval = 5) {
    this.sliderElem = document.getElementsByClassName(slider)[0];
    this.sliderChildren = Array.from(this.sliderElem.children);

    this.currentSlider = currentSlider;
    this.interval = interval;
    this.switchInterval = null;

    this.startX = 0;
    this.isDragging = false;
    this.minSwipeDistance = 50;

    this.createArrows();
    this.createDotsContainer();
    this.addEvents();

    this.startSliderSwitch();
    this.displaySlider();

    console.log("I am still working");
  }

  createArrows() {
    const arrowStyle =
      "display: flex; align-items: center; align-self: center; cursor: pointer; background: none; color: inherit; border: none; padding: 0; font: inherit; outline: none;";

    this.arrowNext = document.createElement("button");
    this.arrowPrev = document.createElement("button");

    const iconNext = document.createElement("img");
    iconNext.src = "./images/arrow_next.svg";
    iconNext.alt = "Icon next";

    const iconPrev = document.createElement("img");
    iconPrev.src = "./images/arrow_prev.svg";
    iconPrev.alt = "Icon prev";

    this.arrowNext.appendChild(iconNext);
    this.arrowPrev.appendChild(iconPrev);

    this.arrowNext.setAttribute("style", arrowStyle);
    this.arrowPrev.setAttribute("style", arrowStyle);

    // const sliderItem = document.getElementsByClassName("slider__item")[0];
    const firstSlide = this.sliderChildren[0];

    this.sliderElem.appendChild(this.arrowNext);
    this.sliderElem.insertBefore(this.arrowPrev, firstSlide);
  }

  createDot(color = "#dedede") {
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

  createDotsContainer() {
    this.dotContainer = document.createElement("div");

    this.dotContainer.setAttribute(
      "style",
      "max-width: 650px; display: flex; justify-content: center; justify-self: center; flex-basis: 100%; gap: 5px",
    );

    this.sliderElem.appendChild(this.dotContainer);
  }

  displaySlider() {
    this.dotContainer.replaceChildren();

    for (let i = 0; i < this.sliderChildren.length; i++) {
      const element = this.sliderChildren[i];

      let dot;

      if (i !== this.currentSlider) {
        element.style.display = "none";
        dot = this.createDot();
      } else {
        element.style.display = "";
        dot = this.createDot("#adddde");
      }

      dot.firstChild.setAttribute("id", i);
      this.dotContainer.appendChild(dot);
    }
  }

  nextSlide() {
    if (this.currentSlider === this.sliderChildren.length - 1) {
      this.currentSlider = 0;
    } else {
      this.currentSlider++;
    }

    this.displaySlider();
  }

  prevSlide() {
    if (this.currentSlider === 0) {
      this.currentSlider = this.sliderChildren.length - 1;
    } else {
      this.currentSlider--;
    }

    this.displaySlider();
  }

  startSliderSwitch() {
    if (this.switchInterval !== null) return;

    this.switchInterval = setInterval(() => {
      this.nextSlide();
    }, 1000 * this.interval);
  }

  stopSliderSwitch() {
    clearInterval(this.switchInterval);
    this.switchInterval = null;
  }

  handleGesture(start, end) {
    const distance = end - start;

    if (Math.abs(distance) < this.minSwipeDistance) return;

    if (distance < 0) {
      this.nextSlide();
    } else {
      this.prevSlide();
    }
  }

  addEvents() {
    this.arrowNext.addEventListener("click", () => this.nextSlide());
    this.arrowPrev.addEventListener("click", () => this.prevSlide());

    this.dotContainer.addEventListener("click", (event) => {
      const dot = event.target.closest("svg");
      if (!dot) return;

      this.currentSlider = Number(event.target.id);
      this.displaySlider();
    });

    this.sliderElem.addEventListener("mouseenter", () => this.stopSliderSwitch());
    this.sliderElem.addEventListener("mouseleave", () => this.startSliderSwitch());

    this.sliderElem.setAttribute("tabindex", "0");

    this.sliderElem.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.nextSlide();
      } else if (event.key === "ArrowLeft") {
        this.prevSlide();
      }
    });

    this.sliderElem.addEventListener("pointerdown", (event) => {
      this.isDragging = true;
      this.startX = event.clientX;
    });

    this.sliderElem.addEventListener("pointerup", (event) => {
      if (!this.isDragging) return;

      this.isDragging = false;
      this.handleGesture(this.startX, event.clientX);
    });

    this.sliderElem.addEventListener("pointercancel", () => {
      this.isDragging = false;
    });

    this.sliderElem.addEventListener("pointerleave", () => {
      this.isDragging = false;
    });
  }
}
