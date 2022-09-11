// var nowTemp = new Date();
// var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

// var checkin = $('#dp1').datepicker({

//   beforeShowDay: function(date) {
//     return date.valueOf() >= now.valueOf();
//   },
//   autoclose: true

// }).on('changeDate', function(ev) {
//   if (ev.date.valueOf() > checkout.datepicker("getDate").valueOf() || !checkout.datepicker("getDate").valueOf()) {

//     var newDate = new Date(ev.date);
//     newDate.setDate(newDate.getDate() + 1);
//     checkout.datepicker("update", newDate);

//   }
//   $('#dp2')[0].focus();
// });


// var checkout = $('#dp2').datepicker({
//   beforeShowDay: function(date) {
//     if (!checkin.datepicker("getDate").valueOf()) {
//       return date.valueOf() >= new Date().valueOf();
//     } else {
//       return date.valueOf() > checkin.datepicker("getDate").valueOf();
//     }
//   },
//   autoclose: true

// }).on('changeDate', function (ev) { });
// const prev = document.querySelector('.prev');
// const next = document.querySelector('.next');

// //Set counter for setting distance for cards to move on each click
// let count = 0;

// //Set tracker to keep track of where the controls and cards are in relation to the card container
// let tracker = 0;

// //Action for Next button
// function moveCardsLeft() {
//     //'Count' controls the distnace for each card push and can be adjusted by changing the integer subtracted from the variable below.
//     //The tracker keeps track of the index while the next and prev buttons are being clicked.
//     count = count - 402;
//     tracker++;

//     //Disables buttons after cards reach a specified distance. Number of clicks can be adjusted by changing the integers in the if statements. ie. changing the '0' to '-1' allows the user to click back one additional time before disabling the 'prev' button.
//     if (tracker === 0) {
//         prev.setAttribute('disabled', '');
//     } else {
//         prev.removeAttribute('disabled');
//     }
//     if (tracker === 5) {
//         next.setAttribute('disabled', '');
//     } else {
//         next.removeAttribute('disabled');
//     }

//     //Pushes cards based on 'count'. 
//     const cards = document.querySelectorAll('.card');
//     cards.forEach(function (el, i, arr) {
//         el.style.transform = `translateX(${count}px)`;
//     });
// }

// //Action for Prev button
// function moveCardsRight() {
//     count = count + 402;
//     tracker --;
//     if (tracker <= 0) {
//         prev.setAttribute('disabled', '');
//     } else {
//         prev.removeAttribute('disabled');
//     }
//     if (tracker === 5) {
//         next.setAttribute('disabled', '');
//     } else {
//         next.removeAttribute('disabled');
//     }
//     const cards = document.querySelectorAll('.card');
//     cards.forEach(function (el, i, arr) {
//         el.style.transform = `translateX(${count}px)`;
//     });
// }

// //Event listeners to slide the cards.
// prev.addEventListener('click', () => {
//     moveCardsRight();
// });

// next.addEventListener('click', () => {
//     moveCardsLeft();
// });
const config = {
  autoload: true,
  itemsToBeVisible: 3,
  speed: 5000
};

/*-------------------
  Entry point 
  ---------------------*/
function start() {
  window.onload = function () {
    setSlidersStyle(config);

    const prevSlideButton = document.getElementById("prev-slide");
    const nextSlideButton = document.getElementById("next-slide");

    prevSlideButton.addEventListener("click", () => {
      navigate("backward", config);
    });

    nextSlideButton.addEventListener("click", () => {
      navigate("forward", config);
    });

    if (config.autoload) {
      playCarousel(nextSlideButton, config);
    }
  };
}

/*--------------------------------------------------------------
    Sets the style of slides based on the number of visible items.
  ---------------------------------------------------------------*/
function setSlidersStyle(config) {
  document.querySelector(
    "style"
  ).textContent += `@media screen and (min-width:1180px) { .carousel__slide{ min-width: ${
    100 / config.itemsToBeVisible
  }% } }`;
}

/*----------------------------------------
   Performs the sliding behavior of items.
  ----------------------------------------*/
function navigate(position, config) {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector(".carousel__container");
  const slideEl = carouselEl.querySelector(".carousel__slide");
  let slideWidth = slideEl.offsetWidth;
  slideContainerEl.scrollLeft = this.getNewScrollPosition(
    position,
    slideContainerEl,
    slideWidth,
    config
  );
}

/*-------------------------------
   Get the new scroll position.
  ---------------------------------*/
function getNewScrollPosition(position, slideContainerEl, slideWidth, config) {
  const maxScrollLeft =
    slideContainerEl.scrollWidth - slideWidth * config.itemsToBeVisible;
  if (position === "forward") {
    const x = slideContainerEl.scrollLeft + slideWidth;
    return x <= maxScrollLeft ? x : 0;
  } else {
    const x = slideContainerEl.scrollLeft - slideWidth;
    return x >= 0 ? x : maxScrollLeft;
  }
}

/*-------------------------------
  Autoplay
  ---------------------------------*/
function playCarousel(nextButton, config) {
  const play = () => {
    nextButton.click();
    setTimeout(play, config.speed);
  };
  play();
}

start();
