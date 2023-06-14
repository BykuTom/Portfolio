/*Jquery Isotope*/

$(".grid").isotope({
  layoutMode: "fitRows",
  itemSelector: ".grid-item",
  transitionDuration: "0.6s",
});

/*End of Jquery Isotope*/

/*Type Writer*? */
const animatedText = document.querySelector(".end-text");
const blinker = document.querySelector(".blinker");

const typeWriterText = [
  "Front-End Developer }",
  "Software Engineer }",
  "Web Developer }",
];
let arrayIndex = 0;
let textIndex = 0;
let delay = 100;
let deleteDelay = 25;
let strings;
let textLenght;

typeWriter = () => {
  if (blinker.style.animationPlayState === "running") {
    blinker.style.animationPlayState = "paused";
    //console.log(blinker.style.opacity);
    blinker.style.opacity = "1";
    //console.log(blinker.style.opacity);
  }
  if (arrayIndex >= 3) {
    arrayIndex = 0;
  }

  animatedText.textContent = typeWriterText[arrayIndex].substring(0, textIndex);

  if (textIndex++ != typeWriterText[arrayIndex].length) {
    setTimeout(typeWriter, delay);
  } else {
    blinker.style.animationPlayState = "running";
    textLenght = typeWriterText[arrayIndex].length + 1;
    setTimeout(textRemover, 3000);
  }
};

textRemover = () => {
  if (blinker.style.animationPlayState === "running") {
    blinker.style.animationPlayState = "paused";
    blinker.style.opacity = "1";
  }
  strings = animatedText.textContent.slice(0, textLenght);
  animatedText.textContent = strings;

  if (textLenght != -1) {
    textLenght--;
    setTimeout(textRemover, deleteDelay);
  } else {
    arrayIndex = arrayIndex + 1;
    textIndex = 0;
    setTimeout(typeWriter, 200);
  }
};
/*End of typewriter */
/* Header Section Observer*/
const headerTitle = document.querySelector(".header-title");
const begginingSubText = document.querySelector(".beggining-text");
const socialLinkIconsNodeList = document.querySelectorAll(".social-links"); // grab nodelist
const socialLinkIconsArray = [...socialLinkIconsNodeList]; // use spread operator to convert it into an array
const subText = "{ A Professional";
const myName = "Tomasz Wolak";
let headerTextIndex = 0;
let subTextIndex = 1;
let socialLinkIndex = 0;

socialLinkLoader = () => {
  //console.log(socialLinkIconsArray[socialLinkIndex]);

  socialLinkIconsArray[socialLinkIndex].style.opacity = 1;
  socialLinkIconsArray[socialLinkIndex].style.bottom = "0px";

  if (socialLinkIndex != socialLinkIconsArray.length - 1) {
    socialLinkIndex++;
    setTimeout(socialLinkLoader, 100);
  }
};

headerTypeWriter = () => {
  headerTitle.textContent = myName.substring(0, headerTextIndex);

  if (headerTextIndex != myName.length) {
    headerTextIndex++;
    setTimeout(headerTypeWriter, delay / 2);
  } else {
    begginingSubText.textContent = subText.substring(0, subTextIndex);
    socialLinkLoader();
    if (subTextIndex++ != subText.length) {
      setTimeout(headerTypeWriter, delay);
    } else {
      typeWriter();
    }
  }
};

/*End of Header Section Observer*/
/* About-me Section Observer*/
const aboutMeBox = document.querySelector(".about-me");
const aboutMeImage = document.querySelector(".image-wrap");
const aboutMeTitle = document.querySelector(".about-me-title");
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeButtons = document.querySelector(".about-me-buttons");
const cvButton = document.querySelector(".cv-button");

const techstackIconTray = document.querySelector(".tech-stack-icon-container");
const techstackIconsNodeList = document.querySelectorAll(".tech-stack-icons");
const techstackIconArray = [...techstackIconsNodeList];
let techstackIconIndex = 0;

techstackIconLoader = () => {
  //console.log(techstackIconArray[techstackIconIndex]);

  techstackIconArray[techstackIconIndex].style.opacity = 1;
  techstackIconArray[techstackIconIndex].style.left = "0px";
  if (techstackIconIndex != techstackIconArray.length - 1) {
    techstackIconIndex++;
    setTimeout(techstackIconLoader, 100);
  }
};

const aboutMeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutMeImage.style.opacity = "1";
        aboutMeImage.style.left = "0px";
        aboutMeTitle.style.opacity = "1";
        aboutMeTitle.style.top = "0px";
        aboutMeText.style.opacity = "1";
        aboutMeText.style.right = "0px";
        techstackIconTray.style.opacity = "1";
        techstackIconLoader();
        aboutMeButtons.style.opacity = "1";
        aboutMeButtons.style.bottom = "0px";
        cvButton.style.opacity = "1";
        cvButton.style.bottom = "0px";
      }
    });
  },
  { threshold: 0.64 }
);

aboutMeObserver.observe(aboutMeBox);

/*End of About-me section Onserver */
/* Record Section Observer*/
const record_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const record_Circles = document.querySelectorAll(".record-circle");
const recordProgressCircles = document.querySelectorAll(".record-wrap");

let currentNumber = [0, 0, 0, 0];
let incrementSpeed = [30, 25, 35, 20];
let circleProggressNumber = 0;

record_Circles.forEach((circle) => circle.classList.remove("active"));

console.log(recordProgressCircles);

const recordsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        records_numbers.forEach((number) => {
          const UpdateCount = () => {
            let maximumNumber = Number(number.dataset.number);
            const increment =
              maximumNumber / incrementSpeed[Number(number.dataset.circle)];

            if (currentNumber[Number(number.dataset.circle)] < maximumNumber) {
              currentNumber[Number(number.dataset.circle)] =
                currentNumber[Number(number.dataset.circle)] + increment;

              number.innerText = Math.floor(
                currentNumber[Number(number.dataset.circle)]
              );

              let progressValue =
                currentNumber[Number(number.dataset.circle)] / maximumNumber;
              let progressEndValue = progressValue * 100;

              recordProgressCircles[
                number.dataset.circle
              ].style.background = `conic-gradient(#ff9500 0deg, #e95426 ${
                progressEndValue * 3.6
              }deg, #fffdf7 ${progressEndValue * 3.6}deg)`;

              setTimeout(UpdateCount, 10);
            } else {
              recordProgressCircles[
                number.dataset.circle
              ].style.background = `conic-gradient(#ff9500 0deg, #e95426 ${360}deg, #fffdf7 ${360}deg)`;
              number.innerText = maximumNumber;
            }
          };
          record_Circles.forEach((circle) => circle.classList.add("active"));
          recordProgressCircles.forEach((circle) =>
            circle.classList.add("active")
          );
          setTimeout(UpdateCount, 200);
        });
      }
    });
  },
  { threshold: 1 }
);

recordsObserver.observe(record_wrap);

RecordsCounter = () => {
  records_number.forEach();

  animatedText.textContent = typeWriterText[arrayIndex].substring(0, textIndex);

  if (textIndex++ != typeWriterText[arrayIndex].length) {
    setTimeout(typeWriter, delay);
  } else {
    blinker.style.animationPlayState = "running";
    textLenght = typeWriterText[arrayIndex].length + 1;
    setTimeout(textRemover, 3000);
  }
};
/*End of Record section Onserver */
/* header background*/
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 64;
let mouse = {
  x: undefined,
  y: undefined,
  radius: 96,
};

function init() {
  resizeReset();
  animationLoop();
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  particles = [];
  for (
    let y =
      (((h - particleDistance) % particleDistance) + particleDistance) / 2;
    y < h;
    y += particleDistance
  ) {
    for (
      let x =
        (((w - particleDistance) % particleDistance) + particleDistance) / 2;
      x < w;
      x += particleDistance
    ) {
      particles.push(new Particle(x, y));
    }
  }
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  drawScene();

  setTimeout(animationLoop, 10);
}

function drawScene() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  drawLine();
}

function drawLine() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particleDistance * 1.768) {
        opacity = 1 - distance / (particleDistance * 2.64);
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0.1, "#4c787e64");
        gradient.addColorStop(0.26, "#31905664");
        gradient.addColorStop(0.34, "#ff964f64");
        gradient.addColorStop(0.42, "#ff964f96");
        gradient.addColorStop(0.5, "#e9542696");
        gradient.addColorStop(0.58, "#ff964f96");
        gradient.addColorStop(0.66, "#ff964f64");
        gradient.addColorStop(0.74, "#31905664");
        gradient.addColorStop(0.9, "#4c787e64");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.16;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function mousemove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

function mouseout() {
  mouse.x = undefined;
  mouse.y = undefined;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1.64;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speed = Math.random() * 25 + 5;
  }
  draw() {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0.1, "#4c787e64");
    gradient.addColorStop(0.26, "#31905664");
    gradient.addColorStop(0.34, "#ff964f64");
    gradient.addColorStop(0.42, "#ff964f96");
    gradient.addColorStop(0.5, "#e9542696");
    gradient.addColorStop(0.58, "#ff964f96");
    gradient.addColorStop(0.66, "#ff964f64");
    gradient.addColorStop(0.74, "#31905664");
    gradient.addColorStop(0.9, "#4c787e64");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let directionX = forceDirectionX * force * this.speed;
    let directionY = forceDirectionY * force * this.speed;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

/*End of header background*/
/*start of Portfolio filter*/

const filter_buttons = document.querySelectorAll(".filter-button");

filter_buttons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_buttons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let filterValue = btn.dataset.filter;

    $(".grid").isotope({
      filter: filterValue,
    });
  })
);
/*End of Portfolio filter*/
/*End of Contact Form*/

const contactName = document.querySelector(".contact-name");
const contactNameError = document.querySelector(
  ".contact-form--message-box--contact-name"
);

const contactSurname = document.querySelector(".contact-surname");
const contactSurnameError = document.querySelector(
  ".contact-form--message-box--contact-surname"
);

const contactPhone = document.querySelector(".contact-phone");
const contactEmail = document.querySelector(".contact-email");
const contactEmailError = document.querySelector(
  ".contact-form--message-box--contact-email"
);
const contactMessage = document.querySelector(".contact-message");
const contactMessageError = document.querySelector(
  ".contact-form--message-box--contact-message"
);
const contactMessageCounter = document.querySelector(
  ".contact-message--character-counter"
);

contactName.addEventListener("input", () => {
  contactName.style.borderColor = "transparent";
});
contactSurname.addEventListener("input", () => {
  contactSurname.style.borderColor = "transparent";
});
contactEmail.addEventListener("input", () => {
  contactEmail.style.borderColor = "transparent";
});
contactMessage.addEventListener("input", () => {
  contactMessage.style.borderColor = "transparent";
});

const contactForm = document
  .querySelector(".contact-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });
const contactSendButton = document
  .querySelector(".contact-button")
  .addEventListener("click", () => {
    validateForm();
  });

const publickey = "ss08N86-3SfBX5n9B";
const templateID = "template_fbvebb3";
const serviceID = "service_qrqd48i";

contactMessage.addEventListener("input", function () {
  const remainingChars = 1000 - contactMessage.value.length;
  contactMessageCounter.textContent = remainingChars + " / 1000";
  if (remainingChars < 0) {
    contactMessageCounter.style.color = "#ff5a5f";
  } else if (remainingChars >= 0) {
    contactMessageCounter.style.color = "#ff9500";
  }
});
function containsSpecialChars(string) {
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regex.test(string);
}
function changeOpacity(element) {
  element.style.opacity = 1;
  setTimeout(() => {
    element.style.opacity = "0";
  }, 5000);
}
function validateForm() {
  let boolArray = [true, true, true, true];
  let boolMap;
  /* function isArrayAllTrue(array){
    return array.every(element => element === true);
  } */
  if (
    contactName.value.length <= 2 ||
    contactName.value.length >= 15 ||
    contactName.value.includes(" ") ||
    containsSpecialChars(contactName.value)
  ) {
    boolArray[0] = false;
    contactNameError.innerText =
      "* Name is required, it has to be longer than 2 and shorter than 15 characters, and cannot contain any spaces, or special characters.";
    changeOpacity(contactNameError);
    contactName.style.borderColor = "#ff5a5f";
  }
  if (
    contactSurname.value.length <= 2 ||
    contactSurname.value.length >= 15 ||
    contactSurname.value.includes(" ") ||
    containsSpecialChars(contactSurname.value)
  ) {
    boolArray[1] = false;
    contactSurnameError.innerText =
      "* Surname is required, it has to be longer than 2 and shorter than 15 characters, and cannot contain any spaces, or special characters.";
    changeOpacity(contactSurnameError);
    contactSurname.style.borderColor = "#ff5a5f";
  }
  if (
    contactEmail.value === "" ||
    contactEmail.value == null ||
    contactSurname.value.length <= 4 ||
    contactEmail.value.length >= 50 ||
    !contactEmail.value.includes("@")
  ) {
    boolArray[2] = false;
    contactEmailError.innerText =
      "* Email is required, it has to be longer than 4 and shorter than 50 characters, and it has to include @.";
    changeOpacity(contactEmailError);
    contactEmail.style.borderColor = "#ff5a5f";
  }
  if (
    contactMessage.value === "" ||
    contactMessage.value == null ||
    contactMessage.value.length <= 20 ||
    contactMessage.value.length >= 1000
  ) {
    boolArray[3] = false;
    contactMessageError.innerText =
      "* Message is required, it has to be longer than 20 and shorter than 1000 characters.";
    changeOpacity(contactMessageError);
    contactMessage.style.borderColor = "#ff5a5f";
  }
  if (!boolArray.includes(false)) {
    console.log("Attempting to send...");
    defineParameters();
  } else {
    boolMap = boolArray.reduce((acc, val, i) => {
      acc[i] = val;
      return acc;
    }, {});
    console.log(boolMap);
  }
}

function defineParameters() {
  let contactParameters = {
    from_name: contactName.value + " " + contactSurname.value,
    email_id: contactEmail.value,
    message: contactMessage.value,
    phone_id: contactPhone.value,
  };
  sendEmail(contactParameters);
}

function sendEmail(contactParameters) {
  emailjs.send(serviceID, templateID, contactParameters, publickey).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

/*Contact Form*/
/*Window Events*/
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
window.addEventListener("load", headerTypeWriter);
window.onload = function () {
  init();

  const phoneText = document.querySelector(".phone-text");
  const emailText = document.querySelector(".email-text");

  let emailDecrypted = window.atob(emailText.innerText);
  let phoneDecrypted = window.atob(phoneText.innerText);

  phoneText.innerText = phoneDecrypted;
  emailText.innerText = emailDecrypted;
};
/*End of Window Events */
