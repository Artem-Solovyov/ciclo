let wrapper = document.querySelector(".wrapper");

let pageSlider = new Swiper(".page", {
  wrapperClass: "page__wrapper",
  slideClass: "page__section",
  direction: "vertical",
  slidesPerView: "auto",
  parallax: true,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  mousewheel: {
    sensitivity: 1,
  },
  wathOverflow: true,
  speed: 800,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  pagination: {
    el: ".page__pagination",
    type: "bullets",
    clickable: true,
    bulletClass: "page__bullet",
    bulletActiveClass: "page__bullet-active",
  },
  scrollbar: {
    el: ".page__scroll",
    dragClass: "page__drag-scroll",
    draggable: true,
  },
  init: false,
  on: {
    init: function () {
      menuSlider();
      setScrollType();
      wrapper.classList.add("_loaded");
    },
    slideChange: function () {
      menuSliderRemove();
      menuLinks[pageSlider.realIndex].classList.add("_active");
    },
    resize: function () {
      setScrollType();
    },
  },
});

let menuLinks = document.querySelectorAll(".menu__link");

function menuSlider() {
  if (menuLinks.length > 0) {
    menuLinks[pageSlider.realIndex].classList.add("_active");
    menuLinks.forEach((menuLink, index) => {
      menuLink.addEventListener("click", function (e) {
        menuSliderRemove();
        pageSlider.slideTo(index, 800);
        menuLink.classList.add("_active");
        e.preventDefault(0);
      });
    });
  }
}
function menuSliderRemove() {
  let menuLinkActive = document.querySelector(".menu__link._active");
  if (menuLinkActive) {
    menuLinkActive.classList.remove("_active");
  }
}

function setScrollType() {
  if (wrapper.classList.contains("_free")) {
    wrapper.classList.remove("_free");
    pageSlider.params.freeMode.enabled = false;
  }
  pageSlider.slides.forEach((slide) => {
    const pageSlideContent = slide.querySelector("._container");
    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight;
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add("_free");
        pageSlider.params.freeMode.enabled = true;
      }
    }
  });
}
pageSlider.init();
