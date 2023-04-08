window.addEventListener("load", windowLoad);

function windowLoad() {
  //inicialization
  function digitsCountersInit(digitsCounterItems) {
    let digitsCounters = digitsCounterItems
      ? digitsCounterItems
      : document.querySelectorAll("[data-digits-counter]");
    if (digitsCounters) {
      digitsCounters.forEach((digitsCounter) => {
        digitsCountersAnimate(digitsCounter);
      });
    }
  }
  function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter)
      ? parseInt(digitsCounter.dataset.digitsCounter)
      : 1000;
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(
        progress * (startPosition + startValue)
      );
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }
  //   digitsCountersInit();

  let options = {
    threshold: 0.3,
  };
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCounterItems = targetElement.querySelectorAll(
          "[data-digits-counter]"
        );
        if (digitsCounterItems.length) {
          digitsCountersInit(digitsCounterItems);
        }
        //вимкнути слідкування після спрацювання
        // observer.unobserve(targetElement);
      }
    });
  }, options);

  let sections = document.querySelectorAll("[data-digits-observe]");
  if (sections.length) {
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
}
